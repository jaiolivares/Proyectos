import axios from "axios";
import { AUTH_STORAGE_KEY } from "../models/user";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const authRaw = typeof window !== "undefined" ? window.localStorage.getItem(AUTH_STORAGE_KEY) : null;

  if (authRaw) {
    try {
      const auth = JSON.parse(authRaw) as { token?: string };
      if (auth.token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
    } catch {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }

  return config;
});

export default http;
