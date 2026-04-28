import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut, ChevronUp, Battery } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

const MAX_CREDITS = 100;

function getInitials(fullName?: string | null): string {
  const safeName = fullName?.trim() ?? "";
  if (!safeName) return "?";
  const parts = safeName.split(/\s+/);
  if (parts.length === 0) return "?";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase() || "?";
}

function getCreditColor(credits: number): {
  bar: string;
  dot: string;
  text: string;
} {
  const ratio = credits / MAX_CREDITS;
  if (ratio > 0.5)
    return {
      bar: "bg-emerald-500",
      dot: "bg-emerald-500",
      text: "text-emerald-500",
    };
  if (ratio > 0.2)
    return {
      bar: "bg-yellow-500",
      dot: "bg-yellow-500",
      text: "text-yellow-500",
    };
  return { bar: "bg-red-500", dot: "bg-red-500", text: "text-red-500" };
}

export function UserPanel() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!user) return null;

  const initials = getInitials(user.fullName ?? user.email);
  const credits = Math.max(0, user.credits);
  const colors = getCreditColor(credits);
  const pct = Math.min(100, (credits / MAX_CREDITS) * 100);

  const handleLogout = async () => {
    setConfirmOpen(false);
    setExpanded(false);
    await logout();
    setLocation("/login");
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50">
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-72 rounded-2xl border bg-card text-card-foreground shadow-2xl overflow-hidden"
              data-testid="user-panel-expanded"
            >
              <div className="p-4 flex items-start gap-3 border-b">
                <div className="relative">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/15 text-primary flex items-center justify-center font-semibold ring-2 ring-primary/20">
                      {initials}
                    </div>
                  )}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-card ${colors.dot}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate" title={user.fullName ?? user.email ?? ""}>
                    {user.fullName ?? user.email ?? ""}
                  </div>
                  <div className="text-xs text-muted-foreground truncate" title={user.email}>
                    {user.email}
                  </div>
                </div>
                <button
                  onClick={() => setExpanded(false)}
                  className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted transition-colors"
                  aria-label="Collapse panel"
                  data-testid="button-collapse-panel"
                >
                  <ChevronUp className="h-4 w-4 rotate-180" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Battery className={`h-3.5 w-3.5 ${colors.text}`} />
                    Credits
                  </span>
                  <span className={`font-mono font-medium ${colors.text}`} data-testid="text-credits-count">
                    {credits} / {MAX_CREDITS}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={`h-full ${colors.bar}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="p-3 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setConfirmOpen(true)}
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="collapsed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={() => setExpanded(true)}
              className="relative group rounded-full shadow-lg ring-2 ring-background hover:ring-primary/40 transition-all"
              aria-label="Open user panel"
              data-testid="button-open-user-panel"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/15 text-primary flex items-center justify-center font-semibold">
                  {initials}
                </div>
              )}
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-background ${colors.dot}`}
                title={`${credits} credits remaining`}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out?</AlertDialogTitle>
            <AlertDialogDescription>
              You'll need to sign in again to access your dashboard and history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-logout">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} data-testid="button-confirm-logout">
              Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
