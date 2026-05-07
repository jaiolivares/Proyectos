jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    modeloVehiculo: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { ModeloCommandRepository } from "../../src/repositories/commands/vehiculos/modelo/modelo.command.repository";

describe("ModeloCommandRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.modeloVehiculo.create.mockReset();
    prismaMock.modeloVehiculo.update.mockReset();
    prismaMock.modeloVehiculo.delete.mockReset();
  });

  it("crea un modelo con el payload correcto", async () => {
    prismaMock.modeloVehiculo.create.mockResolvedValue({ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });

    const result = await new ModeloCommandRepository().crearModelo({ IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });

    expect(prismaMock.modeloVehiculo.create).toHaveBeenCalledWith({ data: { IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" } });
    expect(result).toEqual({ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });
  });

  it("actualiza un modelo solo con campos enviados", async () => {
    prismaMock.modeloVehiculo.update.mockResolvedValue({ Id: 2, IdTipoVehiculo: 2, Modelo: "Corolla", Descripcion: "Sedan" });

    const result = await new ModeloCommandRepository().actualizarModelo(2, { IdTipoVehiculo: 2, Modelo: "Corolla" } as any);

    expect(prismaMock.modeloVehiculo.update).toHaveBeenCalledWith({ where: { Id: 2 }, data: { IdTipoVehiculo: 2, Modelo: "Corolla" } });
    expect(result).toEqual({ Id: 2, IdTipoVehiculo: 2, Modelo: "Corolla", Descripcion: "Sedan" });
  });

  it("retorna true si elimina correctamente", async () => {
    prismaMock.modeloVehiculo.delete.mockResolvedValue({});

    const result = await new ModeloCommandRepository().eliminarModelo(2);

    expect(result).toBe(true);
  });
});