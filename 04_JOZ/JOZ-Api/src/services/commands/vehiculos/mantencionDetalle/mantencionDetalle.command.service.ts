import { MantencionDetalleCreateRequestDto } from "../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalleCreateRequest.dto";
import { MantencionDetalleUpdateRequestDto } from "../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalleUpdateRequest.dto";
import { MantencionDetalleCommandRepository } from "../../../../repositories/commands/vehiculos/mantencionDetalle/mantencionDetalle.command.repository";

export class MantencionDetalleCommandService {
  private mantencionDetalleCommandRepository: MantencionDetalleCommandRepository;

  constructor(mantencionDetalleCommandRepository?: MantencionDetalleCommandRepository) {
    this.mantencionDetalleCommandRepository = mantencionDetalleCommandRepository ?? new MantencionDetalleCommandRepository();
  }

  public async crearMantencionDetalle(req: MantencionDetalleCreateRequestDto): Promise<any> {
    return this.mantencionDetalleCommandRepository.crearMantencionDetalle(req);
  }

  public async actualizarMantencionDetalle(id: number, req: MantencionDetalleUpdateRequestDto): Promise<any> {
    return this.mantencionDetalleCommandRepository.actualizarMantencionDetalle(id, req);
  }

  public async eliminarMantencionDetalle(id: number): Promise<boolean> {
    return this.mantencionDetalleCommandRepository.eliminarMantencionDetalle(id);
  }
}
