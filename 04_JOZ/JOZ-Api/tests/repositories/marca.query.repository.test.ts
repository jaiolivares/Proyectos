jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    marcaVehiculo: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { MarcaQueryRepository } from "../../src/repositories/queries/vehiculos/marca/marca.query.repository";

describe("MarcaQueryRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.marcaVehiculo.findFirst.mockReset();
    prismaMock.marcaVehiculo.findMany.mockReset();
  });

  it("mapea correctamente obtenerMarca", async () => {
    prismaMock.marcaVehiculo.findFirst.mockResolvedValue({ Id: 1, Marca: "Toyota", Descripcion: "Japon" });

    const result = await new MarcaQueryRepository().obtenerMarca(1);

    expect(prismaMock.marcaVehiculo.findFirst).toHaveBeenCalledWith({ where: { Id: 1 } });
    expect(result).toEqual({ Id: 1, Marca: "Toyota", Descripcion: "Japon" });
  });

  it("retorna null cuando no encuentra marca", async () => {
    prismaMock.marcaVehiculo.findFirst.mockResolvedValue(null);

    const result = await new MarcaQueryRepository().obtenerMarca(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente obtenerMarcas", async () => {
    prismaMock.marcaVehiculo.findMany.mockResolvedValue([{ Id: 1, Marca: "Toyota", Descripcion: "Japon" }]);

    const result = await new MarcaQueryRepository().obtenerMarcas();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ Id: 1, Marca: "Toyota", Descripcion: "Japon" });
  });
});
