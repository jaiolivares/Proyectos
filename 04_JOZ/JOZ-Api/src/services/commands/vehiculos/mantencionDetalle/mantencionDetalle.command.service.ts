import { MantencionDetalleCreateRequestDto } from "../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalleCreateRequest.dto";
import { MantencionDetalleUpdateRequestDto } from "../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalleUpdateRequest.dto";
import { MantencionDetalleCommandRepository } from "../../../../repositories/commands/vehiculos/mantencionDetalle/mantencionDetalle.command.repository";
import { MantencionQueryService } from "../../../queries/vehiculos/mantencion/mantencion.query.service";
import { MantencionDetalleQueryService } from "../../../queries/vehiculos/mantencionDetalle/mantencionDetalle.query.service";

export class MantencionDetalleCommandService {
  private mantencionDetalleCommandRepository: MantencionDetalleCommandRepository;
  private mantencionDetalleQueryService: MantencionDetalleQueryService;
  private mantencionQueryService: MantencionQueryService;

  constructor(mantencionDetalleCommandRepository?: MantencionDetalleCommandRepository, mantencionDetalleQueryService?: MantencionDetalleQueryService, mantencionQueryService?: MantencionQueryService) {
    this.mantencionDetalleCommandRepository = mantencionDetalleCommandRepository ?? new MantencionDetalleCommandRepository();
    this.mantencionDetalleQueryService = mantencionDetalleQueryService ?? new MantencionDetalleQueryService();
    this.mantencionQueryService = mantencionQueryService ?? new MantencionQueryService();
  }

  public async crearMantencionDetalle(req: MantencionDetalleCreateRequestDto): Promise<any> {
    const idMantencion = req.IdMantencion;
    const mantencion = await this.mantencionQueryService.obtenerMantencion(idMantencion);
    if (!mantencion) {
      throw new Error("IdMantencion no es válido");
    }

    return this.mantencionDetalleCommandRepository.crearMantencionDetalle(req);
  }

  public async actualizarMantencionDetalle(id: number, req: MantencionDetalleUpdateRequestDto): Promise<any> {
    const existent = await this.mantencionDetalleQueryService.obtenerMantencionDetalle(id);
    if (!existent) {
      throw new Error("MantencionDetalle no encontrado");
    }

    return this.mantencionDetalleCommandRepository.actualizarMantencionDetalle(id, req);
  }

  public async eliminarMantencionDetalle(id: number): Promise<string> {
    const existent = await this.mantencionDetalleQueryService.obtenerMantencionDetalle(id);
    if (!existent) {
      throw new Error("MantencionDetalle no encontrado");
    }

    return this.mantencionDetalleCommandRepository.eliminarMantencionDetalle(id);
  }
}
