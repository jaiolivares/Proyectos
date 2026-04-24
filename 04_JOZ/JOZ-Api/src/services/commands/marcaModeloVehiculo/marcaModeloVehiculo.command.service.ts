import { MarcaModeloVehiculoCreateRequestDto } from "../../../dtos/marcaModeloVehiculo/marcaModeloVehiculoCreateRequest.dto";
import { MarcaModeloVehiculoCreateResponseDto } from "../../../dtos/marcaModeloVehiculo/marcaModeloVehiculoCreateResponse.dto";
import { MarcaModeloVehiculoUpdateRequestDto } from "../../../dtos/marcaModeloVehiculo/marcaModeloVehiculoUpdateRequest.dto";
import { MarcaModeloVehiculoUpdateResponseDto } from "../../../dtos/marcaModeloVehiculo/marcaModeloVehiculoUpdateResponse.dto";
import { MarcaModeloVehiculoCommandRepository } from "../../../repositories/commands/marcaModeloVehiculo/marcaModeloVehiculo.command.repository";
import { MarcaModeloVehiculoQueryService } from "../../queries/marcaModeloVehiculo/marcaModeloVehiculo.query.service";

export class MarcaModeloVehiculoCommandService {
  private marcaModeloVehiculoCommandRepository: MarcaModeloVehiculoCommandRepository;
  private marcaModeloVehiculoQueryService: MarcaModeloVehiculoQueryService;

  constructor(marcaModeloVehiculoCommandRepository?: MarcaModeloVehiculoCommandRepository, marcaModeloVehiculoQueryService?: MarcaModeloVehiculoQueryService) {
    this.marcaModeloVehiculoCommandRepository = marcaModeloVehiculoCommandRepository ?? new MarcaModeloVehiculoCommandRepository();
    this.marcaModeloVehiculoQueryService = marcaModeloVehiculoQueryService ?? new MarcaModeloVehiculoQueryService();
  }

  public async crearMarcaModeloVehiculo(req: MarcaModeloVehiculoCreateRequestDto): Promise<MarcaModeloVehiculoCreateResponseDto> {
    return await this.marcaModeloVehiculoCommandRepository.crearMarcaModeloVehiculo(req) as Promise<MarcaModeloVehiculoCreateResponseDto>;
  }

  public async actualizarMarcaModeloVehiculo(id: number, req: MarcaModeloVehiculoUpdateRequestDto): Promise<MarcaModeloVehiculoUpdateResponseDto | null> {
    const existent = await this.marcaModeloVehiculoQueryService.obtenerMarcaModeloVehiculo(id);
    if (!existent) return null;
    return await this.marcaModeloVehiculoCommandRepository.actualizarMarcaModeloVehiculo(id, req) as Promise<MarcaModeloVehiculoUpdateResponseDto>;
  }

  public async eliminarMarcaModeloVehiculo(id: number): Promise<boolean> {
    const existent = await this.marcaModeloVehiculoQueryService.obtenerMarcaModeloVehiculo(id);
    if (!existent) return false;
    return await this.marcaModeloVehiculoCommandRepository.eliminarMarcaModeloVehiculo(id);
  }
}
