import { VehiculoCreateRequestDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoCreateRequest.dto";
import { VehiculoCreateResponseDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoCreateResponse.dto";
import { VehiculoUpdateRequestDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoUpdateRequest.dto";
import { VehiculoUpdateResponseDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoUpdateResponse.dto";
import { VehiculoCommandRepository } from "../../../../repositories/commands/vehiculos/vehiculo/vehiculo.command.repository";
import { VehiculoQueryService } from "../../../queries/vehiculos/vehiculo/vehiculo.query.service";
import { MarcaModeloVehiculoQueryService } from "../../../queries/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.query.service";

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
      throw new Error('IdMarcaModeloVehiculo no es válido');
    }

    const vehiculoModel = await this.vehiculoCommandRepository.crearVehiculo(req);

    const vehiculoCreateResponseDto = {
      Id: vehiculoModel.Id,
      IdMarcaModeloVehiculo: vehiculoModel.IdMarcaModeloVehiculo,
      Ano: vehiculoModel.Ano,
      NumeroMotor: vehiculoModel.NumeroMotor,
      NumeroChasis: vehiculoModel.NumeroChasis,
      Color: vehiculoModel.Color,
      FechaCompra: vehiculoModel.FechaCompra,
      MontoCompra: vehiculoModel.MontoCompra,
    };

    return vehiculoCreateResponseDto;

  }

  public async actualizarVehiculo(id: number, req: VehiculoUpdateRequestDto): Promise<VehiculoUpdateResponseDto | null> {
    const existent = await this.vehiculoQueryService.obtenerVehiculo(id);
    if (!existent)
      throw new Error('Vehículo no encontrado');

    const idMarcaModeloVehiculo = req.IdMarcaModeloVehiculo;
    const marcaModelo = await this.marcaModeloVehiculoQueryService.obtenerMarcaModeloVehiculo(idMarcaModeloVehiculo);
    if (!marcaModelo) {
      throw new Error("IdMarcaModeloVehiculo no es válido");
    }

    const vehiculoModel = await this.vehiculoCommandRepository.actualizarVehiculo(id, req);

    const vehiculoUpdateResponseDto = {
      Id: vehiculoModel.Id,
      IdMarcaModeloVehiculo: vehiculoModel.IdMarcaModeloVehiculo,
      Ano: vehiculoModel.Ano,
      NumeroMotor: vehiculoModel.NumeroMotor,
      NumeroChasis: vehiculoModel.NumeroChasis,
      Color: vehiculoModel.Color,
      FechaCompra: vehiculoModel.FechaCompra,
      MontoCompra: vehiculoModel.MontoCompra,
      Vendido: vehiculoModel.Vendido,
      FechaVenta: vehiculoModel.FechaVenta,
      MontoVenta: vehiculoModel.MontoVenta,
    };

    return vehiculoUpdateResponseDto;

  }

  public async eliminarVehiculo(id: number): Promise<boolean> {
    const existent = await this.vehiculoQueryService.obtenerVehiculo(id);
    if (!existent)
      throw new Error("Vehículo no encontrado");

    return await this.vehiculoCommandRepository.eliminarVehiculo(id);
  }
}
