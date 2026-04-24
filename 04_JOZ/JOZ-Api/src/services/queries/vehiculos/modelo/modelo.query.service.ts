import { ModeloDto } from "../../../../dtos/vehiculos/modelo/modelo.dto";
import { ModeloQueryRepository } from "../../../../repositories/queries/vehiculos/modelo/modelo.query.repository";

export class ModeloQueryService {
  private modeloQueryRepository: ModeloQueryRepository;

  constructor(modeloQueryRepository?: ModeloQueryRepository) {
    this.modeloQueryRepository = modeloQueryRepository ?? new ModeloQueryRepository();
  }

  public async obtenerModelos(): Promise<ModeloDto[]> {
    const modelos = await this.modeloQueryRepository.obtenerModelos();
    return modelos.map((m) => new ModeloDto(m.Id, m.IdTipoVehiculo, m.Modelo, m.Descripcion));
  }

  public async obtenerModelo(id: number): Promise<ModeloDto | null> {
    const modelo = await this.modeloQueryRepository.obtenerModelo(id);
    if (!modelo) return null;
    return new ModeloDto(modelo.Id, modelo.IdTipoVehiculo, modelo.Modelo, modelo.Descripcion);
  }
}
