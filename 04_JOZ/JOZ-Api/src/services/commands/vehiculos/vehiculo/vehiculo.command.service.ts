import { VehiculoCreateRequestDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoCreateRequest.dto";
import { VehiculoCreateResponseDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoCreateResponse.dto";
import { VehiculoUpdateRequestDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoUpdateRequest.dto";
import { VehiculoUpdateResponseDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoUpdateResponse.dto";
import { VehiculoCommandRepository } from "../../../../repositories/commands/vehiculos/vehiculo/vehiculo.command.repository";
import { MarcaModeloVehiculoQueryService } from "../../../queries/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.query.service";
import { VehiculoQueryService } from "../../../queries/vehiculos/vehiculo/vehiculo.query.service";

export class VehiculoCommandService {
  private vehiculoCommandRepository: VehiculoCommandRepository;
  private vehiculoQueryService: VehiculoQueryService;
  private marcaModeloVehiculoQueryService: MarcaModeloVehiculoQueryService;

  constructor(vehiculoCommandRepository?: VehiculoCommandRepository, vehiculoQueryService?: VehiculoQueryService, marcaModeloVehiculoQueryService?: MarcaModeloVehiculoQueryService) {
    this.vehiculoCommandRepository = vehiculoCommandRepository ?? new VehiculoCommandRepository();
    this.vehiculoQueryService = vehiculoQueryService ?? new VehiculoQueryService();
    this.marcaModeloVehiculoQueryService = marcaModeloVehiculoQueryService ?? new MarcaModeloVehiculoQueryService();
  }

  public async crearVehiculo(req: VehiculoCreateRequestDto): Promise<VehiculoCreateResponseDto> {
    const idMarcaModeloVehiculo = req.IdMarcaModeloVehiculo;
    const marcaModelo = await this.marcaModeloVehiculoQueryService.obtenerMarcaModeloVehiculo(idMarcaModeloVehiculo);
    if (!marcaModelo) {
      throw new Error("IdMarcaModeloVehiculo no es válido");
    }

    const created = await this.vehiculoCommandRepository.crearVehiculo(req);
    return {
      Id: created.Id,
      IdMarcaModeloVehiculo: created.IdMarcaModeloVehiculo,
      Ano: created.Ano,
      NumeroMotor: created.NumeroMotor,
      NumeroChasis: created.NumeroChasis,
      Color: created.Color,
      FechaCompra: created.FechaCompra,
      MontoCompra: created.MontoCompra,
    } as VehiculoCreateResponseDto;
  }

  public async actualizarVehiculo(id: number, req: VehiculoUpdateRequestDto): Promise<VehiculoUpdateResponseDto | null> {
    const existent = await this.vehiculoQueryService.obtenerVehiculo(id);
    if (!existent) {
      throw new Error("Vehículo no encontrado");
    }

    const idMarcaModeloVehiculo = req.IdMarcaModeloVehiculo;
    const marcaModelo = await this.marcaModeloVehiculoQueryService.obtenerMarcaModeloVehiculo(idMarcaModeloVehiculo);
    if (!marcaModelo) {
      throw new Error("IdMarcaModeloVehiculo no es válido");
    }

    const updated = await this.vehiculoCommandRepository.actualizarVehiculo(id, req);

    return {
      Id: updated.Id,
      IdMarcaModeloVehiculo: updated.IdMarcaModeloVehiculo,
      Ano: updated.Ano,
      NumeroMotor: updated.NumeroMotor,
      NumeroChasis: updated.NumeroChasis,
      Color: updated.Color,
      FechaCompra: updated.FechaCompra,
      MontoCompra: updated.MontoCompra,
      Vendido: updated.Vendido,
      FechaVenta: updated.FechaVenta,
      MontoVenta: updated.MontoVenta,
    } as VehiculoUpdateResponseDto;
  }

  public async eliminarVehiculo(id: number): Promise<string> {
    const existent = await this.vehiculoQueryService.obtenerVehiculo(id);
    if (!existent) {
      throw new Error("Vehículo no encontrado");
    }

    return await this.vehiculoCommandRepository.eliminarVehiculo(id);
  }
}
