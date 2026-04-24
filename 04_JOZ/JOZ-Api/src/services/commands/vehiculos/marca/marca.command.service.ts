import { MarcaCreateRequestDto } from "../../../../dtos/vehiculos/marca/marcaCreateRequest.dto";
import { MarcaCreateResponseDto } from "../../../../dtos/vehiculos/marca/marcaCreateResponse.dto";
import { MarcaUpdateRequestDto } from "../../../../dtos/vehiculos/marca/marcaUpdateRequest.dto";
import { MarcaUpdateResponseDto } from "../../../../dtos/vehiculos/marca/marcaUpdateResponse.dto";
import { MarcaCommandRepository } from "../../../../repositories/commands/vehiculos/marca/marca.command.repository";
import { MarcaQueryService } from "../../../queries/vehiculos/marca/marca.query.service";

export class MarcaCommandService {
  private marcaCommandRepository: MarcaCommandRepository;
  private marcaQueryService: MarcaQueryService;

  constructor(marcaCommandRepository?: MarcaCommandRepository, marcaQueryService?: MarcaQueryService) {
    this.marcaCommandRepository = marcaCommandRepository ?? new MarcaCommandRepository();
    this.marcaQueryService = marcaQueryService ?? new MarcaQueryService();
  }

  public async crearMarca(req: MarcaCreateRequestDto): Promise<MarcaCreateResponseDto> {
    return await this.marcaCommandRepository.crearMarca(req) as Promise<MarcaCreateResponseDto>;
  }

  public async actualizarMarca(id: number, req: MarcaUpdateRequestDto): Promise<MarcaUpdateResponseDto | null> {
    const existent = await this.marcaQueryService.obtenerMarca(id);
    if (!existent) return null;
    return await this.marcaCommandRepository.actualizarMarca(id, req) as Promise<MarcaUpdateResponseDto>;
  }

  public async eliminarMarca(id: number): Promise<boolean> {
    const existent = await this.marcaQueryService.obtenerMarca(id);
    if (!existent) return false;
    return await this.marcaCommandRepository.eliminarMarca(id);
  }
}
