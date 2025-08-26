import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: { username, password },
      });
      
      setToken(data.token);

      const getRole = jwtDecode(data.token).role;
      setRole(getRole || "");
      localStorage.setItem("token", data.token);
      if (getRole) localStorage.setItem("role", getRole);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken("");
    setRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // Interceptor “manual”: si alguna llamada marca UNAUTHORIZED, desloguea
  const safeApi = async (path, options = {}) => {
    try {
      return await apiFetch(path, { ...options, token });
    } catch (e) {
      if (e.message === "UNAUTHORIZED") logout();
      throw e;
    }
  };

  const value = useMemo(
    () => ({ token, role, loading, login, logout, api: safeApi }),
    [token, role, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
