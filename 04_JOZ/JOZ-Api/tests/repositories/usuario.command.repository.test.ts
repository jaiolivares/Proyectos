jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    usuario: {
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { UsuarioCommandRepository } from "../../src/repositories/commands/usuarios/usuario/usuario.command.repository";

describe("UsuarioCommandRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.usuario.create.mockReset();
    prismaMock.usuario.update.mockReset();
  });

  it("crea un usuario con campos por defecto de sistema", async () => {
    prismaMock.usuario.create.mockResolvedValue({ Id: 1, NombreUsuario: "javier" });

    await new UsuarioCommandRepository().crearUsuario({
      NombreUsuario: "javier",
      Password: "hash",
      Nombre: "Javier",
      SegundoNombre: null,
      ApellidoPaterno: "Olivares",
      ApellidoMaterno: "Zavala",
      Email: "javier@example.com",
    });

    expect(prismaMock.usuario.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        NombreUsuario: "javier",
        Password: "hash",
        Nombre: "Javier",
        SegundoNombre: null,
        ApellidoPaterno: "Olivares",
        ApellidoMaterno: "Zavala",
        Email: "javier@example.com",
        EstaBloqueado: 0,
        EstaActivo: 1,
      }),
    });
  });

  it("actualiza solo el password", async () => {
    prismaMock.usuario.update.mockResolvedValue({ Id: 1, Password: "nuevo-hash" });

    const result = await new UsuarioCommandRepository().actualizarPassword(1, "nuevo-hash");

    expect(prismaMock.usuario.update).toHaveBeenCalledWith({ where: { Id: 1 }, data: { Password: "nuevo-hash" } });
    expect(result).toEqual({ Id: 1, Password: "nuevo-hash" });
  });
});
