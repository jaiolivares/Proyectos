import { ComunaQueryService } from "../../src/services/queries/ubicaciones/comuna/comuna.query.service";

describe("ComunaQueryService", () => {
  const obtenerComuna = jest.fn();
  const obtenerComunas = jest.fn();

  const buildService = () =>
    new ComunaQueryService({
      obtenerComuna,
      obtenerComunas,
    } as any);

  beforeEach(() => {
    obtenerComuna.mockReset();
    obtenerComunas.mockReset();
  });

  it("retorna null cuando la comuna no existe", async () => {
    obtenerComuna.mockResolvedValue(null);

    const result = await buildService().obtenerComuna(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente una comuna", async () => {
    obtenerComuna.mockResolvedValue({
      Id: 4,
      IdCiudad: 2,
      Codigo: "13101",
      Descripcion: "Santiago",
    });

    const result = await buildService().obtenerComuna(4);

    expect(result).toEqual({
      Id: 4,
      IdCiudad: 2,
      Codigo: "13101",
      Descripcion: "Santiago",
    });
  });

  it("mapea una lista de comunas", async () => {
    obtenerComunas.mockResolvedValue([
      {
        Id: 4,
        IdCiudad: 2,
        Codigo: "13101",
        Descripcion: "Santiago",
      },
    ]);

    const result = await buildService().obtenerComunas();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      Id: 4,
      IdCiudad: 2,
      Codigo: "13101",
      Descripcion: "Santiago",
    });
  });
});