import { MantencionDto } from "../../../../dtos/vehiculos/mantencion/mantencion.dto";
import { MantencionQueryRepository } from "../../../../repositories/queries/vehiculos/mantencion/mantencion.query.repository";

export class MantencionQueryService {
  private mantencionQueryRepository: MantencionQueryRepository;

  constructor(mantencionQueryRepository?: MantencionQueryRepository) {
    this.mantencionQueryRepository = mantencionQueryRepository ?? new MantencionQueryRepository();
  }

  public async obtenerMantenciones(): Promise<MantencionDto[]> {
    const mantenciones = await this.mantencionQueryRepository.obtenerMantenciones();
    return mantenciones.map((m) => this.mapMantencion(m));
  }

  public async obtenerMantencion(id: number): Promise<MantencionDto | null> {
    const mantencion = await this.mantencionQueryRepository.obtenerMantencion(id);

    if (!mantencion) {
      return null;
    }

    return this.mapMantencion(mantencion);
  }

  private mapMantencion(record: any): MantencionDto {
    return {
      Id: record.Id,
      IdVehiculo: record.IdVehiculo,
      Fecha: record.Fecha,
      IdTaller: record.IdTaller,
      Servicio: record.Servicio,
      MontoTotal: record.MontoTotal,
      Boleta: record.Boleta ?? null,
      IdUsuario: record.IdUsuario,
    };
  }
}
