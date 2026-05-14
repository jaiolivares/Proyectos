import { UsuarioQueryService } from "../../src/services/queries/usuarios/usuario/usuario.query.service";

describe("UsuarioQueryService", () => {
  const obtenerUsuario = jest.fn();
  const obtenerUsuarios = jest.fn();
  const obtenerPorNombreUsuario = jest.fn();

  const buildService = () =>
    new UsuarioQueryService({
      obtenerUsuario,
      obtenerUsuarios,
      obtenerPorNombreUsuario,
    } as any);

  beforeEach(() => {
    obtenerUsuario.mockReset();
    obtenerUsuarios.mockReset();
    obtenerPorNombreUsuario.mockReset();
  });

  it("retorna null cuando el usuario no existe", async () => {
    obtenerUsuario.mockResolvedValue(null);

    const result = await buildService().obtenerUsuario(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente un usuario individual", async () => {
    obtenerUsuario.mockResolvedValue({
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
      EstaBloqueado: 0,
      EstaActivo: 1,
    });

    const result = await buildService().obtenerUsuario(1);

    expect(result).toMatchObject({
      Id: 1,
      NombreUsuario: "javier",
      SegundoNombre: "",
      ApellidoMaterno: "",
      EstaBloqueado: false,
      EstaActivo: true,
    });
  });

  it("mapea correctamente la búsqueda por nombre de usuario", async () => {
    obtenerPorNombreUsuario.mockResolvedValue({
      Id: 3,
      NombreUsuario: "maria",
      Password: "hash-2",
      Nombre: "Maria",
      SegundoNombre: "Jose",
      ApellidoPaterno: "Lopez",
      ApellidoMaterno: "Diaz",
      Email: "maria@example.com",
      FechaCreacion: new Date("2026-02-01T00:00:00.000Z"),
      FechaUltimoLogin: new Date("2026-02-02T00:00:00.000Z"),
      EstaBloqueado: 1,
      EstaActivo: 0,
    });

    const result = await buildService().obtenerPorNombreUsuario("maria");

    expect(result).toMatchObject({
      Id: 3,
      NombreUsuario: "maria",
      EstaBloqueado: true,
      EstaActivo: false,
    });
  });

  it("mapea una lista de usuarios", async () => {
    obtenerUsuarios.mockResolvedValue([
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
        EstaBloqueado: 0,
        EstaActivo: 1,
      },
    ]);

    const result = await buildService().obtenerUsuarios();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      Id: 1,
      NombreUsuario: "javier",
      EstaActivo: true,
    });
  });
});
