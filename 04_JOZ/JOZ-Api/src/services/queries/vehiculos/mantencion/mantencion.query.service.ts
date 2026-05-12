import { MantencionDto } from '../../../../dtos/vehiculos/mantencion/mantencion.dto';
import { MantencionQueryRepository } from '../../../../repositories/queries/vehiculos/mantencion/mantencion.query.repository';

export class MantencionQueryService {
  private mantencionQueryRepository: MantencionQueryRepository;

  constructor(mantencionQueryRepository?: MantencionQueryRepository) {
    this.mantencionQueryRepository = mantencionQueryRepository ?? new MantencionQueryRepository();
  }

  public async obtenerMantenciones(): Promise<MantencionDto[]> {
    const mantenciones = await this.mantencionQueryRepository.obtenerMantenciones();
    return mantenciones.map((v) => new MantencionDto(v.Id, v.IdVehiculo, v.Fecha, v.IdTaller, v.Servicio, v.MontoTotal, v.Boleta ?? null, v.IdUsuario));
  }

  public async obtenerMantencion(id: number): Promise<MantencionDto | null> {
    const mant = await this.mantencionQueryRepository.obtenerMantencion(id);
      if (!mant)
          return null;
      
    return new MantencionDto(mant.Id, mant.IdVehiculo, mant.Fecha, mant.IdTaller, mant.Servicio, mant.MontoTotal, mant.Boleta ?? null, mant.IdUsuario);
  }
}
