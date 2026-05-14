import { AlertCircle, RefreshCw, ServerCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBackend } from "@/contexts/backend-context";
import type { ApiBackendDefinition } from "@/lib/api";

function getHealthTone(
  health: "unknown" | "healthy" | "unhealthy" | "waking",
): string {
  switch (health) {
    case "healthy":
      return "text-emerald-600";
    case "waking":
      return "text-amber-600";
    case "unhealthy":
      return "text-red-600";
    default:
      return "text-muted-foreground";
  }
}

export function BackendBanner() {
  const backend = useBackend();

  const shouldShow =
    backend.wakingUp || backend.fallbackMode || Boolean(backend.statusMessage);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="border-b bg-amber-50/80 px-4 py-2 text-sm text-amber-950 backdrop-blur md:px-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-2">
          {backend.fallbackMode ? (
            <AlertCircle className="mt-0.5 h-4 w-4" />
          ) : (
            <ServerCog className="mt-0.5 h-4 w-4" />
          )}
          <div>
            <p className="font-medium">
              {backend.wakingUp
                ? "Waking server up..."
                : backend.statusMessage ?? "Backup backend is active."}
            </p>
            <p className="text-xs text-amber-900/80">
              Active backend: {backend.activeBackend ?? "local"}
              {backend.fallbackMode ? " • failover mode enabled" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-xs text-amber-900/80 md:block">
            {backend.backends.map((candidate: ApiBackendDefinition) => (
              <span key={candidate.name} className="mr-3">
                <span className={getHealthTone(backend.health[candidate.name] ?? "unknown")}>
                  {candidate.name}
                </span>
              </span>
            ))}
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 border-amber-300 bg-transparent"
            onClick={() => {
              void backend.refreshHealth();
            }}
          >
            <RefreshCw className="mr-2 h-3.5 w-3.5" />
            Recheck
          </Button>
        </div>
      </div>
    </div>
  );
}
