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
    const created = await this.marcaCommandRepository.crearMarca(req);
    return {
      Id: created.Id,
      Marca: created.Marca,
      Descripcion: created.Descripcion,
    } as MarcaCreateResponseDto;
  }

  public async actualizarMarca(id: number, req: MarcaUpdateRequestDto): Promise<MarcaUpdateResponseDto> {
    const existent = await this.marcaQueryService.obtenerMarca(id);
    if (!existent) {
      throw new Error("Marca no encontrada");
    }

    const updated = await this.marcaCommandRepository.actualizarMarca(id, req);
    return {
      Id: updated.Id,
      Marca: updated.Marca,
      Descripcion: updated.Descripcion,
    } as MarcaUpdateResponseDto;
  }

  public async eliminarMarca(id: number): Promise<string> {
    const existent = await this.marcaQueryService.obtenerMarca(id);
    if (!existent) {
      throw new Error("Marca no encontrada");
    }
    return await this.marcaCommandRepository.eliminarMarca(id);
  }
}
