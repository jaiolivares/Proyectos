import prisma from '../../../../prisma';
import { MantencionDetalle } from '../../../../models/vehiculos/mantencionDetalle.model';

export class MantencionDetalleQueryRepository {
  public async obtenerMantencionDetalles(): Promise<MantencionDetalle[]> {
    const results = await prisma.mantenciondetalle.findMany();
    return results.map((r: any) => this.mapPrismaMantencionDetalle(r));
  }

  public async obtenerMantencionDetalle(id: number): Promise<MantencionDetalle | null> {
    const found = await prisma.mantenciondetalle.findFirst({ where: { Id: Number(id) } });
    return found ? this.mapPrismaMantencionDetalle(found) : null;
  }

  private mapPrismaMantencionDetalle(record: any): MantencionDetalle {
    return {
      Id: record.Id,
      IdMantencion: record.IdMantencion,
      Producto: record.Producto,
      DetalleProducto: record.DetalleProducto,
      Monto: record.Monto,
    };
  }
}
