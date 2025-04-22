// src/services/authService.ts
import { api } from "./api";
import { User } from "../types";

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return data;
  },
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    await api.post("/auth/register", { name, email, password });
  },
};
