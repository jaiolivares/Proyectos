import { MarcaModeloVehiculoModel } from "../../../../models/vehiculos/marcaModeloVehiculo.model";
import prisma from "../../../../prisma";

export class MarcaModeloVehiculoQueryRepository {
  public async obtenerMarcaModeloVehiculos(): Promise<MarcaModeloVehiculoModel[]> {
    const results = await prisma.marcaModeloVehiculo.findMany();
    return results.map((r: any) => this.mapPrismaMarcaModeloVehiculo(r));
  }

  public async obtenerMarcaModeloVehiculo(id: number): Promise<MarcaModeloVehiculoModel | null> {
    const found = await prisma.marcaModeloVehiculo.findFirst({ where: { Id: Number(id) } });
    return found ? this.mapPrismaMarcaModeloVehiculo(found) : null;
  }

  private mapPrismaMarcaModeloVehiculo(record: any): MarcaModeloVehiculoModel {
    return {
      Id: record.Id,
      IdMarca: record.IdMarca,
      IdModelo: record.IdModelo,
    };
  }
}
