import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiRequest } from "@/lib/api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
  message: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<string>;
  signup: (payload: { name: string; email: string; password: string }) => Promise<string>;
  logout: () => void;
}

const authTokenStorageKey = "nutrition-cart-auth-token";
const authUserStorageKey = "nutrition-cart-auth-user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredUser() {
  const user = localStorage.getItem(authUserStorageKey);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    localStorage.removeItem(authUserStorageKey);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(authTokenStorageKey));
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());
  const [isLoading, setIsLoading] = useState(Boolean(localStorage.getItem(authTokenStorageKey)));

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    let ignore = false;

    async function syncSession() {
      try {
        const response = await apiRequest<{ user: AuthUser }>("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!ignore) {
          setUser(response.user);
          localStorage.setItem(authUserStorageKey, JSON.stringify(response.user));
        }
      } catch {
        if (!ignore) {
          localStorage.removeItem(authTokenStorageKey);
          localStorage.removeItem(authUserStorageKey);
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void syncSession();

    return () => {
      ignore = true;
    };
  }, [token]);

  function persistSession(response: AuthResponse) {
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem(authTokenStorageKey, response.token);
    localStorage.setItem(authUserStorageKey, JSON.stringify(response.user));
  }

  async function login(credentials: { email: string; password: string }) {
    const response = await apiRequest<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    persistSession(response);
    return response.message;
  }

  async function signup(payload: { name: string; email: string; password: string }) {
    const response = await apiRequest<AuthResponse>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    persistSession(response);
    return response.message;
  }

  function logout() {
    localStorage.removeItem(authTokenStorageKey);
    localStorage.removeItem(authUserStorageKey);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
