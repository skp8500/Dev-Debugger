export type CustomFetchOptions = RequestInit & {
  responseType?: "json" | "text" | "blob" | "auto";
};

export type ErrorType<T = unknown> = ApiError<T>;

export type BodyType<T> = T;

export type AuthTokenGetter = () => Promise<string | null> | string | null;

export type BackendHealthState = "unknown" | "healthy" | "unhealthy" | "waking";

export type ApiBackendDefinition = {
  name: string;
  baseUrl: string;
};

export type ConfigureApiRuntimeOptions = {
  backends?: ApiBackendDefinition[];
  requestTimeoutMs?: number;
  retryCount?: number;
  activeBackend?: string;
};

export type ApiRuntimeSnapshot = {
  activeBackend: string | null;
  activeBaseUrl: string | null;
  fallbackMode: boolean;
  wakingUp: boolean;
  statusMessage: string | null;
  lastError: string | null;
  lastRequestId: string | null;
  requestTimeoutMs: number;
  retryCount: number;
  backends: ApiBackendDefinition[];
  health: Record<string, BackendHealthState>;
};

type ApiRuntimeListener = (snapshot: ApiRuntimeSnapshot) => void;

const NO_BODY_STATUS = new Set([204, 205, 304]);
const DEFAULT_JSON_ACCEPT = "application/json, application/problem+json";
const DEFAULT_TIMEOUT_MS = 8_000;
const DEFAULT_RETRY_COUNT = 2;
const DEFAULT_HEALTH_PATH = "/api/health";

let _baseUrl: string | null = null;
let _authTokenGetter: AuthTokenGetter | null = null;
let _backends: ApiBackendDefinition[] = [];
let _activeBackendIndex = 0;
let _requestTimeoutMs = DEFAULT_TIMEOUT_MS;
let _retryCount = DEFAULT_RETRY_COUNT;
const _runtimeListeners = new Set<ApiRuntimeListener>();
let _runtimeSnapshot: ApiRuntimeSnapshot = {
  activeBackend: null,
  activeBaseUrl: null,
  fallbackMode: false,
  wakingUp: false,
  statusMessage: null,
  lastError: null,
  lastRequestId: null,
  requestTimeoutMs: DEFAULT_TIMEOUT_MS,
  retryCount: DEFAULT_RETRY_COUNT,
  backends: [],
  health: {},
};

function cloneRuntimeSnapshot(): ApiRuntimeSnapshot {
  return {
    ..._runtimeSnapshot,
    backends: _runtimeSnapshot.backends.map((backend) => ({ ...backend })),
    health: { ..._runtimeSnapshot.health },
  };
}

function emitRuntimeSnapshot(partial?: Partial<ApiRuntimeSnapshot>): void {
  _runtimeSnapshot = {
    ..._runtimeSnapshot,
    ...(partial ?? {}),
  };

  const next = cloneRuntimeSnapshot();
  for (const listener of _runtimeListeners) {
    listener(next);
  }
}

function syncRuntimeSnapshot(partial?: Partial<ApiRuntimeSnapshot>): void {
  const activeBackend = _backends[_activeBackendIndex] ?? null;
  emitRuntimeSnapshot({
    activeBackend: activeBackend?.name ?? null,
    activeBaseUrl: activeBackend?.baseUrl ?? _baseUrl,
    fallbackMode: _backends.length > 1 && _activeBackendIndex > 0,
    requestTimeoutMs: _requestTimeoutMs,
    retryCount: _retryCount,
    backends: _backends.map((backend) => ({ ...backend })),
    ...(partial ?? {}),
  });
}

function normalizeBackendBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export function configureApiRuntime(options: ConfigureApiRuntimeOptions): void {
  if (options.backends) {
    _backends = options.backends
      .filter((backend) => backend.baseUrl.trim().length > 0)
      .map((backend) => ({
        name: backend.name,
        baseUrl: normalizeBackendBaseUrl(backend.baseUrl),
      }));
  }

  if (typeof options.requestTimeoutMs === "number" && options.requestTimeoutMs > 0) {
    _requestTimeoutMs = options.requestTimeoutMs;
  }

  if (typeof options.retryCount === "number" && options.retryCount >= 0) {
    _retryCount = options.retryCount;
  }

  if (options.activeBackend) {
    const nextIndex = _backends.findIndex(
      (backend) => backend.name === options.activeBackend,
    );
    if (nextIndex >= 0) {
      _activeBackendIndex = nextIndex;
    }
  } else if (_activeBackendIndex >= _backends.length) {
    _activeBackendIndex = 0;
  }

  const nextHealth: Record<string, BackendHealthState> = {};
  for (const backend of _backends) {
    nextHealth[backend.name] = _runtimeSnapshot.health[backend.name] ?? "unknown";
  }

  syncRuntimeSnapshot({ health: nextHealth });
}

export function setActiveBackend(name: string): void {
  const nextIndex = _backends.findIndex((backend) => backend.name === name);
  if (nextIndex < 0) {
    return;
  }

  _activeBackendIndex = nextIndex;
  syncRuntimeSnapshot({
    wakingUp: false,
    statusMessage: nextIndex > 0 ? "Backup backend selected manually." : null,
  });
}

export function getApiRuntimeSnapshot(): ApiRuntimeSnapshot {
  return cloneRuntimeSnapshot();
}

export function subscribeToApiRuntime(listener: ApiRuntimeListener): () => void {
  _runtimeListeners.add(listener);
  listener(cloneRuntimeSnapshot());

  return () => {
    _runtimeListeners.delete(listener);
  };
}

function getCurrentBackend(): ApiBackendDefinition | null {
  return _backends[_activeBackendIndex] ?? null;
}

function getCurrentBaseUrl(): string | null {
  return getCurrentBackend()?.baseUrl ?? _baseUrl;
}

export function getApiUrl(path: string, backendName?: string): string {
  if (!path.startsWith("/")) {
    return path;
  }

  const backend = backendName
    ? _backends.find((candidate) => candidate.name === backendName) ?? null
    : getCurrentBackend();
  const baseUrl = backend?.baseUrl ?? _baseUrl;

  return baseUrl ? `${baseUrl}${path}` : path;
}

export function updateBackendHealth(
  backendName: string,
  status: BackendHealthState,
): void {
  syncRuntimeSnapshot({
    health: {
      ..._runtimeSnapshot.health,
      [backendName]: status,
    },
  });
}

export async function probeBackendHealth(
  backendName?: string,
  path = DEFAULT_HEALTH_PATH,
): Promise<{
  backend: string;
  ok: boolean;
  status: number | null;
  data: unknown;
}> {
  const backend =
    (backendName
      ? _backends.find((candidate) => candidate.name === backendName)
      : getCurrentBackend()) ?? null;

  if (!backend) {
    throw new Error("No backend configured for health probe.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Math.min(_requestTimeoutMs, 4_000));

  try {
    const response = await fetch(`${backend.baseUrl}${path}`, {
      method: "GET",
      headers: { accept: DEFAULT_JSON_ACCEPT },
      credentials: "include",
      signal: controller.signal,
    });

    const data = response.ok ? await response.json().catch(() => null) : null;
    updateBackendHealth(backend.name, response.ok ? "healthy" : "unhealthy");

    return {
      backend: backend.name,
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    updateBackendHealth(
      backend.name,
      error instanceof Error && error.name === "AbortError" ? "waking" : "unhealthy",
    );

    return {
      backend: backend.name,
      ok: false,
      status: null,
      data: error,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export function setBaseUrl(url: string | null): void {
  _baseUrl = url ? url.replace(/\/+$/, "") : null;
  syncRuntimeSnapshot();
}

export function setAuthTokenGetter(getter: AuthTokenGetter | null): void {
  _authTokenGetter = getter;
}

function isRequest(input: RequestInfo | URL): input is Request {
  return typeof Request !== "undefined" && input instanceof Request;
}

function resolveMethod(input: RequestInfo | URL, explicitMethod?: string): string {
  if (explicitMethod) return explicitMethod.toUpperCase();
  if (isRequest(input)) return input.method.toUpperCase();
  return "GET";
}

function isUrl(input: RequestInfo | URL): input is URL {
  return typeof URL !== "undefined" && input instanceof URL;
}

function resolveUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (isUrl(input)) return input.toString();
  return input.url;
}

function applyBaseUrl(input: RequestInfo | URL): RequestInfo | URL {
  const currentBaseUrl = getCurrentBaseUrl();
  if (!currentBaseUrl) return input;

  const url = resolveUrl(input);
  if (!url.startsWith("/")) return input;

  const absolute = `${currentBaseUrl}${url}`;
  if (typeof input === "string") return absolute;
  if (isUrl(input)) return new URL(absolute);
  return new Request(absolute, input as Request);
}

function mergeHeaders(...sources: Array<HeadersInit | undefined>): Headers {
  const headers = new Headers();

  for (const source of sources) {
    if (!source) continue;
    new Headers(source).forEach((value, key) => {
      headers.set(key, value);
    });
  }

  return headers;
}

function getMediaType(headers: Headers): string | null {
  const value = headers.get("content-type");
  return value ? value.split(";", 1)[0].trim().toLowerCase() : null;
}

function isJsonMediaType(mediaType: string | null): boolean {
  return mediaType === "application/json" || Boolean(mediaType?.endsWith("+json"));
}

function isTextMediaType(mediaType: string | null): boolean {
  return Boolean(
    mediaType &&
      (mediaType.startsWith("text/") ||
        mediaType === "application/xml" ||
        mediaType === "text/xml" ||
        mediaType.endsWith("+xml") ||
        mediaType === "application/x-www-form-urlencoded"),
  );
}

function hasNoBody(response: Response, method: string): boolean {
  if (method === "HEAD") return true;
  if (NO_BODY_STATUS.has(response.status)) return true;
  if (response.headers.get("content-length") === "0") return true;
  if (response.body === null) return true;
  return false;
}

function stripBom(text: string): string {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function looksLikeJson(text: string): boolean {
  const trimmed = text.trimStart();
  return trimmed.startsWith("{") || trimmed.startsWith("[");
}

function getStringField(value: unknown, key: string): string | undefined {
  if (!value || typeof value !== "object") return undefined;

  const candidate = (value as Record<string, unknown>)[key];
  if (typeof candidate !== "string") return undefined;

  const trimmed = candidate.trim();
  return trimmed === "" ? undefined : trimmed;
}

function truncate(text: string, maxLength = 300): string {
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}

function buildErrorMessage(response: Response, data: unknown): string {
  const prefix = `HTTP ${response.status} ${response.statusText}`;

  if (typeof data === "string") {
    const text = data.trim();
    return text ? `${prefix}: ${truncate(text)}` : prefix;
  }

  const title = getStringField(data, "title");
  const detail = getStringField(data, "detail");
  const message =
    getStringField(data, "message") ??
    getStringField(data, "error_description") ??
    getStringField(data, "error");

  if (title && detail) return `${prefix}: ${title} — ${detail}`;
  if (detail) return `${prefix}: ${detail}`;
  if (message) return `${prefix}: ${message}`;
  if (title) return `${prefix}: ${title}`;

  return prefix;
}

export class ApiError<T = unknown> extends Error {
  readonly name = "ApiError";
  readonly status: number;
  readonly statusText: string;
  readonly data: T | null;
  readonly headers: Headers;
  readonly response: Response;
  readonly method: string;
  readonly url: string;
  readonly requestId: string | null;

  constructor(
    response: Response,
    data: T | null,
    requestInfo: { method: string; url: string; requestId: string | null },
  ) {
    super(buildErrorMessage(response, data));
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = response.status;
    this.statusText = response.statusText;
    this.data = data;
    this.headers = response.headers;
    this.response = response;
    this.method = requestInfo.method;
    this.url = response.url || requestInfo.url;
    this.requestId = requestInfo.requestId;
  }
}

export class ResponseParseError extends Error {
  readonly name = "ResponseParseError";
  readonly status: number;
  readonly statusText: string;
  readonly headers: Headers;
  readonly response: Response;
  readonly method: string;
  readonly url: string;
  readonly rawBody: string;
  readonly cause: unknown;

  constructor(
    response: Response,
    rawBody: string,
    cause: unknown,
    requestInfo: { method: string; url: string },
  ) {
    super(
      `Failed to parse response from ${requestInfo.method} ${response.url || requestInfo.url} ` +
        `(${response.status} ${response.statusText}) as JSON`,
    );
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = response.status;
    this.statusText = response.statusText;
    this.headers = response.headers;
    this.response = response;
    this.method = requestInfo.method;
    this.url = response.url || requestInfo.url;
    this.rawBody = rawBody;
    this.cause = cause;
  }
}

async function parseJsonBody(
  response: Response,
  requestInfo: { method: string; url: string },
): Promise<unknown> {
  const raw = await response.text();
  const normalized = stripBom(raw);

  if (normalized.trim() === "") {
    return null;
  }

  try {
    return JSON.parse(normalized);
  } catch (cause) {
    throw new ResponseParseError(response, raw, cause, requestInfo);
  }
}

async function parseErrorBody(response: Response, method: string): Promise<unknown> {
  if (hasNoBody(response, method)) {
    return null;
  }

  const mediaType = getMediaType(response.headers);

  if (mediaType && !isJsonMediaType(mediaType) && !isTextMediaType(mediaType)) {
    return typeof response.blob === "function" ? response.blob() : response.text();
  }

  const raw = await response.text();
  const normalized = stripBom(raw);
  const trimmed = normalized.trim();

  if (trimmed === "") {
    return null;
  }

  if (isJsonMediaType(mediaType) || looksLikeJson(normalized)) {
    try {
      return JSON.parse(normalized);
    } catch {
      return raw;
    }
  }

  return raw;
}

function inferResponseType(response: Response): "json" | "text" | "blob" {
  const mediaType = getMediaType(response.headers);

  if (isJsonMediaType(mediaType)) return "json";
  if (isTextMediaType(mediaType) || mediaType == null) return "text";
  return "blob";
}

async function parseSuccessBody(
  response: Response,
  responseType: "json" | "text" | "blob" | "auto",
  requestInfo: { method: string; url: string },
): Promise<unknown> {
  if (hasNoBody(response, requestInfo.method)) {
    return null;
  }

  const effectiveType =
    responseType === "auto" ? inferResponseType(response) : responseType;

  switch (effectiveType) {
    case "json":
      return parseJsonBody(response, requestInfo);

    case "text": {
      const text = await response.text();
      return text === "" ? null : text;
    }

    case "blob":
      if (typeof response.blob !== "function") {
        throw new TypeError(
          "Blob responses are not supported in this runtime. " +
            'Use responseType "json" or "text" instead.',
        );
      }
      return response.blob();
  }
}

function buildRequestId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `req_${Math.random().toString(36).slice(2, 12)}`;
}

function shouldRetry(method: string, error: unknown): boolean {
  if (!["GET", "HEAD"].includes(method)) {
    return false;
  }

  if (error instanceof ApiError) {
    return error.status >= 500;
  }

  return (
    error instanceof Error &&
    (error.name === "AbortError" ||
      error.name === "TypeError" ||
      /network|fetch|timeout/i.test(error.message))
  );
}

function buildCombinedAbortSignal(
  externalSignal: AbortSignal | null | undefined,
  timeoutMs: number,
): { signal: AbortSignal; cleanup: () => void } {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const handleAbort = () => controller.abort();
  externalSignal?.addEventListener("abort", handleAbort);

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timeout);
      externalSignal?.removeEventListener("abort", handleAbort);
    },
  };
}

function markPrimaryWaking(error: unknown): void {
  const activeBackend = getCurrentBackend();
  if (!activeBackend || _activeBackendIndex !== 0) {
    return;
  }

  const nextHealth =
    error instanceof Error && error.name === "AbortError" ? "waking" : "unhealthy";

  syncRuntimeSnapshot({
    wakingUp: true,
    statusMessage: "Waking server up...",
    lastError: error instanceof Error ? error.message : String(error),
    health: {
      ..._runtimeSnapshot.health,
      [activeBackend.name]: nextHealth,
    },
  });
}

async function executeFetch(
  input: RequestInfo | URL,
  init: RequestInit,
): Promise<Response> {
  return fetch(input, {
    credentials: "include",
    ...init,
  });
}

export async function customFetch<T = unknown>(
  input: RequestInfo | URL,
  options: CustomFetchOptions = {},
): Promise<T> {
  const { responseType = "auto", headers: headersInit, signal, ...init } = options;
  const method = resolveMethod(input, init.method);

  if (init.body != null && (method === "GET" || method === "HEAD")) {
    throw new TypeError(`customFetch: ${method} requests cannot have a body.`);
  }

  const requestId = buildRequestId();
  const requestUrl = resolveUrl(input);
  const requestInfo = { method, url: requestUrl, requestId };

  let lastError: unknown;

  for (let attempt = 0; attempt <= _retryCount; attempt++) {
    const requestInput = applyBaseUrl(input);
    const headers = mergeHeaders(
      isRequest(requestInput) ? requestInput.headers : undefined,
      headersInit,
    );

    if (
      typeof init.body === "string" &&
      !headers.has("content-type") &&
      looksLikeJson(init.body)
    ) {
      headers.set("content-type", "application/json");
    }

    if (responseType === "json" && !headers.has("accept")) {
      headers.set("accept", DEFAULT_JSON_ACCEPT);
    }

    if (_authTokenGetter && !headers.has("authorization")) {
      const token = await _authTokenGetter();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    }

    if (!headers.has("x-request-id")) {
      headers.set("x-request-id", requestId);
    }

    const { signal: mergedSignal, cleanup } = buildCombinedAbortSignal(
      signal,
      _requestTimeoutMs,
    );

    syncRuntimeSnapshot({
      wakingUp: false,
      statusMessage: _runtimeSnapshot.fallbackMode
        ? "Backup backend selected manually."
        : null,
      lastRequestId: requestId,
    });

    try {
      const response = await executeFetch(requestInput, {
        ...init,
        method,
        headers,
        signal: mergedSignal,
      });

      cleanup();

      const activeBackend = getCurrentBackend();
      if (activeBackend) {
        updateBackendHealth(activeBackend.name, response.ok ? "healthy" : "unhealthy");
      }

      if (!response.ok) {
        const errorData = await parseErrorBody(response, method);
        throw new ApiError(response, errorData, requestInfo);
      }

      syncRuntimeSnapshot({
        wakingUp: false,
        statusMessage: _runtimeSnapshot.fallbackMode
          ? "Backup backend selected manually."
          : null,
        lastError: null,
      });

      return (await parseSuccessBody(response, responseType, requestInfo)) as T;
    } catch (error) {
      cleanup();
      lastError = error;

      if (_backends.length > 1 && _activeBackendIndex === 0) {
        markPrimaryWaking(error);
      }

      if (attempt < _retryCount && shouldRetry(method, error)) {
        continue;
      }

      syncRuntimeSnapshot({
        lastError: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  throw lastError;
}
