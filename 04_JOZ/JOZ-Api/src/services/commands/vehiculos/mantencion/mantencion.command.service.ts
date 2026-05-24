import { MantencionCreateRequestDto } from "../../../../dtos/vehiculos/mantencion/mantencionCreateRequest.dto";
import { MantencionCreateResponseDto } from "../../../../dtos/vehiculos/mantencion/mantencionCreateResponse.dto";
import { MantencionUpdateRequestDto } from "../../../../dtos/vehiculos/mantencion/mantencionUpdateRequest.dto";
import { MantencionUpdateResponseDto } from "../../../../dtos/vehiculos/mantencion/mantencionUpdateResponse.dto";
import { MantencionCommandRepository } from "../../../../repositories/commands/vehiculos/mantencion/mantencion.command.repository";
import { MantencionQueryService } from "../../../queries/vehiculos/mantencion/mantencion.query.service";
import { TallerQueryService } from "../../../queries/vehiculos/taller/taller.query.service";
import { VehiculoQueryService } from "../../../queries/vehiculos/vehiculo/vehiculo.query.service";

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

  public async crearMantencion(req: MantencionCreateRequestDto, idUsuario: number): Promise<MantencionCreateResponseDto> {
    if (!idUsuario) {
      throw new Error("IdUsuario no es válido");
    }

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

    const created = await this.mantencionCommandRepository.crearMantencion(req, idUsuario);
    return {
      Id: created.Id,
      IdVehiculo: created.IdVehiculo,
      Fecha: created.Fecha,
      IdTaller: created.IdTaller,
      Servicio: created.Servicio,
      MontoTotal: created.MontoTotal,
      Boleta: created.Boleta,
      IdUsuarioCreacion: created.IdUsuarioCreacion,
    } as MantencionCreateResponseDto;
  }

  public async actualizarMantencion(id: number, req: MantencionUpdateRequestDto): Promise<MantencionUpdateResponseDto> {
    const existent = await this.mantencionQueryService.obtenerMantencion(id);
    if (!existent) {
      throw new Error("Mantención no encontrada");
    }

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

    const updated = await this.mantencionCommandRepository.actualizarMantencion(id, req);
    return {
      Id: updated.Id,
      IdVehiculo: updated.IdVehiculo,
      Fecha: updated.Fecha,
      IdTaller: updated.IdTaller,
      Servicio: updated.Servicio,
      MontoTotal: updated.MontoTotal,
      Boleta: updated.Boleta,
      IdUsuarioCreacion: updated.IdUsuarioCreacion,
    } as MantencionUpdateResponseDto;
  }

  public async eliminarMantencion(id: number): Promise<string> {
    const existent = await this.mantencionQueryService.obtenerMantencion(id);
    if (!existent) {
      throw new Error("Mantención no encontrada");
    }

    return await this.mantencionCommandRepository.eliminarMantencion(id);
  }
}
