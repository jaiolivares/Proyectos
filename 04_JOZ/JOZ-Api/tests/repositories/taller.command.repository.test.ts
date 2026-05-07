jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    taller: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

import prisma from "../../src/prisma";
import { TallerCommandRepository } from "../../src/repositories/commands/vehiculos/taller/taller.command.repository";

describe("TallerCommandRepository", () => {
  const prismaMock = prisma as any;

  beforeEach(() => {
    prismaMock.taller.create.mockReset();
    prismaMock.taller.update.mockReset();
    prismaMock.taller.delete.mockReset();
  });

  it("crea un taller con el payload correcto", async () => {
    prismaMock.taller.create.mockResolvedValue({ Id: 8, Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" });

    const result = await new TallerCommandRepository().crearTaller({ Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" });

    expect(prismaMock.taller.create).toHaveBeenCalledWith({ data: { Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" } });
    expect(result).toEqual({ Id: 8, Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" });
  });

  it("actualiza un taller solo con campos enviados", async () => {
    prismaMock.taller.update.mockResolvedValue({ Id: 8, Nombre: "Taller Centro", IdComuna: 4, Direccion: "Av. Central 100" });

    const result = await new TallerCommandRepository().actualizarTaller(8, { Nombre: "Taller Centro", Direccion: "Av. Central 100" } as any);

    expect(prismaMock.taller.update).toHaveBeenCalledWith({ where: { Id: 8 }, data: { Nombre: "Taller Centro", Direccion: "Av. Central 100" } });
    expect(result).toEqual({ Id: 8, Nombre: "Taller Centro", IdComuna: 4, Direccion: "Av. Central 100" });
  });

  it("retorna OK al eliminar correctamente", async () => {
    prismaMock.taller.delete.mockResolvedValue({});

    const result = await new TallerCommandRepository().eliminarTaller(8);

    expect(result).toBe("OK");
  });
});