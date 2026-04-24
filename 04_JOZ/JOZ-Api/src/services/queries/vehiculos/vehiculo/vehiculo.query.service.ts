import { VehiculoDto } from "../../../../dtos/vehiculos/vehiculo/vehiculo.dto";
import { VehiculoQueryRepository } from "../../../../repositories/queries/vehiculos/vehiculo/vehiculo.query.repository";

export class VehiculoQueryService {
  private vehiculoQueryRepository: VehiculoQueryRepository;

  constructor(vehiculoQueryRepository?: VehiculoQueryRepository) {
    this.vehiculoQueryRepository = vehiculoQueryRepository ?? new VehiculoQueryRepository();
  }

  public async obtenerVehiculos(): Promise<VehiculoDto[]> {
    const vehiculos = await this.vehiculoQueryRepository.obtenerVehiculos();
    return vehiculos.map((v) => new VehiculoDto(v.Id, v.IdMarcaModeloVehiculo, v.Ano, v.NumeroMotor, v.NumeroChasis, v.Color, v.FechaCompra, v.MontoCompra, v.Vendido, v.FechaVenta ?? null, v.MontoVenta ?? null));
  }

  public async obtenerVehiculo(id: number): Promise<VehiculoDto | null> {
    const vehiculo = await this.vehiculoQueryRepository.obtenerVehiculo(id);

    if (!vehiculo)
      return null;

    return new VehiculoDto(
      vehiculo.Id,
      vehiculo.IdMarcaModeloVehiculo,
      vehiculo.Ano,
      vehiculo.NumeroMotor,
      vehiculo.NumeroChasis,
      vehiculo.Color,
      vehiculo.FechaCompra,
      vehiculo.MontoCompra,
      vehiculo.Vendido,
      vehiculo.FechaVenta ?? null,
      vehiculo.MontoVenta ?? null,
    );
  }
}
