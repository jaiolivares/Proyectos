import { MantencionCommandRepository } from '../../../../repositories/commands/vehiculos/mantencion/mantencion.command.repository';
import { MantencionCreateRequestDto } from '../../../../dtos/vehiculos/mantencion/mantencionCreateRequest.dto';
import { MantencionUpdateRequestDto } from '../../../../dtos/vehiculos/mantencion/mantencionUpdateRequest.dto';
import { MantencionQueryService } from '../../../queries/vehiculos/mantencion/mantencion.query.service';
import { VehiculoQueryService } from '../../../queries/vehiculos/vehiculo/vehiculo.query.service';
import { TallerQueryService } from '../../../queries/vehiculos/taller/taller.query.service';

export class MantencionCommandService {
  private mantencionCommandRepository: MantencionCommandRepository;
  private mantencionQueryService: MantencionQueryService;
  private vehiculoQueryService: VehiculoQueryService;
  private tallerQueryService: TallerQueryService;

  constructor(mantencionCommandRepository?: MantencionCommandRepository, mantencionQueryService?: MantencionQueryService, vehiculoQueryService?: VehiculoQueryService, tallerQueryService?: TallerQueryService) {
    this.mantencionCommandRepository = mantencionCommandRepository ?? new MantencionCommandRepository();
    this.mantencionQueryService = mantencionQueryService ?? new MantencionQueryService();
    this.vehiculoQueryService = vehiculoQueryService ?? new VehiculoQueryService();
    this.tallerQueryService = tallerQueryService ?? new TallerQueryService();
  }

  public async crearMantencion(req: MantencionCreateRequestDto, idUsuario: number): Promise<any> {

    const idVehiculo = req.IdVehiculo;
    const vehiculo = await this.vehiculoQueryService.obtenerVehiculo(idVehiculo);
    if (!vehiculo) {
      throw new Error("IdVehiculo no es válido");
    }

    const idTaller = req.IdTaller;
    const taller = await this.tallerQueryService.obtenerTaller(idTaller);
    if (!taller) {
      throw new Error("IdTaller no es válido");
    }

    return this.mantencionCommandRepository.crearMantencion(req, idUsuario);
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
