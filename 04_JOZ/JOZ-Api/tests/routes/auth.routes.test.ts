import express from "express";
import request from "supertest";

const loginMock = jest.fn();

jest.mock("../../src/services/commands/auths/auth/auth.command.service", () => ({
  AuthCommandService: jest.fn().mockImplementation(() => ({
    login: loginMock,
  })),
}));

jest.mock("../../src/services/queries/usuarios/usuario/usuario.query.service", () => ({
  UsuarioQueryService: jest.fn().mockImplementation(() => ({})),
}));

import authRoutes from "../../src/routes/auths/auth.routes";

describe("Auth routes", () => {
  const buildApp = () => {
    const app = express();
    app.use(express.json());
    app.use("/api/auth", authRoutes);
    return app;
  };

  beforeEach(() => {
    loginMock.mockReset();
  });

  it("retorna 400 cuando faltan credenciales", async () => {
    const response = await request(buildApp())
      .post("/api/auth/login")
      .send({ NombreUsuario: "javier" });

    expect(response.status).toBe(400);
    expect(loginMock).not.toHaveBeenCalled();
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "NombreUsuario y Password son obligatorios",
      Dato: null,
    });
  });

  it("retorna 401 cuando el servicio no autentica", async () => {
    loginMock.mockResolvedValue(null);

    const response = await request(buildApp())
      .post("/api/auth/login")
      .send({ NombreUsuario: "javier", Password: "secreto" });

    expect(response.status).toBe(401);
    expect(loginMock).toHaveBeenCalledWith("javier", "secreto");
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "Credenciales inválidas",
      Dato: null,
    });
  });

  it("retorna 200 cuando el servicio autentica correctamente", async () => {
    const loginResponse = {
      token: "jwt-token",
      usuario: {
        Id: 1,
        NombreUsuario: "javier",
        Password: "hash",
        Nombre: "Javier",
        SegundoNombre: "",
        ApellidoPaterno: "Olivares",
        ApellidoMaterno: "Zavala",
        Email: "javier@example.com",
        FechaCreacion: new Date("2026-01-01T00:00:00.000Z"),
        FechaUltimoLogin: null,
        EstaBloqueado: false,
        EstaActivo: true,
      },
    };
    loginMock.mockResolvedValue(loginResponse);

    const response = await request(buildApp())
      .post("/api/auth/login")
      .send({ NombreUsuario: "javier", Password: "secreto" });

    expect(response.status).toBe(200);
    expect(response.body.EjecucionCorrecta).toBe(true);
    expect(response.body.Mensaje).toBe("Login exitoso");
    expect(response.body.Dato).toMatchObject({
      token: "jwt-token",
      usuario: {
        Id: 1,
        NombreUsuario: "javier",
        Email: "javier@example.com",
        EstaActivo: true,
      },
    });
  });
});