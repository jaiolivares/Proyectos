import { MantencionCommandRepository } from '../../../../repositories/commands/vehiculos/mantencion/mantencion.command.repository';
import { MantencionCreateRequestDto } from '../../../../dtos/vehiculos/mantencion/mantencionCreateRequest.dto';
import { MantencionUpdateRequestDto } from '../../../../dtos/vehiculos/mantencion/mantencionUpdateRequest.dto';
import { MantencionQueryService } from '../../../queries/vehiculos/mantencion/mantencion.query.service';

export class MantencionCommandService {
  private mantencionCommandRepository: MantencionCommandRepository;
  private mantencionQueryService: MantencionQueryService;

  constructor(mantencionCommandRepository?: MantencionCommandRepository, mantencionQueryService?: MantencionQueryService) {
    this.mantencionCommandRepository = mantencionCommandRepository ?? new MantencionCommandRepository();
    this.mantencionQueryService = mantencionQueryService ?? new MantencionQueryService();
  }

  public async crearMantencion(req: MantencionCreateRequestDto): Promise<any> {
    return this.mantencionCommandRepository.crearMantencion(req);
  }

  public async actualizarMantencion(id: number, req: MantencionUpdateRequestDto): Promise<any> {
    return this.mantencionCommandRepository.actualizarMantencion(id, req);
  }

  public async eliminarMantencion(id: number): Promise<string> {
    const existent = await this.mantencionQueryService.obtenerMantencion(id);
    if (!existent)
      throw new Error("Mantención no encontrada");

    return await this.mantencionCommandRepository.eliminarMantencion(id);
  }
}
