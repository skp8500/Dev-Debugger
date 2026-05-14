import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getApiRuntimeSnapshot,
  initializeApiLayer,
  probeBackendHealth,
  setActiveBackend,
  subscribeToApiRuntime,
  type ApiBackendDefinition,
  type ApiRuntimeSnapshot,
} from "@/lib/api";

type BackendContextValue = ApiRuntimeSnapshot & {
  refreshHealth: () => Promise<void>;
};

const BackendContext = createContext<BackendContextValue | null>(null);

const HEALTH_POLL_INTERVAL_MS = 30_000;

export function BackendProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<ApiRuntimeSnapshot>(() =>
    getApiRuntimeSnapshot(),
  );

  useEffect(() => {
    initializeApiLayer();
    setSnapshot(getApiRuntimeSnapshot());

    const unsubscribe = subscribeToApiRuntime(setSnapshot);
    return unsubscribe;
  }, []);

  const refreshHealth = useCallback(async (): Promise<void> => {
    const current = getApiRuntimeSnapshot();

    if (current.backends.length === 0) {
      return;
    }

    const results = await Promise.all(
      current.backends.map((backend: ApiBackendDefinition) =>
        probeBackendHealth(backend.name),
      ),
    );

    const activeBackend = current.activeBackend;
    const activeResult = activeBackend
      ? results.find(
          (result: { backend: string }) => result.backend === activeBackend,
        )
      : null;
    const healthyPrimary = results[0]?.ok ?? false;
    const healthyBackup = results[1]?.ok ?? false;

    if (activeResult && !activeResult.ok && healthyBackup) {
      setActiveBackend(results[1]!.backend);
      return;
    }

    if (!current.fallbackMode && !healthyPrimary && healthyBackup) {
      setActiveBackend(results[1]!.backend);
    }
  }, []);

  useEffect(() => {
    void refreshHealth();

    const interval = window.setInterval(() => {
      void refreshHealth();
    }, HEALTH_POLL_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [refreshHealth]);

  const value = useMemo<BackendContextValue>(
    () => ({
      ...snapshot,
      refreshHealth,
    }),
    [snapshot, refreshHealth],
  );

  return (
    <BackendContext.Provider value={value}>{children}</BackendContext.Provider>
  );
}

export function useBackend(): BackendContextValue {
  const context = useContext(BackendContext);
  if (!context) {
    throw new Error("useBackend must be used within BackendProvider");
  }

  return context;
}
