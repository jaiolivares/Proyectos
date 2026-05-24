import { MarcaModeloVehiculoDto } from "../../../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.dto";
import { MarcaModeloVehiculoQueryRepository } from "../../../../repositories/queries/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.query.repository";

export class MarcaModeloVehiculoQueryService {
  private marcaModeloVehiculoQueryRepository: MarcaModeloVehiculoQueryRepository;

  constructor(marcaModeloVehiculoQueryRepository?: MarcaModeloVehiculoQueryRepository) {
    this.marcaModeloVehiculoQueryRepository = marcaModeloVehiculoQueryRepository ?? new MarcaModeloVehiculoQueryRepository();
  }

  public async obtenerMarcaModeloVehiculos(): Promise<MarcaModeloVehiculoDto[]> {
    const marcaModeloVehiculos = await this.marcaModeloVehiculoQueryRepository.obtenerMarcaModeloVehiculos();
    return marcaModeloVehiculos.map((v) => this.mapMarcaModeloVehiculo(v));
  }

  public async obtenerMarcaModeloVehiculo(id: number): Promise<MarcaModeloVehiculoDto | null> {
    const marcaModeloVehiculo = await this.marcaModeloVehiculoQueryRepository.obtenerMarcaModeloVehiculo(id);

    if (!marcaModeloVehiculo) {
      return null;
    }

    return this.mapMarcaModeloVehiculo(marcaModeloVehiculo);
  }

  private mapMarcaModeloVehiculo(record: any): MarcaModeloVehiculoDto {
    return {
      Id: record.Id,
      IdMarca: record.IdMarca,
      IdModelo: record.IdModelo,
    };
  }
}
