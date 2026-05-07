jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    usuario: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { UsuarioQueryRepository } from "../../src/repositories/queries/usuarios/usuario/usuario.query.repository";

describe("UsuarioQueryRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.usuario.findFirst.mockReset();
    prismaMock.usuario.findMany.mockReset();
  });

  it("lanza error cuando el id no es válido", async () => {
    await expect(new UsuarioQueryRepository().obtenerUsuario(Number.NaN)).rejects.toThrow(
      "El id es obligatorio y debe ser un número"
    );
  });

  it("mapea correctamente obtenerUsuario", async () => {
    prismaMock.usuario.findFirst.mockResolvedValue({
      Id: 1,
      NombreUsuario: "javier",
      Password: "hash",
      Nombre: "Javier",
      SegundoNombre: null,
      ApellidoPaterno: "Olivares",
      ApellidoMaterno: null,
      Email: "javier@example.com",
      FechaCreacion: new Date("2026-01-01T00:00:00.000Z"),
      FechaUltimoLogin: null,
      EstaBloqueado: true,
      EstaActivo: false,
    });

    const result = await new UsuarioQueryRepository().obtenerUsuario(1);

    expect(prismaMock.usuario.findFirst).toHaveBeenCalledWith({ where: { Id: 1 } });
    expect(result).toEqual({
      Id: 1,
      NombreUsuario: "javier",
      Password: "hash",
      Nombre: "Javier",
      SegundoNombre: "",
      ApellidoPaterno: "Olivares",
      ApellidoMaterno: "",
      Email: "javier@example.com",
      FechaCreacion: new Date("2026-01-01T00:00:00.000Z"),
      FechaUltimoLogin: null,
      EstaBloqueado: 1,
      EstaActivo: 0,
    });
  });

  it("lanza error cuando falta nombre de usuario", async () => {
    await expect(new UsuarioQueryRepository().obtenerPorNombreUsuario("")).rejects.toThrow(
      "El nombre de usuario es obligatorio"
    );
  });

  it("mapea correctamente obtenerUsuarios", async () => {
    prismaMock.usuario.findMany.mockResolvedValue([
      {
        Id: 1,
        NombreUsuario: "javier",
        Password: "hash",
        Nombre: "Javier",
        SegundoNombre: null,
        ApellidoPaterno: "Olivares",
        ApellidoMaterno: null,
        Email: "javier@example.com",
        FechaCreacion: new Date("2026-01-01T00:00:00.000Z"),
        FechaUltimoLogin: null,
        EstaBloqueado: false,
        EstaActivo: true,
      },
    ]);

    const result = await new UsuarioQueryRepository().obtenerUsuarios();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      NombreUsuario: "javier",
      EstaBloqueado: 0,
      EstaActivo: 1,
    });
  });
});