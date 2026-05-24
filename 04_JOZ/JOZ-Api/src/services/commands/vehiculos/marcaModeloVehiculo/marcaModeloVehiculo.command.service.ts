import { MarcaModeloVehiculoCreateRequestDto } from "../../../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoCreateRequest.dto";
import { MarcaModeloVehiculoCreateResponseDto } from "../../../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoCreateResponse.dto";
import { MarcaModeloVehiculoUpdateRequestDto } from "../../../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoUpdateRequest.dto";
import { MarcaModeloVehiculoUpdateResponseDto } from "../../../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoUpdateResponse.dto";
import { MarcaModeloVehiculoCommandRepository } from "../../../../repositories/commands/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.command.repository";
import { MarcaQueryService } from "../../../queries/vehiculos/marca/marca.query.service";
import { MarcaModeloVehiculoQueryService } from "../../../queries/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.query.service";
import { ModeloQueryService } from "../../../queries/vehiculos/modelo/modelo.query.service";

export class MarcaModeloVehiculoCommandService {
  private marcaModeloVehiculoCommandRepository: MarcaModeloVehiculoCommandRepository;
  private marcaModeloVehiculoQueryService: MarcaModeloVehiculoQueryService;
  private marcaQueryService: MarcaQueryService;
  private modeloQueryService: ModeloQueryService;

  constructor(marcaModeloVehiculoCommandRepository?: MarcaModeloVehiculoCommandRepository, marcaModeloVehiculoQueryService?: MarcaModeloVehiculoQueryService, marcaQueryService?: MarcaQueryService, modeloQueryService?: ModeloQueryService) {
    this.marcaModeloVehiculoCommandRepository = marcaModeloVehiculoCommandRepository ?? new MarcaModeloVehiculoCommandRepository();
    this.marcaModeloVehiculoQueryService = marcaModeloVehiculoQueryService ?? new MarcaModeloVehiculoQueryService();
    this.marcaQueryService = marcaQueryService ?? new MarcaQueryService();
    this.modeloQueryService = modeloQueryService ?? new ModeloQueryService();
  }

  public async crearMarcaModeloVehiculo(req: MarcaModeloVehiculoCreateRequestDto): Promise<MarcaModeloVehiculoCreateResponseDto> {
    const idMarca = req.IdMarca;
    const marca = await this.marcaQueryService.obtenerMarca(idMarca);
    if (!marca) {
      throw new Error("IdMarca no es válido");
    }

    const idModelo = req.IdModelo;
    const modelo = await this.modeloQueryService.obtenerModelo(idModelo);
    if (!modelo) {
      throw new Error("IdModelo no es válido");
    }

    const created = await this.marcaModeloVehiculoCommandRepository.crearMarcaModeloVehiculo(req);
    return {
      Id: created.Id,
      IdMarca: created.IdMarca,
      IdModelo: created.IdModelo,
    } as MarcaModeloVehiculoCreateResponseDto;
  }

  public async actualizarMarcaModeloVehiculo(id: number, req: MarcaModeloVehiculoUpdateRequestDto): Promise<MarcaModeloVehiculoUpdateResponseDto | null> {
    const existent = await this.marcaModeloVehiculoQueryService.obtenerMarcaModeloVehiculo(id);
    if (!existent) {
      throw new Error("MarcaModeloVehiculo no encontrado");
    }

    const idMarca = req.IdMarca;
    const marca = await this.marcaQueryService.obtenerMarca(idMarca);
    if (!marca) {
      throw new Error("IdMarca no es válido");
    }

    const idModelo = req.IdModelo;
    const modelo = await this.modeloQueryService.obtenerModelo(idModelo);
    if (!modelo) {
      throw new Error("IdModelo no es válido");
    }

    const updated = await this.marcaModeloVehiculoCommandRepository.actualizarMarcaModeloVehiculo(id, req);
    return {
      Id: updated.Id,
      IdMarca: updated.IdMarca,
      IdModelo: updated.IdModelo,
    } as MarcaModeloVehiculoUpdateResponseDto;
  }

  public async eliminarMarcaModeloVehiculo(id: number): Promise<string> {
    const existent = await this.marcaModeloVehiculoQueryService.obtenerMarcaModeloVehiculo(id);
    if (!existent) {
      throw new Error("MarcaModeloVehiculo no encontrado");
    }

    return await this.marcaModeloVehiculoCommandRepository.eliminarMarcaModeloVehiculo(id);
  }
}
