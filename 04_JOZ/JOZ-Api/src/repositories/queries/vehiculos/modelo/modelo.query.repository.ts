import { ModeloModel } from "../../../../models/vehiculos/modelo.model";
import prisma from "../../../../prisma";

export class ModeloQueryRepository {
  public async obtenerModelos(): Promise<ModeloModel[]> {
    const results = await prisma.modeloVehiculo.findMany();
    return results.map((r: any) => this.mapPrismaModelo(r));
  }

  public async obtenerModelo(id: number): Promise<ModeloModel | null> {
    const found = await prisma.modeloVehiculo.findFirst({ where: { Id: Number(id) } });
    return found ? this.mapPrismaModelo(found) : null;
  }

  private mapPrismaModelo(record: any): ModeloModel {
    return {
      Id: record.Id,
      IdTipoVehiculo: record.IdTipoVehiculo,
      Modelo: record.Modelo,
      Descripcion: record.Descripcion,
    };
  }
}
