import { LoginRequest } from "../../../src/models/auths/user";
import { AuthService } from "../../../src/services/auths/auth.service";

describe("AuthService", () => {
  const payload: LoginRequest = {
    NombreUsuario: "jai",
    Password: "123",
  };

  it("mapea la respuesta de login al modelo User", async () => {
    const httpClient = {
      post: vi.fn().mockResolvedValue({
        data: {
          Mensaje: "OK",
          Dato: {
            token: "token-123",
            usuario: {
              Id: 1,
              NombreUsuario: "jai",
              Nombre: "Javier",
              Email: "jai@example.com",
            },
          },
        },
      }),
    };

    const service = new AuthService(httpClient as any);

    await expect(service.login(payload)).resolves.toEqual({
      Id: 1,
      NombreUsuario: "jai",
      Nombre: "Javier",
      Email: "jai@example.com",
      token: "token-123",
    });
  });

  it("falla cuando la API no retorna token o usuario", async () => {
    const httpClient = {
      post: vi.fn().mockResolvedValue({
        data: {
          Mensaje: "Respuesta invalida",
          Dato: null,
        },
      }),
    };

    const service = new AuthService(httpClient as any);

    await expect(service.login(payload)).rejects.toThrow("Respuesta invalida");
  });
});
