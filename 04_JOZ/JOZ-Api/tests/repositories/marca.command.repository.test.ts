jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    marcaVehiculo: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { MarcaCommandRepository } from "../../src/repositories/commands/vehiculos/marca/marca.command.repository";

describe("MarcaCommandRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.marcaVehiculo.create.mockReset();
    prismaMock.marcaVehiculo.update.mockReset();
    prismaMock.marcaVehiculo.delete.mockReset();
  });

  it("crea una marca con el payload correcto", async () => {
    prismaMock.marcaVehiculo.create.mockResolvedValue({ Id: 1, Marca: "Toyota", Descripcion: "Japon" });

    const result = await new MarcaCommandRepository().crearMarca({ Marca: "Toyota", Descripcion: "Japon" });

    expect(prismaMock.marcaVehiculo.create).toHaveBeenCalledWith({ data: { Marca: "Toyota", Descripcion: "Japon" } });
    expect(result).toEqual({ Id: 1, Marca: "Toyota", Descripcion: "Japon" });
  });

  it("actualiza una marca solo con campos enviados", async () => {
    prismaMock.marcaVehiculo.update.mockResolvedValue({ Id: 1, Marca: "Mazda", Descripcion: "Japon" });

    const result = await new MarcaCommandRepository().actualizarMarca(1, { Marca: "Mazda" } as any);

    expect(prismaMock.marcaVehiculo.update).toHaveBeenCalledWith({ where: { Id: 1 }, data: { Marca: "Mazda" } });
    expect(result).toEqual({ Id: 1, Marca: "Mazda", Descripcion: "Japon" });
  });

  it("propaga el error si falla al eliminar", async () => {
    prismaMock.marcaVehiculo.delete.mockRejectedValue(new Error("db error"));

    await expect(new MarcaCommandRepository().eliminarMarca(1)).rejects.toThrow("db error");
  });
});
