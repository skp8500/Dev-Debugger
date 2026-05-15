import { AlertCircle, RefreshCw, ServerCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBackend } from "@/contexts/backend-context";

function getHealthTone(
  health: "unknown" | "healthy" | "unhealthy" | "waking",
): string {
  switch (health) {
    case "healthy":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "waking":
      return "bg-amber-500/10 text-amber-700 border-amber-500/20";
    case "unhealthy":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function formatStatusLabel(
  health: "unknown" | "healthy" | "unhealthy" | "waking",
): string {
  switch (health) {
    case "healthy":
      return "Healthy";
    case "waking":
      return "Waking";
    case "unhealthy":
      return "Unhealthy";
    default:
      return "Unknown";
  }
}

export default function Backend() {
  const backend = useBackend();
  const frontendOrigin =
    typeof window !== "undefined" ? window.location.origin : "Current frontend";

  return (
    <div className="flex-1 overflow-y-auto bg-muted/10 p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Status</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Live health view for the frontend and connected backend services.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              void backend.refreshHealth();
            }}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Recheck
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {backend.fallbackMode ? (
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                ) : (
                  <ServerCog className="h-5 w-5 text-primary" />
                )}
                API Runtime
              </CardTitle>
              <CardDescription>
                Current backend selection and request routing state.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
                <span className="text-muted-foreground">Active backend</span>
                <span className="font-medium">{backend.activeBackend ?? "local"}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
                <span className="text-muted-foreground">Fallback mode</span>
                <Badge variant="outline">
                  {backend.fallbackMode ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
                <span className="text-muted-foreground">Waking state</span>
                <Badge variant="outline">
                  {backend.wakingUp ? "Waking server up" : "Idle"}
                </Badge>
              </div>
              {backend.statusMessage ? (
                <div className="rounded-lg border border-amber-300/60 bg-amber-50/80 px-4 py-3 text-amber-950">
                  {backend.statusMessage}
                </div>
              ) : null}
              {backend.lastError ? (
                <div className="rounded-lg border border-red-300/60 bg-red-50 px-4 py-3 text-red-700">
                  Last error: {backend.lastError}
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frontend</CardTitle>
              <CardDescription>Current app availability and runtime details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className={getHealthTone("healthy")}>
                  Up
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
                <span className="text-muted-foreground">Origin</span>
                <span className="max-w-[9rem] truncate text-xs font-medium">
                  {frontendOrigin}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
                <span className="text-muted-foreground">Last request ID</span>
                <span className="max-w-[9rem] truncate font-mono text-xs">
                  {backend.lastRequestId ?? "n/a"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
                <span className="text-muted-foreground">Timeout / Retries</span>
                <span className="text-xs font-medium">
                  {backend.requestTimeoutMs} ms / {backend.retryCount}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Backend Services</CardTitle>
            <CardDescription>
              Health and endpoint details for each connected backend.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {backend.backends.map((candidate) => {
              const health = backend.health[candidate.name] ?? "unknown";
              const isActive = backend.activeBackend === candidate.name;

              return (
                <div
                  key={candidate.name}
                  className="rounded-xl border bg-background p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold">{candidate.name}</h2>
                        {isActive ? <Badge>Active</Badge> : null}
                      </div>
                      <p className="break-all text-xs text-muted-foreground">
                        {candidate.baseUrl}
                      </p>
                    </div>
                    <Badge variant="outline" className={getHealthTone(health)}>
                      {formatStatusLabel(health)}
                    </Badge>
                  </div>
                </div>
              );
            })}
            {backend.backends.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No backends are configured in the frontend environment.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
