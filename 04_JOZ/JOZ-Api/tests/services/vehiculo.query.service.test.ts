import { VehiculoQueryService } from "../../src/services/queries/vehiculos/vehiculo/vehiculo.query.service";

describe("VehiculoQueryService", () => {
  const obtenerVehiculo = jest.fn();
  const obtenerVehiculos = jest.fn();

  const buildService = () =>
    new VehiculoQueryService({
      obtenerVehiculo,
      obtenerVehiculos,
    } as any);

  beforeEach(() => {
    obtenerVehiculo.mockReset();
    obtenerVehiculos.mockReset();
  });

  it("retorna null cuando el vehículo no existe", async () => {
    obtenerVehiculo.mockResolvedValue(null);

    const result = await buildService().obtenerVehiculo(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente un vehículo individual", async () => {
    obtenerVehiculo.mockResolvedValue({
      Id: 9,
      IdMarcaModeloVehiculo: 2,
      Ano: 2024,
      NumeroMotor: "ABC123",
      NumeroChasis: "XYZ987",
      Color: "Rojo",
      FechaCompra: new Date("2026-02-03T00:00:00.000Z"),
      MontoCompra: 15000000,
      Vendido: 1,
      FechaVenta: null,
      MontoVenta: null,
    });

    const result = await buildService().obtenerVehiculo(9);

    expect(result).toMatchObject({
      Id: 9,
      IdMarcaModeloVehiculo: 2,
      Vendido: 1,
    });
  });

  it("mapea una lista de vehículos", async () => {
    obtenerVehiculos.mockResolvedValue([
      {
        Id: 9,
        IdMarcaModeloVehiculo: 2,
        Ano: 2024,
        NumeroMotor: "ABC123",
        NumeroChasis: "XYZ987",
        Color: "Rojo",
        FechaCompra: new Date("2026-02-03T00:00:00.000Z"),
        MontoCompra: 15000000,
        Vendido: false,
        FechaVenta: null,
        MontoVenta: null,
      },
    ]);

    const result = await buildService().obtenerVehiculos();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      Id: 9,
      Color: "Rojo",
      MontoCompra: 15000000,
    });
  });
});