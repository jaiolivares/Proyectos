import { ModeloCommandService } from "../../src/services/commands/vehiculos/modelo/modelo.command.service";

describe("ModeloCommandService", () => {
  const crearModelo = jest.fn();
  const actualizarModelo = jest.fn();
  const eliminarModelo = jest.fn();
  const obtenerModelo = jest.fn();

  const buildService = () => new ModeloCommandService({ crearModelo, actualizarModelo, eliminarModelo } as any, { obtenerModelo } as any);

  beforeEach(() => {
    crearModelo.mockReset();
    actualizarModelo.mockReset();
    eliminarModelo.mockReset();
    obtenerModelo.mockReset();
  });

  it("crea un modelo", async () => {
    const body = { IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" };
    crearModelo.mockResolvedValue({ Id: 2, ...body });

    const result = await buildService().crearModelo(body);

    expect(crearModelo).toHaveBeenCalledWith(body);
    expect(result).toEqual({ Id: 2, ...body });
  });

  it("retorna null al actualizar si el modelo no existe", async () => {
    obtenerModelo.mockResolvedValue(null);

    const result = await buildService().actualizarModelo(2, { Modelo: "Corolla" } as any);

    expect(actualizarModelo).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("elimina solo si el modelo existe", async () => {
    obtenerModelo.mockResolvedValue({ Id: 2 });
    eliminarModelo.mockResolvedValue(true);

    const result = await buildService().eliminarModelo(2);

    expect(eliminarModelo).toHaveBeenCalledWith(2);
    expect(result).toBe(true);
  });
});
