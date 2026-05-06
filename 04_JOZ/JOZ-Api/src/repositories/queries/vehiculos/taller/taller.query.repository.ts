import prisma from "../../../../prisma";
import { Taller } from "../../../../models/vehiculos/taller.model";

export class TallerQueryRepository {
  public async obtenerTalleres(): Promise<Taller[]> {
    const results = await prisma.taller.findMany();
    return results.map((r) => this.mapPrismaTaller(r));
  }

  public async obtenerTaller(id: number): Promise<Taller | null> {
    const found = await prisma.taller.findFirst({ where: { Id: Number(id) } });
    return found ? this.mapPrismaTaller(found) : null;
  }

  private mapPrismaTaller(record: any): Taller {
    return {
      Id: record.Id,
      Nombre: record.Nombre,
      IdComuna: record.IdComuna,
      Direccion: record.Direccion,
    };
  }
}
