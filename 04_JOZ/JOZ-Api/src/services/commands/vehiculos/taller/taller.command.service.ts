import { TallerCreateRequestDto } from "../../../../dtos/vehiculos/taller/tallerCreateRequest.dto";
import { TallerCreateResponseDto } from "../../../../dtos/vehiculos/taller/tallerCreateResponse.dto";
import { TallerUpdateRequestDto } from "../../../../dtos/vehiculos/taller/tallerUpdateRequest.dto";
import { TallerUpdateResponseDto } from "../../../../dtos/vehiculos/taller/tallerUpdateResponse.dto";
import { TallerCommandRepository } from "../../../../repositories/commands/vehiculos/taller/taller.command.repository";
import { TallerQueryService } from "../../../queries/vehiculos/taller/taller.query.service";

export class TallerCommandService {
  private tallerCommandRepository: TallerCommandRepository;
  private tallerQueryService: TallerQueryService;

  constructor(tallerCommandRepository?: TallerCommandRepository, tallerQueryService?: TallerQueryService) {
    this.tallerCommandRepository = tallerCommandRepository ?? new TallerCommandRepository();
    this.tallerQueryService = tallerQueryService ?? new TallerQueryService();
  }

  public async crearTaller(req: TallerCreateRequestDto): Promise<TallerCreateResponseDto> {

      const idComuna = req.IdComuna;
      const comuna = await this.comunaQueryService.obtenerComuna(idComuna);
      if (!comuna) {
        throw new Error("IdComuna no es válido");
      }

    const tallerModel = await this.tallerCommandRepository.crearTaller(req);

    const tallerCreateResponseDto = {
      Id: tallerModel.Id,
      Nombre: tallerModel.Nombre,
      Direccion: tallerModel.Direccion,
      IdComuna: tallerModel.IdComuna,
    };

    return tallerCreateResponseDto;

  }

  public async actualizarTaller(id: number, req: TallerUpdateRequestDto): Promise<TallerUpdateResponseDto | null> {
    const existent = await this.tallerQueryService.obtenerTaller(id);
    if (!existent)
      throw new Error("Taller no encontrado");

          const idComuna = req.IdComuna;
          const comuna = await this.comunaQueryService.obtenerComuna(idComuna);
          if (!comuna) {
            throw new Error("IdComuna no es válido");
          }

    const tallerModel = await this.tallerCommandRepository.actualizarTaller(id, req);

    const tallerUpdateResponseDto = {
      Id: tallerModel.Id,
      Nombre: tallerModel.Nombre,
      Direccion: tallerModel.Direccion,
      IdComuna: tallerModel.IdComuna,
    };
    return tallerUpdateResponseDto;
  }

  public async eliminarTaller(id: number): Promise<boolean> {
    const existent = await this.tallerQueryService.obtenerTaller(id);
    if (!existent) 
      throw new Error("Taller no encontrado");

    return await this.tallerCommandRepository.eliminarTaller(id);
  }
}
