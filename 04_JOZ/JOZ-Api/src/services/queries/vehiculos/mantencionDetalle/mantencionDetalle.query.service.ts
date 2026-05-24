import { MantencionDetalleDto } from "../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalle.dto";
import { MantencionDetalleQueryRepository } from "../../../../repositories/queries/vehiculos/mantencionDetalle/mantencionDetalle.query.repository";

export class MantencionDetalleQueryService {
  private mantencionDetalleQueryRepository: MantencionDetalleQueryRepository;

  constructor(mantencionDetalleQueryRepository?: MantencionDetalleQueryRepository) {
    this.mantencionDetalleQueryRepository = mantencionDetalleQueryRepository ?? new MantencionDetalleQueryRepository();
  }

  public async obtenerMantencionDetalles(): Promise<MantencionDetalleDto[]> {
    const mantencionDetalles = await this.mantencionDetalleQueryRepository.obtenerMantencionDetalles();
    return mantencionDetalles.map((v) => this.mapMantencionDetalle(v));
  }

  public async obtenerMantencionDetalle(id: number): Promise<MantencionDetalleDto | null> {
    const mantencionDetalle = await this.mantencionDetalleQueryRepository.obtenerMantencionDetalle(id);

    if (!mantencionDetalle) {
      return null;
    }

    return this.mapMantencionDetalle(mantencionDetalle);
  }

  private mapMantencionDetalle(record: any): MantencionDetalleDto {
    return {
      Id: record.Id,
      IdMantencion: record.IdMantencion,
      Producto: record.Producto,
      DetalleProducto: record.DetalleProducto,
      Monto: record.Monto,
    };
  }
}
