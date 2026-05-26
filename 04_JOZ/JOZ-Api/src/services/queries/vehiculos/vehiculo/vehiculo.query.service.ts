import { VehiculoDto } from "../../../../dtos/vehiculos/vehiculo/vehiculo.dto";
import { VehiculoQueryRepository } from "../../../../repositories/queries/vehiculos/vehiculo/vehiculo.query.repository";

export class VehiculoQueryService {
  private vehiculoQueryRepository: VehiculoQueryRepository;

  constructor(vehiculoQueryRepository?: VehiculoQueryRepository) {
    this.vehiculoQueryRepository = vehiculoQueryRepository ?? new VehiculoQueryRepository();
  }

  public async obtenerVehiculos(): Promise<VehiculoDto[]> {
    const vehiculos = await this.vehiculoQueryRepository.obtenerVehiculos();
    return vehiculos.map((v) => this.mapVehiculo(v));
  }

  public async obtenerVehiculo(id: number): Promise<VehiculoDto | null> {
    const vehiculo = await this.vehiculoQueryRepository.obtenerVehiculo(id);

    if (!vehiculo) {
      return null;
    }

    return this.mapVehiculo(vehiculo);
  }

  private mapVehiculo(record: any): VehiculoDto {
    return {
      Id: record.Id,
      IdMarcaModeloVehiculo: record.IdMarcaModeloVehiculo,
      Ano: record.Ano,
      NumeroMotor: record.NumeroMotor,
      NumeroChasis: record.NumeroChasis,
      Color: record.Color,
      FechaCompra: record.FechaCompra,
      MontoCompra: record.MontoCompra,
      Vendido: record.Vendido,
      FechaVenta: record.FechaVenta ?? null,
      MontoVenta: record.MontoVenta ?? null,
    };
  }
}
