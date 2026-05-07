jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    taller: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { TallerQueryRepository } from "../../src/repositories/queries/vehiculos/taller/taller.query.repository";

describe("TallerQueryRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.taller.findFirst.mockReset();
    prismaMock.taller.findMany.mockReset();
  });

  it("mapea correctamente obtenerTaller", async () => {
    prismaMock.taller.findFirst.mockResolvedValue({ Id: 8, Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" });

    const result = await new TallerQueryRepository().obtenerTaller(8);

    expect(prismaMock.taller.findFirst).toHaveBeenCalledWith({ where: { Id: 8 } });
    expect(result).toEqual({ Id: 8, Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" });
  });

  it("retorna null cuando no encuentra taller", async () => {
    prismaMock.taller.findFirst.mockResolvedValue(null);

    const result = await new TallerQueryRepository().obtenerTaller(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente obtenerTalleres", async () => {
    prismaMock.taller.findMany.mockResolvedValue([{ Id: 8, Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" }]);

    const result = await new TallerQueryRepository().obtenerTalleres();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ Id: 8, Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" });
  });
});