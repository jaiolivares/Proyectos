import prisma from '../../../../prisma';
import { Mantencion } from '../../../../models/vehiculos/mantencion.model';

export class MantencionQueryRepository {
  public async obtenerMantenciones(): Promise<Mantencion[]> {
    const results = await prisma.mantencion.findMany();
    return results.map((r: any) => this.mapPrismaMantencion(r));
  }

  public async obtenerMantencion(id: number): Promise<Mantencion | null> {
    const found = await prisma.mantencion.findFirst({ where: { Id: Number(id) } });
    return found ? this.mapPrismaMantencion(found) : null;
  }

  private mapPrismaMantencion(record: any): Mantencion {
    return {
      Id: record.Id,
      IdVehiculo: record.IdVehiculo,
      Fecha: record.Fecha,
      IdTaller: record.IdTaller,
      Servicio: record.Servicio,
      MontoTotal: record.MontoTotal,
      Boleta: record.Boleta,
      IdUsuario: record.IdUsuario,
    };
  }
}
