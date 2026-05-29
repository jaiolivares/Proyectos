import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuth } from "../../src/hooks/useAuth";
import { AUTH_STORAGE_KEY, LoginRequest, User } from "../../src/models/auths/user";
import { IAuthService } from "../../src/services/auths/auth.service";

describe("useAuth", () => {
  const payload: LoginRequest = {
    NombreUsuario: "jai",
    Password: "123",
  };

  const user: User = {
    Id: 1,
    NombreUsuario: "jai",
    Nombre: "Javier",
    Email: "jai@example.com",
    token: "token-123",
  };

  it("carga el usuario almacenado al iniciar", () => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

    const authService: IAuthService = {
      login: vi.fn(),
    };

    const { result } = renderHook(() => useAuth(authService));

    expect(result.current.user).toEqual(user);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("persiste el usuario despues de login exitoso", async () => {
    const authService: IAuthService = {
      login: vi.fn().mockResolvedValue(user),
    };

    const { result } = renderHook(() => useAuth(authService));

    await act(async () => {
      await result.current.login(payload);
    });

    expect(authService.login).toHaveBeenCalledWith(payload);
    expect(result.current.user).toEqual(user);
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBe(JSON.stringify(user));
    expect(result.current.error).toBeNull();
  });

  it("expone el error de login y mantiene loading consistente", async () => {
    const authService: IAuthService = {
      login: vi.fn().mockRejectedValue(new Error("Credenciales invalidas")),
    };

    const { result } = renderHook(() => useAuth(authService));

    await act(async () => {
      await expect(result.current.login(payload)).rejects.toThrow("Credenciales invalidas");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Credenciales invalidas");
    });
    expect(result.current.user).toBeNull();
  });

  it("logout limpia usuario, error y storage", async () => {
    const authService: IAuthService = {
      login: vi.fn().mockResolvedValue(user),
    };

    const { result } = renderHook(() => useAuth(authService));

    await act(async () => {
      await result.current.login(payload);
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });
});
