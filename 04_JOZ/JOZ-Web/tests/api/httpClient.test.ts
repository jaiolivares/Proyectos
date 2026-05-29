import http from "../../src/api/httpClient";
import { AUTH_STORAGE_KEY } from "../../src/models/auths/user";

describe("httpClient", () => {
  const runInterceptor = async () => {
    const requestInterceptor = (http.interceptors.request as any).handlers[0];

    return requestInterceptor.fulfilled({ headers: {} });
  };

  it("agrega Authorization cuando existe un token persistido", async () => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token: "abc123" }));

    const config = await runInterceptor();

    expect(config.headers.Authorization).toBe("Bearer abc123");
  });

  it("elimina el storage corrupto y no agrega Authorization", async () => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "{invalid-json");

    const config = await runInterceptor();

    expect(config.headers.Authorization).toBeUndefined();
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });
});
