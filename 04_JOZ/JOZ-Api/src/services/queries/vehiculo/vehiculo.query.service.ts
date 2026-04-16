import { VehiculoDto } from "../../../dtos/vehiculo/vehiculo.dto";
import { VehiculoQueryRepository } from "../../../repositories/queries/vehiculo/vehiculo.query.repository";

export class VehiculoQueryService {
  private vehiculoQueryRepository: VehiculoQueryRepository;

  constructor(vehiculoQueryRepository?: VehiculoQueryRepository) {
    this.vehiculoQueryRepository = vehiculoQueryRepository ?? new VehiculoQueryRepository();
  }

  public async obtenerVehiculo(id: number): Promise<VehiculoDto | null> {
    const found = await this.vehiculoQueryRepository.obtenerVehiculo(id);
    if (!found) return null;

    return new VehiculoDto(
      found.Id,
      found.IdMarcaModeloVehiculo,
      found.Ano,
      found.NumeroMotor,
      found.NumeroChasis,
      found.Color,
      found.FechaCompra,
      found.MontoCompra,
      found.Vendido,
      found.FechaVenta ?? null,
      found.MontoVenta ?? null,
    );
  }

  public async obtenerVehiculos(): Promise<VehiculoDto[]> {
    const list = await this.vehiculoQueryRepository.obtenerVehiculos();
    return list.map((v) => new VehiculoDto(v.Id, v.IdMarcaModeloVehiculo, v.Ano, v.NumeroMotor, v.NumeroChasis, v.Color, v.FechaCompra, v.MontoCompra, v.Vendido, v.FechaVenta ?? null, v.MontoVenta ?? null));
  }
}
