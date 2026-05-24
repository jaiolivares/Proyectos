import { ModeloDto } from "../../../../dtos/vehiculos/modelo/modelo.dto";
import { ModeloQueryRepository } from "../../../../repositories/queries/vehiculos/modelo/modelo.query.repository";

export class ModeloQueryService {
  private modeloQueryRepository: ModeloQueryRepository;

  constructor(modeloQueryRepository?: ModeloQueryRepository) {
    this.modeloQueryRepository = modeloQueryRepository ?? new ModeloQueryRepository();
  }

  public async obtenerModelos(): Promise<ModeloDto[]> {
    const modelos = await this.modeloQueryRepository.obtenerModelos();
    return modelos.map((m) => this.mapModelo(m));
  }

  public async obtenerModelo(id: number): Promise<ModeloDto | null> {
    const modelo = await this.modeloQueryRepository.obtenerModelo(id);

    if (!modelo) {
      return null;
    }

    return this.mapModelo(modelo);
  }

  private mapModelo(record: any): ModeloDto {
    return {
      Id: record.Id,
      IdTipoVehiculo: record.IdTipoVehiculo,
      Modelo: record.Modelo,
      Descripcion: record.Descripcion,
    };
  }
}
