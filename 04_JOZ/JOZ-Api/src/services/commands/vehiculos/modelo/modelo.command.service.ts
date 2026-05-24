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
    const created = await this.modeloCommandRepository.crearModelo(req);
    return {
      Id: created.Id,
      IdTipoVehiculo: created.IdTipoVehiculo,
      Modelo: created.Modelo,
      Descripcion: created.Descripcion,
    } as ModeloCreateResponseDto;
  }

  public async actualizarModelo(id: number, req: ModeloUpdateRequestDto): Promise<ModeloUpdateResponseDto | null> {
    const existent = await this.modeloQueryService.obtenerModelo(id);
    if (!existent) {
      throw new Error("Modelo no encontrado");
    }

    const updated = await this.modeloCommandRepository.actualizarModelo(id, req);
    return {
      Id: updated.Id,
      IdTipoVehiculo: updated.IdTipoVehiculo,
      Modelo: updated.Modelo,
      Descripcion: updated.Descripcion,
    } as ModeloUpdateResponseDto;
  }

  public async eliminarModelo(id: number): Promise<string> {
    const existent = await this.modeloQueryService.obtenerModelo(id);
    if (!existent) {
      throw new Error("Modelo no encontrado");
    }
    return await this.modeloCommandRepository.eliminarModelo(id);
  }
}
