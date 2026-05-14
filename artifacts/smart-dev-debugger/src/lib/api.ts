import {
  configureApiRuntime,
  customFetch,
  getApiRuntimeSnapshot,
  getApiUrl,
  probeBackendHealth,
  setActiveBackend,
  subscribeToApiRuntime,
  type ApiBackendDefinition,
  type ApiRuntimeSnapshot,
  type CustomFetchOptions,
} from "../../../../lib/api-client-react/src/custom-fetch";

const PRIMARY_API_URL = import.meta.env.VITE_API_PRIMARY?.trim() ?? "";
const BACKUP_API_URL = import.meta.env.VITE_API_BACKUP?.trim() ?? "";
const REQUEST_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 8_000);
const RETRY_COUNT = Number(import.meta.env.VITE_API_RETRY_COUNT ?? 2);

export function getConfiguredBackends(): ApiBackendDefinition[] {
  const backends: ApiBackendDefinition[] = [];

  if (PRIMARY_API_URL) {
    backends.push({
      name: import.meta.env.VITE_API_PRIMARY_NAME?.trim() || "railway",
      baseUrl: PRIMARY_API_URL,
    });
  }

  if (BACKUP_API_URL) {
    backends.push({
      name: import.meta.env.VITE_API_BACKUP_NAME?.trim() || "render",
      baseUrl: BACKUP_API_URL,
    });
  }

  return backends;
}

export function initializeApiLayer(): void {
  configureApiRuntime({
    backends: getConfiguredBackends(),
    requestTimeoutMs: Number.isFinite(REQUEST_TIMEOUT_MS)
      ? REQUEST_TIMEOUT_MS
      : 8_000,
    retryCount: Number.isFinite(RETRY_COUNT) ? RETRY_COUNT : 2,
  });
}

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: CustomFetchOptions = {},
): Promise<T> {
  return customFetch<T>(endpoint, options);
}

export {
  getApiRuntimeSnapshot,
  getApiUrl,
  probeBackendHealth,
  setActiveBackend,
  subscribeToApiRuntime,
};

export type { ApiBackendDefinition, ApiRuntimeSnapshot, CustomFetchOptions };
