import prisma from "../../../prisma";
import { Vehiculo } from "../../../models/vehiculo.model";

export class VehiculoQueryRepository {
  public async obtenerVehiculo(id: number): Promise<Vehiculo | null> {
    if (id == null || Number.isNaN(Number(id))) {
      throw new Error("El id es obligatorio y debe ser un número");
    }

    const found = await prisma.vehiculo.findFirst({
      where: { Id: Number(id) },
    });

    return found ? this.mapPrismaVehiculo(found) : null;
  }

  public async obtenerVehiculos(): Promise<Vehiculo[]> {
    const results = await prisma.vehiculo.findMany();
    return results.map((r) => this.mapPrismaVehiculo(r));
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
