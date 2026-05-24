import { MantencionDetalleCreateRequestDto } from "../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalleCreateRequest.dto";
import { MantencionDetalleCreateResponseDto } from "../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalleCreateResponse.dto";
import { MantencionDetalleUpdateRequestDto } from "../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalleUpdateRequest.dto";
import { MantencionDetalleUpdateResponseDto } from "../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalleUpdateResponse.dto";
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

  public async crearMantencionDetalle(req: MantencionDetalleCreateRequestDto): Promise<MantencionDetalleCreateResponseDto> {
    const idMantencion = req.IdMantencion;
    const mantencion = await this.mantencionQueryService.obtenerMantencion(idMantencion);
    if (!mantencion) {
      throw new Error("IdMantencion no es válido");
    }

    const created = await this.mantencionDetalleCommandRepository.crearMantencionDetalle(req);
    return {
      Id: created.Id,
      IdMantencion: created.IdMantencion,
      Producto: created.Producto,
      DetalleProducto: created.DetalleProducto,
      Monto: created.Monto,
    } as MantencionDetalleCreateResponseDto;
  }

  public async actualizarMantencionDetalle(id: number, req: MantencionDetalleUpdateRequestDto): Promise<MantencionDetalleUpdateResponseDto> {
    const existent = await this.mantencionDetalleQueryService.obtenerMantencionDetalle(id);
    if (!existent) {
      throw new Error("MantencionDetalle no encontrado");
    }

    const idMantencion = req.IdMantencion;
    const mantencion = await this.mantencionQueryService.obtenerMantencion(idMantencion);
    if (!mantencion) {
      throw new Error("IdMantencion no es válido");
    }

    const updated = await this.mantencionDetalleCommandRepository.actualizarMantencionDetalle(id, req);
    return {
      Id: updated.Id,
      IdMantencion: updated.IdMantencion,
      Producto: updated.Producto,
      DetalleProducto: updated.DetalleProducto,
      Monto: updated.Monto,
    } as MantencionDetalleUpdateResponseDto;
  }

  public async eliminarMantencionDetalle(id: number): Promise<string> {
    const existent = await this.mantencionDetalleQueryService.obtenerMantencionDetalle(id);
    if (!existent) {
      throw new Error("MantencionDetalle no encontrado");
    }

    return await this.mantencionDetalleCommandRepository.eliminarMantencionDetalle(id);
  }
}
