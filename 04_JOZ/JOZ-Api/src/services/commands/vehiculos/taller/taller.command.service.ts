import { TallerCreateRequestDto } from "../../../../dtos/vehiculos/taller/tallerCreateRequest.dto";
import { TallerCreateResponseDto } from "../../../../dtos/vehiculos/taller/tallerCreateResponse.dto";
import { TallerUpdateRequestDto } from "../../../../dtos/vehiculos/taller/tallerUpdateRequest.dto";
import { TallerUpdateResponseDto } from "../../../../dtos/vehiculos/taller/tallerUpdateResponse.dto";
import { TallerCommandRepository } from "../../../../repositories/commands/vehiculos/taller/taller.command.repository";
import { ComunaQueryService } from "../../../../services/queries/ubicaciones/comuna/comuna.query.service";
import { TallerQueryService } from "../../../queries/vehiculos/taller/taller.query.service";

export class TallerCommandService {
  private tallerCommandRepository: TallerCommandRepository;
  private tallerQueryService: TallerQueryService;
  private comunaQueryService: ComunaQueryService;

  constructor(tallerCommandRepository?: TallerCommandRepository, tallerQueryService?: TallerQueryService, comunaQueryService?: ComunaQueryService) {
    this.tallerCommandRepository = tallerCommandRepository ?? new TallerCommandRepository();
    this.tallerQueryService = tallerQueryService ?? new TallerQueryService();
    this.comunaQueryService = comunaQueryService ?? new ComunaQueryService();
  }

  public async crearTaller(req: TallerCreateRequestDto): Promise<TallerCreateResponseDto> {
    const idComuna = req.IdComuna;
    const comuna = await this.comunaQueryService.obtenerComuna(idComuna);
    if (!comuna) {
      throw new Error("IdComuna no es válido");
    }

    const created = await this.tallerCommandRepository.crearTaller(req);

    return {
      Id: created.Id,
      Nombre: created.Nombre,
      Direccion: created.Direccion,
      IdComuna: created.IdComuna,
    } as TallerCreateResponseDto;
  }

  public async actualizarTaller(id: number, req: TallerUpdateRequestDto): Promise<TallerUpdateResponseDto | null> {
    const existent = await this.tallerQueryService.obtenerTaller(id);
    if (!existent) {
      throw new Error("Taller no encontrado");
    }

    const idComuna = req.IdComuna;
    const comuna = await this.comunaQueryService.obtenerComuna(idComuna);
    if (!comuna) {
      throw new Error("IdComuna no es válido");
    }

    const updated = await this.tallerCommandRepository.actualizarTaller(id, req);

    return {
      Id: updated.Id,
      Nombre: updated.Nombre,
      Direccion: updated.Direccion,
      IdComuna: updated.IdComuna,
    } as TallerUpdateResponseDto;
  }

  public async eliminarTaller(id: number): Promise<string> {
    const existent = await this.tallerQueryService.obtenerTaller(id);
    if (!existent) {
      throw new Error("Taller no encontrado");
    }

    return await this.tallerCommandRepository.eliminarTaller(id);
  }
}
