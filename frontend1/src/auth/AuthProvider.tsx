import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types";
import { csrf, http } from "../http";

type AuthContextValue = {
  me: User | null;
  ready: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void http("GET", "/api/me")
      .then(setMe)
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  async function login(email: string, password: string) {
    setError("");
    try {
      await csrf();
      setMe(await http("POST", "/login", { email, password }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    }
  }

  async function logout() {
    try {
      await http("POST", "/logout");
    } finally {
      setMe(null);
    }
  }

  return (
    <AuthContext.Provider value={{ me, ready, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("should be used inside auth provider");
  }
  return value;
}
