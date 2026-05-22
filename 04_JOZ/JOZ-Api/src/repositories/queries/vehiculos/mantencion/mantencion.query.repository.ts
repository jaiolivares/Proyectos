import { MantencionModel } from "../../../../models/vehiculos/mantencion.model";
import prisma from "../../../../prisma";

export class MantencionQueryRepository {
  public async obtenerMantenciones(): Promise<MantencionModel[]> {
    const results = await prisma.mantencion.findMany();
    return results.map((r: any) => this.mapPrismaMantencion(r));
  }

  public async obtenerMantencion(id: number): Promise<MantencionModel | null> {
    const found = await prisma.mantencion.findFirst({ where: { Id: Number(id) } });
    return found ? this.mapPrismaMantencion(found) : null;
  }

  private mapPrismaMantencion(record: any): MantencionModel {
    return {
      Id: record.Id,
      IdVehiculo: record.IdVehiculo,
      Fecha: record.Fecha,
      IdTaller: record.IdTaller,
      Servicio: record.Servicio,
      MontoTotal: record.MontoTotal,
      Boleta: record.Boleta,
      IdUsuarioCreacion: record.IdUsuarioCreacion,
    };
  }
}
