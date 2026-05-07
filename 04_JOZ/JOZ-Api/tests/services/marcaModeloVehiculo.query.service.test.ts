import { MarcaModeloVehiculoQueryService } from "../../src/services/queries/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.query.service";

describe("MarcaModeloVehiculoQueryService", () => {
  const obtenerMarcaModeloVehiculo = jest.fn();
  const obtenerMarcaModeloVehiculos = jest.fn();

  const buildService = () =>
    new MarcaModeloVehiculoQueryService({
      obtenerMarcaModeloVehiculo,
      obtenerMarcaModeloVehiculos,
    } as any);

  beforeEach(() => {
    obtenerMarcaModeloVehiculo.mockReset();
    obtenerMarcaModeloVehiculos.mockReset();
  });

  it("retorna null cuando la asociación no existe", async () => {
    obtenerMarcaModeloVehiculo.mockResolvedValue(null);

    const result = await buildService().obtenerMarcaModeloVehiculo(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente una asociación", async () => {
    obtenerMarcaModeloVehiculo.mockResolvedValue({ Id: 10, IdMarca: 1, IdModeloVehiculo: 2 });

    const result = await buildService().obtenerMarcaModeloVehiculo(10);

    expect(result).toEqual({ Id: 10, IdMarca: 1, IdModeloVehiculo: 2 });
  });

  it("mapea una lista de asociaciones", async () => {
    obtenerMarcaModeloVehiculos.mockResolvedValue([{ Id: 10, IdMarca: 1, IdModeloVehiculo: 2 }]);

    const result = await buildService().obtenerMarcaModeloVehiculos();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ Id: 10, IdMarca: 1, IdModeloVehiculo: 2 });
  });
});