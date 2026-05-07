import { MarcaQueryService } from "../../src/services/queries/vehiculos/marca/marca.query.service";

describe("MarcaQueryService", () => {
  const obtenerMarca = jest.fn();
  const obtenerMarcas = jest.fn();

  const buildService = () =>
    new MarcaQueryService({
      obtenerMarca,
      obtenerMarcas,
    } as any);

  beforeEach(() => {
    obtenerMarca.mockReset();
    obtenerMarcas.mockReset();
  });

  it("retorna null cuando la marca no existe", async () => {
    obtenerMarca.mockResolvedValue(null);

    const result = await buildService().obtenerMarca(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente una marca", async () => {
    obtenerMarca.mockResolvedValue({ Id: 1, Marca: "Toyota", Descripcion: "Japon" });

    const result = await buildService().obtenerMarca(1);

    expect(result).toEqual({ Id: 1, Marca: "Toyota", Descripcion: "Japon" });
  });

  it("mapea una lista de marcas", async () => {
    obtenerMarcas.mockResolvedValue([{ Id: 1, Marca: "Toyota", Descripcion: "Japon" }]);

    const result = await buildService().obtenerMarcas();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ Id: 1, Marca: "Toyota", Descripcion: "Japon" });
  });
});