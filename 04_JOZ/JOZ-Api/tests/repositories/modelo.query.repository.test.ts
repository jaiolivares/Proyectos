jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    modeloVehiculo: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { ModeloQueryRepository } from "../../src/repositories/queries/vehiculos/modelo/modelo.query.repository";

describe("ModeloQueryRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.modeloVehiculo.findFirst.mockReset();
    prismaMock.modeloVehiculo.findMany.mockReset();
  });

  it("mapea correctamente obtenerModelo", async () => {
    prismaMock.modeloVehiculo.findFirst.mockResolvedValue({ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });

    const result = await new ModeloQueryRepository().obtenerModelo(2);

    expect(prismaMock.modeloVehiculo.findFirst).toHaveBeenCalledWith({ where: { Id: 2 } });
    expect(result).toEqual({ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });
  });

  it("retorna null cuando no encuentra modelo", async () => {
    prismaMock.modeloVehiculo.findFirst.mockResolvedValue(null);

    const result = await new ModeloQueryRepository().obtenerModelo(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente obtenerModelos", async () => {
    prismaMock.modeloVehiculo.findMany.mockResolvedValue([{ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" }]);

    const result = await new ModeloQueryRepository().obtenerModelos();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });
  });
});
