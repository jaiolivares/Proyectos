import express from "express";
import request from "supertest";

const crearUsuarioMock = jest.fn();
const actualizarPasswordMock = jest.fn();
const obtenerUsuariosMock = jest.fn();
const obtenerUsuarioMock = jest.fn();

jest.mock("../../src/services/commands/usuarios/usuario/usuario.command.service", () => ({
  UsuarioCommandService: jest.fn().mockImplementation(() => ({
    crearUsuario: crearUsuarioMock,
    actualizarPassword: actualizarPasswordMock,
  })),
}));

jest.mock("../../src/services/queries/usuarios/usuario/usuario.query.service", () => ({
  UsuarioQueryService: jest.fn().mockImplementation(() => ({
    obtenerUsuarios: obtenerUsuariosMock,
    obtenerUsuario: obtenerUsuarioMock,
  })),
}));

import usuarioRoutes from "../../src/routes/usuarios/usuario.routes";

describe("Usuario routes", () => {
  const buildApp = () => {
    const app = express();
    app.use(express.json());
    app.use("/api/usuario", usuarioRoutes);
    return app;
  };

  beforeEach(() => {
    crearUsuarioMock.mockReset();
    actualizarPasswordMock.mockReset();
    obtenerUsuariosMock.mockReset();
    obtenerUsuarioMock.mockReset();
  });

  it("retorna usuarios en GET /api/usuario/obtenerTodos", async () => {
    obtenerUsuariosMock.mockResolvedValue([
      {
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
    ]);

    const response = await request(buildApp()).get("/api/usuario/obtenerTodos");

    expect(response.status).toBe(200);
    expect(response.body.EjecucionCorrecta).toBe(true);
    expect(response.body.Dato).toHaveLength(1);
    expect(response.body.Dato[0]).toMatchObject({
      Id: 1,
      NombreUsuario: "javier",
      Email: "javier@example.com",
    });
  });

  it("retorna arreglo vacío en obtenerTodos cuando no hay usuarios", async () => {
    obtenerUsuariosMock.mockResolvedValue([]);

    const response = await request(buildApp()).get("/api/usuario/obtenerTodos");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      EjecucionCorrecta: true,
      Mensaje: "",
      Dato: [],
    });
  });

  it("retorna 400 cuando el id es inválido", async () => {
    const response = await request(buildApp()).get("/api/usuario/obtenerPorId/abc");

    expect(obtenerUsuarioMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "ID inválido",
      Dato: null,
    });
  });

  it("retorna 404 cuando el usuario no existe", async () => {
    obtenerUsuarioMock.mockResolvedValue(null);

    const response = await request(buildApp()).get("/api/usuario/obtenerPorId/99");

    expect(obtenerUsuarioMock).toHaveBeenCalledWith(99);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "Usuario no encontrado",
      Dato: null,
    });
  });

  it("retorna 200 cuando el usuario existe", async () => {
    obtenerUsuarioMock.mockResolvedValue({
      Id: 2,
      NombreUsuario: "ana",
      Password: "hash",
      Nombre: "Ana",
      SegundoNombre: null,
      ApellidoPaterno: "Perez",
      ApellidoMaterno: "Diaz",
      Email: "ana@example.com",
      FechaCreacion: new Date("2026-01-01T00:00:00.000Z"),
      FechaUltimoLogin: null,
      EstaBloqueado: false,
      EstaActivo: true,
    });

    const response = await request(buildApp()).get("/api/usuario/obtenerPorId/2");

    expect(obtenerUsuarioMock).toHaveBeenCalledWith(2);
    expect(response.status).toBe(200);
    expect(response.body.EjecucionCorrecta).toBe(true);
    expect(response.body.Dato).toMatchObject({
      Id: 2,
      NombreUsuario: "ana",
      Email: "ana@example.com",
    });
  });

  it("retorna 400 cuando el body de creación es inválido", async () => {
    const response = await request(buildApp()).post("/api/usuario/crear").send({
      NombreUsuario: "",
      Password: "",
      Nombre: "Javier",
      ApellidoPaterno: "",
      Email: "",
    });

    expect(crearUsuarioMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "NombreUsuario, Password, Nombre, ApellidoPaterno y Email son obligatorios",
      Dato: null,
    });
  });

  it("retorna 201 cuando crea un usuario", async () => {
    crearUsuarioMock.mockResolvedValue({
      Id: 1,
      NombreUsuario: "javier",
      Nombre: "Javier",
      SegundoNombre: null,
      ApellidoPaterno: "Olivares",
      ApellidoMaterno: "Zavala",
      Email: "javier@example.com",
      FechaCreacion: new Date("2026-01-01T00:00:00.000Z"),
    });

    const body = {
      NombreUsuario: "javier",
      Password: "secreto",
      Nombre: "Javier",
      SegundoNombre: null,
      ApellidoPaterno: "Olivares",
      ApellidoMaterno: "Zavala",
      Email: "javier@example.com",
    };

    const response = await request(buildApp()).post("/api/usuario/crear").send(body);

    expect(crearUsuarioMock).toHaveBeenCalledWith(body);
    expect(response.status).toBe(201);
    expect(response.body.EjecucionCorrecta).toBe(true);
    expect(response.body.Dato).toMatchObject({
      Id: 1,
      NombreUsuario: "javier",
      Email: "javier@example.com",
    });
  });

  it("retorna 400 cuando falta Password al actualizar", async () => {
    const response = await request(buildApp()).put("/api/usuario/actualizarPassword/1").send({});

    expect(actualizarPasswordMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "Password es obligatorio",
      Dato: null,
    });
  });

  it("retorna 200 cuando actualiza password correctamente", async () => {
    actualizarPasswordMock.mockResolvedValue({
      Id: 1,
      NombreUsuario: "javier",
      Nombre: "Javier",
      SegundoNombre: null,
      ApellidoPaterno: "Olivares",
      ApellidoMaterno: "Zavala",
      Email: "javier@example.com",
      FechaCreacion: new Date("2026-01-01T00:00:00.000Z"),
    });

    const response = await request(buildApp()).put("/api/usuario/actualizarPassword/1").send({ Password: "nueva-clave" });

    expect(actualizarPasswordMock).toHaveBeenCalledWith(1, "nueva-clave");
    expect(response.status).toBe(200);
    expect(response.body.EjecucionCorrecta).toBe(true);
    expect(response.body.Dato).toMatchObject({
      Id: 1,
      NombreUsuario: "javier",
      Email: "javier@example.com",
    });
  });
});
