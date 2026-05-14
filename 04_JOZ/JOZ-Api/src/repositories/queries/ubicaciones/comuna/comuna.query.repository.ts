import { Comuna } from "../../../../models/ubicaciones/comuna.model";
import prisma from "../../../../prisma";

export class ComunaQueryRepository {
  public async obtenerComunas(): Promise<Comuna[]> {
    const results = await prisma.comuna.findMany();
    return results.map((r: any) => this.mapPrismaComuna(r));
  }

  public async obtenerComuna(id: number): Promise<Comuna | null> {
    const found = await prisma.comuna.findFirst({
      where: { Id: Number(id) },
    });

    return found ? this.mapPrismaComuna(found) : null;
  }

  private mapPrismaComuna(record: any): Comuna {
    return {
      Id: record.Id,
      IdCiudad: record.IdCiudad,
      Codigo: record.Codigo,
      Descripcion: record.Descripcion,
    };
  }
}
