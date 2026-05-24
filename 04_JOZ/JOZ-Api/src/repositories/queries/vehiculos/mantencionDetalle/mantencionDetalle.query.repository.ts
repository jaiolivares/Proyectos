import { MantencionDetalleModel } from "../../../../models/vehiculos/mantencionDetalle.model";
import prisma from "../../../../prisma";

export class MantencionDetalleQueryRepository {
  public async obtenerMantencionDetalles(): Promise<MantencionDetalleModel[]> {
    const results = await prisma.mantenciondetalle.findMany();
    return results.map((r: any) => this.mapPrismaMantencionDetalle(r));
  }

  public async obtenerMantencionDetalle(id: number): Promise<MantencionDetalleModel | null> {
    const found = await prisma.mantenciondetalle.findFirst({ where: { Id: Number(id) } });
    return found ? this.mapPrismaMantencionDetalle(found) : null;
  }

  private mapPrismaMantencionDetalle(record: any): MantencionDetalleModel {
    return {
      Id: record.Id,
      IdMantencion: record.IdMantencion,
      Producto: record.Producto,
      DetalleProducto: record.DetalleProducto,
      Monto: record.Monto,
    };
  }
}
