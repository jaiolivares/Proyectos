import { VehiculoModel } from "../../../../models/vehiculos/vehiculo.model";
import prisma from "../../../../prisma";

export class VehiculoQueryRepository {
  public async obtenerVehiculos(): Promise<VehiculoModel[]> {
    const results = await prisma.vehiculo.findMany();
    return results.map((r: any) => this.mapPrismaVehiculo(r));
  }

  public async obtenerVehiculo(id: number): Promise<VehiculoModel | null> {
    const found = await prisma.vehiculo.findFirst({ where: { Id: Number(id) } });
    return found ? this.mapPrismaVehiculo(found) : null;
  }

  private mapPrismaVehiculo(record: any): VehiculoModel {
    return {
      Id: record.Id,
      IdMarcaModeloVehiculo: record.IdMarcaModeloVehiculo,
      Ano: record.Ano,
      NumeroMotor: record.NumeroMotor,
      NumeroChasis: record.NumeroChasis,
      Color: record.Color,
      FechaCompra: record.FechaCompra,
      MontoCompra: record.MontoCompra,
      Vendido: Boolean(record.Vendido),
      FechaVenta: record.FechaVenta ?? null,
      MontoVenta: record.MontoVenta ?? null,
    };
  }
}
