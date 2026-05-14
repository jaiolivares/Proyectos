jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    comuna: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { ComunaQueryRepository } from "../../src/repositories/queries/ubicaciones/comuna/comuna.query.repository";

describe("ComunaQueryRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.comuna.findFirst.mockReset();
    prismaMock.comuna.findMany.mockReset();
  });

  it("mapea correctamente obtenerComuna", async () => {
    prismaMock.comuna.findFirst.mockResolvedValue({
      Id: 4,
      IdCiudad: 2,
      Codigo: "13101",
      Descripcion: "Santiago",
    });

    const result = await new ComunaQueryRepository().obtenerComuna(4);

    expect(prismaMock.comuna.findFirst).toHaveBeenCalledWith({ where: { Id: 4 } });
    expect(result).toEqual({
      Id: 4,
      IdCiudad: 2,
      Codigo: "13101",
      Descripcion: "Santiago",
    });
  });

  it("retorna null cuando no encuentra comuna", async () => {
    prismaMock.comuna.findFirst.mockResolvedValue(null);

    const result = await new ComunaQueryRepository().obtenerComuna(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente obtenerComunas", async () => {
    prismaMock.comuna.findMany.mockResolvedValue([
      {
        Id: 4,
        IdCiudad: 2,
        Codigo: "13101",
        Descripcion: "Santiago",
      },
    ]);

    const result = await new ComunaQueryRepository().obtenerComunas();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      Id: 4,
      IdCiudad: 2,
      Codigo: "13101",
      Descripcion: "Santiago",
    });
  });
});
