import prisma from "../../../prisma";
import { Vehiculo } from "../../../models/vehiculo.model";

export class VehiculoQueryRepository {
  
  public async obtenerVehiculos(): Promise<Vehiculo[]> {
    const results = await prisma.vehiculo.findMany();
    return results.map((r) => this.mapPrismaVehiculo(r));
  }

  public async obtenerVehiculo(id: number): Promise<Vehiculo | null> {

    const found = await prisma.vehiculo.findFirst({
      where: { Id: Number(id) },
    });

    return found ? this.mapPrismaVehiculo(found) : null;
  }

  private mapPrismaVehiculo(record: any): Vehiculo {
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
