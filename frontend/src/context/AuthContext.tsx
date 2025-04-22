import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { User } from "../types";

interface LoginResponse {
  token: string;
  user: User;
}

interface AuthCtx {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");

    if (t) setToken(t);

    if (u) {
      try {
        setUser(JSON.parse(u));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res: LoginResponse = await authService.login(email, password);
    console.log('respuesta login: ', res);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Ctx.Provider value={{ user, token, login, logout }}>
      {children}
    </Ctx.Provider>
  );
};
