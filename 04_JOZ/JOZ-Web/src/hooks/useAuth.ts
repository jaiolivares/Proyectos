import { useState } from "react";
import { AUTH_STORAGE_KEY, LoginRequest, User } from "../models/auths/user";
import { AuthService, IAuthService } from "../services/auths/auth.service";

function loadStoredUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

function persistUser(user: User | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (user) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function useAuth(authService: IAuthService = new AuthService()) {
  const [user, setUser] = useState<User | null>(() => loadStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const u = await authService.login(payload);
      setUser(u);
      persistUser(u);
      return u;
    } catch (err: any) {
      setError(err?.response?.data?.Mensaje || err?.response?.data?.message || err.message || "Login error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    persistUser(null);
  };

  return { user, loading, error, login, logout };
}
