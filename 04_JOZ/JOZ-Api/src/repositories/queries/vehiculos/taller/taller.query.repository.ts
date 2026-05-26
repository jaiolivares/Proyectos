import { TallerModel } from "../../../../models/vehiculos/taller.model";
import prisma from "../../../../prisma";

export class TallerQueryRepository {
  public async obtenerTalleres(): Promise<TallerModel[]> {
    const results = await prisma.taller.findMany();
    return results.map((r: any) => this.mapPrismaTaller(r));
  }

  public async obtenerTaller(id: number): Promise<TallerModel | null> {
    const found = await prisma.taller.findFirst({ where: { Id: Number(id) } });
    return found ? this.mapPrismaTaller(found) : null;
  }

  private mapPrismaTaller(record: any): TallerModel {
    return {
      Id: record.Id,
      Nombre: record.Nombre,
      IdComuna: record.IdComuna,
      Direccion: record.Direccion,
    };
  }
}
