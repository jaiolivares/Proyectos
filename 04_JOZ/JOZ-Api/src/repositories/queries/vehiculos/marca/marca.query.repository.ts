import prisma from "../../../../prisma";
import { Marca } from "../../../../models/vehiculos/marca.model";

export class MarcaQueryRepository {
  public async obtenerMarcas(): Promise<Marca[]> {
    const results = await prisma.marcaVehiculo.findMany();
    return results.map((r) => this.mapPrismaMarca(r));
  }

  public async obtenerMarca(id: number): Promise<Marca | null> {
    const found = await prisma.marcaVehiculo.findFirst({ where: { Id: Number(id) } });
    return found ? this.mapPrismaMarca(found) : null;
  }

  private mapPrismaMarca(record: any): Marca {
    return {
      Id: record.Id,
      Marca: record.Marca,
      Descripcion: record.Descripcion,
    };
  }
}
