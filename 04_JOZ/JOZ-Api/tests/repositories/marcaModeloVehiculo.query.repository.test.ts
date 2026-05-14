jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    marcaModeloVehiculo: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { MarcaModeloVehiculoQueryRepository } from "../../src/repositories/queries/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.query.repository";

describe("MarcaModeloVehiculoQueryRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.marcaModeloVehiculo.findFirst.mockReset();
    prismaMock.marcaModeloVehiculo.findMany.mockReset();
  });

  it("mapea correctamente obtenerMarcaModeloVehiculo", async () => {
    prismaMock.marcaModeloVehiculo.findFirst.mockResolvedValue({ Id: 10, IdMarca: 1, IdModelo: 2 });

    const result = await new MarcaModeloVehiculoQueryRepository().obtenerMarcaModeloVehiculo(10);

    expect(prismaMock.marcaModeloVehiculo.findFirst).toHaveBeenCalledWith({ where: { Id: 10 } });
    expect(result).toEqual({ Id: 10, IdMarca: 1, IdModeloVehiculo: 2 });
  });

  it("retorna null cuando no encuentra asociación", async () => {
    prismaMock.marcaModeloVehiculo.findFirst.mockResolvedValue(null);

    const result = await new MarcaModeloVehiculoQueryRepository().obtenerMarcaModeloVehiculo(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente obtenerMarcaModeloVehiculos", async () => {
    prismaMock.marcaModeloVehiculo.findMany.mockResolvedValue([{ Id: 10, IdMarca: 1, IdModelo: 2 }]);

    const result = await new MarcaModeloVehiculoQueryRepository().obtenerMarcaModeloVehiculos();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ Id: 10, IdMarca: 1, IdModeloVehiculo: 2 });
  });
});
