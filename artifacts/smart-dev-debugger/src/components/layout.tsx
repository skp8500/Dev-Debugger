import React from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "./theme-provider";
import { Terminal, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { UserPanel } from "./user-panel";

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const isHistory = location.startsWith("/history");

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 px-4 md:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80" data-testid="link-home">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg tracking-tight">Smart Dev Debugger</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/history"
            className={`text-sm font-medium transition-colors ${
              isHistory ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            data-testid="link-history"
          >
            History
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8"
            data-testid="button-toggle-theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">{children}</main>
      <UserPanel />
    </div>
  );
}
