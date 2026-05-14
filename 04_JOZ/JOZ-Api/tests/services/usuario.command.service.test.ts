const encriptarPasswordMock = jest.fn();

jest.mock("../../src/services/commands/auths/auth/auth.command.service", () => ({
  AuthCommandService: jest.fn().mockImplementation(() => ({
    encriptarPassword: encriptarPasswordMock,
  })),
}));

import { UsuarioCommandService } from "../../src/services/commands/usuarios/usuario/usuario.command.service";

describe("UsuarioCommandService", () => {
  const crearUsuario = jest.fn();
  const actualizarPassword = jest.fn();
  const obtenerUsuario = jest.fn();

  const buildService = () =>
    new UsuarioCommandService(
      {
        crearUsuario,
        actualizarPassword,
      } as any,
      {
        obtenerUsuario,
      } as any,
    );

  beforeEach(() => {
    encriptarPasswordMock.mockReset();
    crearUsuario.mockReset();
    actualizarPassword.mockReset();
    obtenerUsuario.mockReset();
  });

  it("encripta el password y mapea la respuesta al crear usuario", async () => {
    const fechaCreacion = new Date("2026-01-01T00:00:00.000Z");
    const body = {
      NombreUsuario: "javier",
      Password: "secreto",
      Nombre: "Javier",
      SegundoNombre: null,
      ApellidoPaterno: "Olivares",
      ApellidoMaterno: "Zavala",
      Email: "javier@example.com",
    };
    encriptarPasswordMock.mockResolvedValue("hash-nuevo");
    crearUsuario.mockResolvedValue({
      Id: 1,
      NombreUsuario: "javier",
      Password: "hash-nuevo",
      Nombre: "Javier",
      SegundoNombre: null,
      ApellidoPaterno: "Olivares",
      ApellidoMaterno: "Zavala",
      Email: "javier@example.com",
      FechaCreacion: fechaCreacion,
    });

    const result = await buildService().crearUsuario(body);

    expect(encriptarPasswordMock).toHaveBeenCalledWith("secreto");
    expect(crearUsuario).toHaveBeenCalledWith({ ...body, Password: "hash-nuevo" });
    expect(result).toEqual({
      Id: 1,
      NombreUsuario: "javier",
      Nombre: "Javier",
      SegundoNombre: null,
      ApellidoPaterno: "Olivares",
      ApellidoMaterno: "Zavala",
      Email: "javier@example.com",
      FechaCreacion: fechaCreacion,
    });
  });

  it("retorna null al actualizar password si el usuario no existe", async () => {
    obtenerUsuario.mockResolvedValue(null);

    const result = await buildService().actualizarPassword(99, "nuevo-secreto");

    expect(encriptarPasswordMock).not.toHaveBeenCalled();
    expect(actualizarPassword).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("encripta el nuevo password y mapea la respuesta al actualizar", async () => {
    const fechaCreacion = new Date("2026-01-01T00:00:00.000Z");
    obtenerUsuario.mockResolvedValue({ Id: 1 });
    encriptarPasswordMock.mockResolvedValue("hash-actualizado");
    actualizarPassword.mockResolvedValue({
      Id: 1,
      NombreUsuario: "javier",
      Password: "hash-actualizado",
      Nombre: "Javier",
      SegundoNombre: "",
      ApellidoPaterno: "Olivares",
      ApellidoMaterno: "Zavala",
      Email: "javier@example.com",
      FechaCreacion: fechaCreacion,
    });

    const result = await buildService().actualizarPassword(1, "nuevo-secreto");

    expect(encriptarPasswordMock).toHaveBeenCalledWith("nuevo-secreto");
    expect(actualizarPassword).toHaveBeenCalledWith(1, "hash-actualizado");
    expect(result).toEqual({
      Id: 1,
      NombreUsuario: "javier",
      Nombre: "Javier",
      SegundoNombre: "",
      ApellidoPaterno: "Olivares",
      ApellidoMaterno: "Zavala",
      Email: "javier@example.com",
      FechaCreacion: fechaCreacion,
    });
  });
});
