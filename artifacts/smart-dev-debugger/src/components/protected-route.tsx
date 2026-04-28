import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { Terminal } from "lucide-react";

type Mode = "protected" | "public-only";

export function RouteGuard({
  mode,
  children,
}: {
  mode: Mode;
  children: ReactNode;
}) {
  const { status } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (status === "loading") return;
    if (mode === "protected" && status === "unauthenticated") {
      setLocation("/login");
    } else if (mode === "public-only" && status === "authenticated") {
      setLocation("/dashboard");
    }
  }, [status, mode, setLocation]);

  if (status === "loading") {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Terminal className="h-8 w-8 text-primary animate-pulse" />
          <span className="text-sm">Loading…</span>
        </div>
      </div>
    );
  }

  if (mode === "protected" && status !== "authenticated") return null;
  if (mode === "public-only" && status !== "unauthenticated") return null;

  return <>{children}</>;
}
