import prisma from "../../../prisma";
import { MarcaModeloVehiculo } from "../../../models/marcaModeloVehiculo.model";

export class MarcaModeloVehiculoQueryRepository {
  
  public async obtenerMarcaModeloVehiculos(): Promise<MarcaModeloVehiculo[]> {
    const results = await prisma.marcaModeloVehiculo.findMany();
    return results.map((r) => this.mapPrismaMarcaModeloVehiculo(r));
  }

  public async obtenerMarcaModeloVehiculo(id: number): Promise<MarcaModeloVehiculo | null> {

    const found = await prisma.marcaModeloVehiculo.findFirst({
      where: { Id: Number(id) },
    });

    return found ? this.mapPrismaMarcaModeloVehiculo(found) : null;
  }

  private mapPrismaMarcaModeloVehiculo(record: any): MarcaModeloVehiculo {
    return {
      Id: record.Id,
      IdMarca: record.IdMarca,
      IModeloVehiculo: record.IModeloVehiculo,
    };
  }
}
