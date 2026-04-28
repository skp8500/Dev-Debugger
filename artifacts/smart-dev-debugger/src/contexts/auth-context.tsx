import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  type PublicUser,
} from "@workspace/api-client-react";
import { ApiError } from "@workspace/api-client-react";

type AuthState = {
  user: PublicUser | null;
  status: "loading" | "authenticated" | "unauthenticated";
  refresh: () => Promise<void>;
  login: (email: string, password: string) => Promise<PublicUser>;
  register: (fullName: string, email: string, password: string) => Promise<PublicUser>;
  logout: () => Promise<void>;
  setUser: (user: PublicUser | null) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [status, setStatus] = useState<AuthState["status"]>("loading");

  const refresh = useCallback(async () => {
    try {
      const me = await getCurrentUser();
      setUser(me);
      setStatus("authenticated");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setUser(null);
        setStatus("unauthenticated");
      } else {
        setUser(null);
        setStatus("unauthenticated");
      }
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(
    async (email: string, password: string) => {
      const u = await loginUser({ email, password });
      setUser(u);
      setStatus("authenticated");
      await queryClient.invalidateQueries();
      return u;
    },
    [queryClient],
  );

  const register = useCallback(
    async (fullName: string, email: string, password: string) => {
      const u = await registerUser({ fullName, email, password });
      setUser(u);
      setStatus("authenticated");
      await queryClient.invalidateQueries();
      return u;
    },
    [queryClient],
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      /* swallow — clearing local state is what matters */
    }
    setUser(null);
    setStatus("unauthenticated");
    queryClient.clear();
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{ user, status, refresh, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
