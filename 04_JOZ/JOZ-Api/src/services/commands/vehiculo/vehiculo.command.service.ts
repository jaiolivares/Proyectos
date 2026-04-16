import { VehiculoCreateRequestDto } from "../../../dtos/vehiculo/vehiculoCreateRequest.dto";
import { VehiculoCreateResponseDto } from "../../../dtos/vehiculo/vehiculoCreateResponse.dto";
import { VehiculoUpdateRequestDto } from "../../../dtos/vehiculo/vehiculoUpdateRequest.dto";
import { VehiculoUpdateResponseDto } from "../../../dtos/vehiculo/vehiculoUpdateResponse.dto";
import { VehiculoCommandRepository } from "../../../repositories/commands/vehiculo/vehiculo.command.repository";
import { VehiculoQueryService } from "../../queries/vehiculo/vehiculo.query.service";

export class VehiculoCommandService {
  private vehiculoCommandRepository: VehiculoCommandRepository;
  private vehiculoQueryService: VehiculoQueryService;

  constructor(vehiculoCommandRepository?: VehiculoCommandRepository, vehiculoQueryService?: VehiculoQueryService) {
    this.vehiculoCommandRepository = vehiculoCommandRepository ?? new VehiculoCommandRepository();
    this.vehiculoQueryService = vehiculoQueryService ?? new VehiculoQueryService();
  }

  public async crearVehiculo(req: VehiculoCreateRequestDto): Promise<VehiculoCreateResponseDto> {
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
