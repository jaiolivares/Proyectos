import { MantencionDetalleDto } from '../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalle.dto';
import { MantencionDetalleQueryRepository } from '../../../../repositories/queries/vehiculos/mantencionDetalle/mantencionDetalle.query.repository';

export class MantencionDetalleQueryService {
  private mantencionDetalleQueryRepository: MantencionDetalleQueryRepository;

  constructor(mantencionDetalleQueryRepository?: MantencionDetalleQueryRepository) {
    this.mantencionDetalleQueryRepository = mantencionDetalleQueryRepository ?? new MantencionDetalleQueryRepository();
  }

  public async obtenerMantencionDetalles(): Promise<MantencionDetalleDto[]> {
    const rows = await this.mantencionDetalleQueryRepository.obtenerMantencionDetalles();
    return rows.map((v) => new MantencionDetalleDto(v.Id, v.IdMantencion, v.Producto, v.DetalleProducto, v.Monto));
  }

  public async obtenerMantencionDetalle(id: number): Promise<MantencionDetalleDto | null> {
    const row = await this.mantencionDetalleQueryRepository.obtenerMantencionDetalle(id);
    if (!row) return null;
    return new MantencionDetalleDto(row.Id, row.IdMantencion, row.Producto, row.DetalleProducto, row.Monto);
  }
}
