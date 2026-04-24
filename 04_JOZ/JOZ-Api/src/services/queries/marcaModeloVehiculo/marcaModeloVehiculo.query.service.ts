import { MarcaModeloVehiculoDto } from "../../../dtos/marcaModeloVehiculo/marcaModeloVehiculo.dto";
import { MarcaModeloVehiculoQueryRepository } from "../../../repositories/queries/marcaModeloVehiculo/marcaModeloVehiculo.query.repository";

export class MarcaModeloVehiculoQueryService {
  private marcaModeloVehiculoQueryRepository: MarcaModeloVehiculoQueryRepository;

  constructor(marcaModeloVehiculoQueryRepository?: MarcaModeloVehiculoQueryRepository) {
    this.marcaModeloVehiculoQueryRepository = marcaModeloVehiculoQueryRepository ?? new MarcaModeloVehiculoQueryRepository();
  }

  public async obtenerMarcaModeloVehiculos(): Promise<MarcaModeloVehiculoDto[]> {
    const marcaModeloVehiculos = await this.marcaModeloVehiculoQueryRepository.obtenerMarcaModeloVehiculos();
    return marcaModeloVehiculos.map((v) => new MarcaModeloVehiculoDto(v.Id, v.IdMarca, v.IModeloVehiculo));
  }

  public async obtenerMarcaModeloVehiculo(id: number): Promise<MarcaModeloVehiculoDto | null> {
    const marcaModeloVehiculo = await this.marcaModeloVehiculoQueryRepository.obtenerMarcaModeloVehiculo(id);

    if (!marcaModeloVehiculo)
      return null;

    return new MarcaModeloVehiculoDto(
      marcaModeloVehiculo.Id,
      marcaModeloVehiculo.IdMarca,
      marcaModeloVehiculo.IModeloVehiculo,
    );
  }
}
