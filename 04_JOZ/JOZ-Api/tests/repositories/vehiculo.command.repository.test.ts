jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    vehiculo: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { VehiculoCommandRepository } from "../../src/repositories/commands/vehiculos/vehiculo/vehiculo.command.repository";

describe("VehiculoCommandRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.vehiculo.create.mockReset();
    prismaMock.vehiculo.update.mockReset();
    prismaMock.vehiculo.delete.mockReset();
  });

  it("crea un vehículo y mapea Vendido a boolean", async () => {
    const fechaCompra = new Date("2026-02-03T00:00:00.000Z");
    prismaMock.vehiculo.create.mockResolvedValue({
      Id: 9,
      IdMarcaModeloVehiculo: 2,
      Ano: 2024,
      NumeroMotor: "ABC123",
      NumeroChasis: "XYZ987",
      Color: "Rojo",
      FechaCompra: fechaCompra,
      MontoCompra: 15000000,
      Vendido: 0,
      FechaVenta: null,
      MontoVenta: null,
    });

    const result = await new VehiculoCommandRepository().crearVehiculo({
      IdMarcaModeloVehiculo: 2,
      Ano: 2024,
      NumeroMotor: "ABC123",
      NumeroChasis: "XYZ987",
      Color: "Rojo",
      FechaCompra: fechaCompra,
      MontoCompra: 15000000,
    });

    expect(prismaMock.vehiculo.create).toHaveBeenCalledWith({
      data: {
        IdMarcaModeloVehiculo: 2,
        Ano: 2024,
        NumeroMotor: "ABC123",
        NumeroChasis: "XYZ987",
        Color: "Rojo",
        FechaCompra: fechaCompra,
        MontoCompra: 15000000,
        Vendido: 0,
        FechaVenta: null,
        MontoVenta: null,
      },
    });
    expect(result).toMatchObject({ Id: 9, Vendido: false });
  });

  it("actualiza un vehículo transformando Vendido a 1/0", async () => {
    const fechaCompra = new Date("2026-02-03T00:00:00.000Z");
    const fechaVenta = new Date("2026-03-01T00:00:00.000Z");
    prismaMock.vehiculo.update.mockResolvedValue({
      Id: 9,
      IdMarcaModeloVehiculo: 2,
      Ano: 2024,
      NumeroMotor: "ABC123",
      NumeroChasis: "XYZ987",
      Color: "Negro",
      FechaCompra: fechaCompra,
      MontoCompra: 15000000,
      Vendido: 1,
      FechaVenta: fechaVenta,
      MontoVenta: 17000000,
    });

    const result = await new VehiculoCommandRepository().actualizarVehiculo(9, {
      Color: "Negro",
      Vendido: true,
      FechaVenta: fechaVenta,
      MontoVenta: 17000000,
    } as any);

    expect(prismaMock.vehiculo.update).toHaveBeenCalledWith({
      where: { Id: 9 },
      data: { Color: "Negro", Vendido: 1, FechaVenta: fechaVenta, MontoVenta: 17000000 },
    });
    expect(result).toMatchObject({ Id: 9, Vendido: true, Color: "Negro" });
  });

  it("retorna Ok al eliminar correctamente", async () => {
    prismaMock.vehiculo.delete.mockResolvedValue({});

    const result = await new VehiculoCommandRepository().eliminarVehiculo(9);

    expect(result).toBe("OK");
  });
});
