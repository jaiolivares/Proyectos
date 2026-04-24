import { ModeloCreateRequestDto } from "../../../../dtos/vehiculos/modelo/modeloCreateRequest.dto";
import { ModeloCreateResponseDto } from "../../../../dtos/vehiculos/modelo/modeloCreateResponse.dto";
import { ModeloUpdateRequestDto } from "../../../../dtos/vehiculos/modelo/modeloUpdateRequest.dto";
import { ModeloUpdateResponseDto } from "../../../../dtos/vehiculos/modelo/modeloUpdateResponse.dto";
import { ModeloCommandRepository } from "../../../../repositories/commands/vehiculos/modelo/modelo.command.repository";
import { ModeloQueryService } from "../../../queries/vehiculos/modelo/modelo.query.service";

export class ModeloCommandService {
  private modeloCommandRepository: ModeloCommandRepository;
  private modeloQueryService: ModeloQueryService;

  constructor(modeloCommandRepository?: ModeloCommandRepository, modeloQueryService?: ModeloQueryService) {
    this.modeloCommandRepository = modeloCommandRepository ?? new ModeloCommandRepository();
    this.modeloQueryService = modeloQueryService ?? new ModeloQueryService();
  }

  public async crearModelo(req: ModeloCreateRequestDto): Promise<ModeloCreateResponseDto> {
    return await this.modeloCommandRepository.crearModelo(req) as Promise<ModeloCreateResponseDto>;
  }

  public async actualizarModelo(id: number, req: ModeloUpdateRequestDto): Promise<ModeloUpdateResponseDto | null> {
    const existent = await this.modeloQueryService.obtenerModelo(id);
    if (!existent) return null;
    return await this.modeloCommandRepository.actualizarModelo(id, req) as Promise<ModeloUpdateResponseDto>;
  }

  public async eliminarModelo(id: number): Promise<boolean> {
    const existent = await this.modeloQueryService.obtenerModelo(id);
    if (!existent) return false;
    return await this.modeloCommandRepository.eliminarModelo(id);
  }
}
