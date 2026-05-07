import { ModeloQueryService } from "../../src/services/queries/vehiculos/modelo/modelo.query.service";

describe("ModeloQueryService", () => {
  const obtenerModelo = jest.fn();
  const obtenerModelos = jest.fn();

  const buildService = () =>
    new ModeloQueryService({
      obtenerModelo,
      obtenerModelos,
    } as any);

  beforeEach(() => {
    obtenerModelo.mockReset();
    obtenerModelos.mockReset();
  });

  it("retorna null cuando el modelo no existe", async () => {
    obtenerModelo.mockResolvedValue(null);

    const result = await buildService().obtenerModelo(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente un modelo", async () => {
    obtenerModelo.mockResolvedValue({ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });

    const result = await buildService().obtenerModelo(2);

    expect(result).toEqual({ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });
  });

  it("mapea una lista de modelos", async () => {
    obtenerModelos.mockResolvedValue([{ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" }]);

    const result = await buildService().obtenerModelos();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });
  });
});