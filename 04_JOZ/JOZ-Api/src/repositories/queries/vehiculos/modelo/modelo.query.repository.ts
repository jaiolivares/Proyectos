import prisma from "../../../../prisma";
import { Modelo } from "../../../../models/vehiculos/modelo.model";

export class ModeloQueryRepository {
  public async obtenerModelos(): Promise<Modelo[]> {
    const results = await prisma.modeloVehiculo.findMany();
    return results.map((r) => this.mapPrismaModelo(r));
  }

  public async obtenerModelo(id: number): Promise<Modelo | null> {
    const found = await prisma.modeloVehiculo.findFirst({ where: { Id: Number(id) } });
    return found ? this.mapPrismaModelo(found) : null;
  }

  private mapPrismaModelo(record: any): Modelo {
    return {
      Id: record.Id,
      IdTipoVehiculo: record.IdTipoVehiculo,
      Modelo: record.Modelo,
      Descripcion: record.Descripcion,
    };
  }
}
