jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    marcaModeloVehiculo: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { MarcaModeloVehiculoCommandRepository } from "../../src/repositories/commands/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.command.repository";

describe("MarcaModeloVehiculoCommandRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.marcaModeloVehiculo.create.mockReset();
    prismaMock.marcaModeloVehiculo.update.mockReset();
    prismaMock.marcaModeloVehiculo.delete.mockReset();
  });

  it("crea una asociación con el payload correcto", async () => {
    prismaMock.marcaModeloVehiculo.create.mockResolvedValue({ Id: 10, IdMarca: 1, IdModelo: 2 });

    const result = await new MarcaModeloVehiculoCommandRepository().crearMarcaModeloVehiculo({ IdMarca: 1, IdModeloVehiculo: 2 });

    expect(prismaMock.marcaModeloVehiculo.create).toHaveBeenCalledWith({ data: { IdMarca: 1, IdModelo: 2 } });
    expect(result).toEqual({ Id: 10, IdMarca: 1, IdModelo: 2 });
  });

  it("actualiza una asociación solo con campos enviados", async () => {
    prismaMock.marcaModeloVehiculo.update.mockResolvedValue({ Id: 10, IdMarca: 2, IdModelo: 3 });

    const result = await new MarcaModeloVehiculoCommandRepository().actualizarMarcaModeloVehiculo(10, { IdMarca: 2, IdModeloVehiculo: 3 });

    expect(prismaMock.marcaModeloVehiculo.update).toHaveBeenCalledWith({ where: { Id: 10 }, data: { IdMarca: 2, IdModelo: 3 } });
    expect(result).toEqual({ Id: 10, IdMarca: 2, IdModelo: 3 });
  });

  it("retorna el error si falla al eliminar", async () => {
    prismaMock.marcaModeloVehiculo.delete.mockRejectedValue(new Error("db error"));

    const result = await new MarcaModeloVehiculoCommandRepository().eliminarMarcaModeloVehiculo(10);

    expect(result).toBeInstanceOf(Object);
    expect(String(result)).toContain("db error");
  });
});