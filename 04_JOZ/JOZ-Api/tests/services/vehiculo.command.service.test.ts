import { VehiculoCommandService } from "../../src/services/commands/vehiculos/vehiculo/vehiculo.command.service";

describe("VehiculoCommandService", () => {
  const crearVehiculo = jest.fn();
  const actualizarVehiculo = jest.fn();
  const eliminarVehiculo = jest.fn();
  const obtenerVehiculo = jest.fn();
  const obtenerMarcaModeloVehiculo = jest.fn();

  const buildService = () =>
    new VehiculoCommandService(
      {
        crearVehiculo,
        actualizarVehiculo,
        eliminarVehiculo,
      } as any,
      {
        obtenerVehiculo,
      } as any,
      {
        obtenerMarcaModeloVehiculo,
      } as any,
    );

  const createRequest = {
    IdMarcaModeloVehiculo: 1,
    Ano: 2024,
    NumeroMotor: "ABC123",
    NumeroChasis: "XYZ987",
    Color: "Rojo",
    FechaCompra: new Date("2026-02-03T00:00:00.000Z"),
    MontoCompra: 15000000,
  };

  beforeEach(() => {
    crearVehiculo.mockReset();
    actualizarVehiculo.mockReset();
    eliminarVehiculo.mockReset();
    obtenerVehiculo.mockReset();
    obtenerMarcaModeloVehiculo.mockReset();
  });

  it("lanza error al crear cuando el IdMarcaModeloVehiculo no existe", async () => {
    obtenerMarcaModeloVehiculo.mockResolvedValue(null);

    await expect(buildService().crearVehiculo(createRequest)).rejects.toThrow("IdMarcaModeloVehiculo no es válido");
    expect(crearVehiculo).not.toHaveBeenCalled();
  });

  it("mapea la respuesta al crear un vehículo válido", async () => {
    obtenerMarcaModeloVehiculo.mockResolvedValue({ Id: 1 });
    crearVehiculo.mockResolvedValue({
      Id: 9,
      IdMarcaModeloVehiculo: 1,
      Ano: 2024,
      NumeroMotor: "ABC123",
      NumeroChasis: "XYZ987",
      Color: "Rojo",
      FechaCompra: new Date("2026-02-03T00:00:00.000Z"),
      MontoCompra: 15000000,
      Vendido: false,
      FechaVenta: null,
      MontoVenta: null,
    });

    const result = await buildService().crearVehiculo(createRequest);

    expect(crearVehiculo).toHaveBeenCalledWith(createRequest);
    expect(result).toEqual({
      Id: 9,
      IdMarcaModeloVehiculo: 1,
      Ano: 2024,
      NumeroMotor: "ABC123",
      NumeroChasis: "XYZ987",
      Color: "Rojo",
      FechaCompra: new Date("2026-02-03T00:00:00.000Z"),
      MontoCompra: 15000000,
    });
  });

  it("lanza error al actualizar cuando el vehículo no existe", async () => {
    obtenerVehiculo.mockResolvedValue(null);

    await expect(buildService().actualizarVehiculo(9, createRequest)).rejects.toThrow("Vehículo no encontrado");
    expect(actualizarVehiculo).not.toHaveBeenCalled();
  });

  it("lanza error al actualizar cuando el IdMarcaModeloVehiculo no es válido", async () => {
    obtenerVehiculo.mockResolvedValue({ Id: 9 });
    obtenerMarcaModeloVehiculo.mockResolvedValue(null);

    await expect(buildService().actualizarVehiculo(9, createRequest)).rejects.toThrow("IdMarcaModeloVehiculo no es válido");
    expect(actualizarVehiculo).not.toHaveBeenCalled();
  });

  it("elimina cuando el vehículo existe", async () => {
    obtenerVehiculo.mockResolvedValue({ Id: 9 });
    eliminarVehiculo.mockResolvedValue("Vehículo eliminado correctamente");

    const result = await buildService().eliminarVehiculo(9);

    expect(eliminarVehiculo).toHaveBeenCalledWith(9);
    expect(result).toBe("Vehículo eliminado correctamente");
  });
});
