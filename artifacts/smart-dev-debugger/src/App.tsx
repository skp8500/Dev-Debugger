import { Layout } from "@/components/layout";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { RouteGuard } from "@/components/protected-route";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Home from "@/pages/home";
import History from "@/pages/history";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        if (
          typeof error === "object" &&
          error !== null &&
          "status" in error &&
          (error as { status: number }).status === 401
        ) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/">
        <RouteGuard mode="public-only">
          <Landing />
        </RouteGuard>
      </Route>
      <Route path="/login">
        <RouteGuard mode="public-only">
          <Login />
        </RouteGuard>
      </Route>
      <Route path="/register">
        <RouteGuard mode="public-only">
          <Register />
        </RouteGuard>
      </Route>
      <Route path="/dashboard">
        <RouteGuard mode="protected">
          <Layout>
            <Home />
          </Layout>
        </RouteGuard>
      </Route>
      <Route path="/history">
        <RouteGuard mode="protected">
          <Layout>
            <History />
          </Layout>
        </RouteGuard>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="devdebug-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
