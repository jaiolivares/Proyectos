import { VehiculoCreateRequestDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoCreateRequest.dto";
import { VehiculoCreateResponseDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoCreateResponse.dto";
import { VehiculoUpdateRequestDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoUpdateRequest.dto";
import { VehiculoUpdateResponseDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoUpdateResponse.dto";
import { VehiculoCommandRepository } from "../../../../repositories/commands/vehiculos/vehiculo/vehiculo.command.repository";
import { VehiculoQueryService } from "../../../queries/vehiculos/vehiculo/vehiculo.query.service";

export class VehiculoCommandService {
  private vehiculoCommandRepository: VehiculoCommandRepository;
  private vehiculoQueryService: VehiculoQueryService;

  constructor(vehiculoCommandRepository?: VehiculoCommandRepository, vehiculoQueryService?: VehiculoQueryService) {
    this.vehiculoCommandRepository = vehiculoCommandRepository ?? new VehiculoCommandRepository();
    this.vehiculoQueryService = vehiculoQueryService ?? new VehiculoQueryService();
  }

  public async crearVehiculo(req: VehiculoCreateRequestDto): Promise<VehiculoCreateResponseDto> {

    //Agregar validacion de MarcaModeloVehiculo FK
    //Se debe crear el servicio de MarcaModeloVehiculo y validar la existencia antes de crear el vehículo
    //Con el metodo obtener de MarcaModeloVehiculoQueryService...


    return await this.vehiculoCommandRepository.crearVehiculo(req) as Promise<VehiculoCreateResponseDto>;
  }

  public async actualizarVehiculo(id: number, req: VehiculoUpdateRequestDto): Promise<VehiculoUpdateResponseDto | null> {
    const existent = await this.vehiculoQueryService.obtenerVehiculo(id);
    if (!existent) return null;
    return await this.vehiculoCommandRepository.actualizarVehiculo(id, req) as Promise<VehiculoUpdateResponseDto>;
  }

  public async eliminarVehiculo(id: number): Promise<boolean> {
    const existent = await this.vehiculoQueryService.obtenerVehiculo(id);
    if (!existent) return false;
    return await this.vehiculoCommandRepository.eliminarVehiculo(id);
  }
}
