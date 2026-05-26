import { MarcaModeloVehiculoCommandService } from "../../src/services/commands/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.command.service";

describe("MarcaModeloVehiculoCommandService", () => {
  const crearMarcaModeloVehiculo = jest.fn();
  const actualizarMarcaModeloVehiculo = jest.fn();
  const eliminarMarcaModeloVehiculo = jest.fn();
  const obtenerMarcaModeloVehiculo = jest.fn();
  const obtenerMarca = jest.fn();
  const obtenerModelo = jest.fn();

  const buildService = () =>
    new MarcaModeloVehiculoCommandService({ crearMarcaModeloVehiculo, actualizarMarcaModeloVehiculo, eliminarMarcaModeloVehiculo } as any, { obtenerMarcaModeloVehiculo } as any, { obtenerMarca } as any, { obtenerModelo } as any);

  beforeEach(() => {
    crearMarcaModeloVehiculo.mockReset();
    actualizarMarcaModeloVehiculo.mockReset();
    eliminarMarcaModeloVehiculo.mockReset();
    obtenerMarcaModeloVehiculo.mockReset();
    obtenerMarca.mockReset();
    obtenerModelo.mockReset();
  });

  it("crea una asociación marca-modelo", async () => {
    const body = { IdMarca: 1, IdModelo: 2 };
    obtenerMarca.mockResolvedValue({ Id: 1 });
    obtenerModelo.mockResolvedValue({ Id: 2 });
    crearMarcaModeloVehiculo.mockResolvedValue({ Id: 10, ...body });

    const result = await buildService().crearMarcaModeloVehiculo(body);

    expect(crearMarcaModeloVehiculo).toHaveBeenCalledWith(body);
    expect(result).toEqual({ Id: 10, ...body });
  });

  it("lanza error al actualizar si la asociación no existe", async () => {
    obtenerMarcaModeloVehiculo.mockResolvedValue(null);

    await expect(buildService().actualizarMarcaModeloVehiculo(10, { IdMarca: 2, IdModelo: 3 } as any)).rejects.toThrow("MarcaModeloVehiculo no encontrado");
    expect(actualizarMarcaModeloVehiculo).not.toHaveBeenCalled();
  });

  it("elimina solo si la asociación existe", async () => {
    obtenerMarcaModeloVehiculo.mockResolvedValue({ Id: 10 });
    eliminarMarcaModeloVehiculo.mockResolvedValue("OK");

    const result = await buildService().eliminarMarcaModeloVehiculo(10);

    expect(eliminarMarcaModeloVehiculo).toHaveBeenCalledWith(10);
    expect(result).toBe("OK");
  });
});
