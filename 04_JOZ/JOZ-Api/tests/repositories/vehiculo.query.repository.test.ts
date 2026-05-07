jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    vehiculo: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { VehiculoQueryRepository } from "../../src/repositories/queries/vehiculos/vehiculo/vehiculo.query.repository";

describe("VehiculoQueryRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.vehiculo.findFirst.mockReset();
    prismaMock.vehiculo.findMany.mockReset();
  });

  it("mapea correctamente obtenerVehiculo", async () => {
    prismaMock.vehiculo.findFirst.mockResolvedValue({
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

    const result = await new VehiculoQueryRepository().obtenerVehiculo(9);

    expect(prismaMock.vehiculo.findFirst).toHaveBeenCalledWith({ where: { Id: 9 } });
    expect(result).toEqual({
      Id: 9,
      IdMarcaModeloVehiculo: 2,
      Ano: 2024,
      NumeroMotor: "ABC123",
      NumeroChasis: "XYZ987",
      Color: "Rojo",
      FechaCompra: new Date("2026-02-03T00:00:00.000Z"),
      MontoCompra: 15000000,
      Vendido: true,
      FechaVenta: null,
      MontoVenta: null,
    });
  });

  it("retorna null cuando no encuentra vehículo", async () => {
    prismaMock.vehiculo.findFirst.mockResolvedValue(null);

    const result = await new VehiculoQueryRepository().obtenerVehiculo(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente obtenerVehiculos", async () => {
    prismaMock.vehiculo.findMany.mockResolvedValue([
      {
        Id: 9,
        IdMarcaModeloVehiculo: 2,
        Ano: 2024,
        NumeroMotor: "ABC123",
        NumeroChasis: "XYZ987",
        Color: "Rojo",
        FechaCompra: new Date("2026-02-03T00:00:00.000Z"),
        MontoCompra: 15000000,
        Vendido: 0,
        FechaVenta: null,
        MontoVenta: null,
      },
    ]);

    const result = await new VehiculoQueryRepository().obtenerVehiculos();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      Id: 9,
      Color: "Rojo",
      Vendido: false,
    });
  });
});