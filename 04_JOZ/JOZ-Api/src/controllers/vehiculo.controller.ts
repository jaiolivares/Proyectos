import { Request, Response } from "express";
import { VehiculoCommandService } from "../services/commands/vehiculo/vehiculo.command.service";
import { VehiculoQueryService } from "../services/queries/vehiculo/vehiculo.query.service";
import { VehiculoCreateRequestDto } from "../dtos/vehiculo/vehiculoCreateRequest.dto";
import { VehiculoCreateResponseDto } from "../dtos/vehiculo/vehiculoCreateResponse.dto";
import { VehiculoUpdateRequestDto } from "../dtos/vehiculo/vehiculoUpdateRequest.dto";
import { VehiculoUpdateResponseDto } from "../dtos/vehiculo/vehiculoUpdateResponse.dto";
import { respuestaOk, respuestaError } from "../dtos/response.dto";
import type { StandardResponse } from "../dtos/response.dto";
import { VehiculoDto } from "../dtos/vehiculo/vehiculo.dto";

export class VehiculoController {
  private vehiculoCommandService: VehiculoCommandService;
  private vehiculoQueryService: VehiculoQueryService;

  constructor(vehiculoCommandService: VehiculoCommandService, vehiculoQueryService: VehiculoQueryService) {
    this.vehiculoCommandService = vehiculoCommandService;
    this.vehiculoQueryService = vehiculoQueryService;
  }

  public async obtenerTodos(req: Request, res: Response<StandardResponse<VehiculoDto[]>>): Promise<Response<StandardResponse<VehiculoDto[]>>> {
    const items = await this.vehiculoQueryService.obtenerVehiculos();
    return res.status(200).json(respuestaOk<VehiculoDto[]>(items));
  }

  public async obtenerPorId(req: Request, res: Response<StandardResponse<VehiculoDto>>): Promise<Response<StandardResponse<VehiculoDto>>> {
    const id = Number(req.params.id);
    const found = await this.vehiculoQueryService.obtenerVehiculo(id);
    if (!found) return res.status(404).json(respuestaError<VehiculoDto>("Vehículo no encontrado"));
    return res.status(200).json(respuestaOk<VehiculoDto>(found));
  }

  public async crear(req: Request<{}, {}, VehiculoCreateRequestDto>, res: Response<StandardResponse<VehiculoCreateResponseDto>>): Promise<Response<StandardResponse<VehiculoCreateResponseDto>>> {
    try {
      const created = await this.vehiculoCommandService.crearVehiculo(req.body);
      return res.status(201).json(respuestaOk<VehiculoCreateResponseDto>(created));
    } catch (err: any) {
      return res.status(500).json(respuestaError<VehiculoCreateResponseDto>(err.message ?? 'error'));
    }
  }

  public async actualizar(req: Request<{ id: string }, {}, VehiculoUpdateRequestDto>, res: Response<StandardResponse<VehiculoUpdateResponseDto>>): Promise<Response<StandardResponse<VehiculoUpdateResponseDto>>> {
    const id = Number(req.params.id);
    const updated = await this.vehiculoCommandService.actualizarVehiculo(id, req.body);
    if (!updated) return res.status(404).json(respuestaError<VehiculoUpdateResponseDto>("Vehículo no encontrado"));
    return res.status(200).json(respuestaOk<VehiculoUpdateResponseDto>(updated));
  }

  public async eliminar(req: Request, res: Response<StandardResponse<null>>): Promise<Response<StandardResponse<null>>> {
    const id = Number(req.params.id);
    const deleted = await this.vehiculoCommandService.eliminarVehiculo(id);
    if (!deleted) return res.status(404).json(respuestaError<null>("Vehículo no encontrado"));
    return res.status(200).json(respuestaOk<null>(null));
  }
}
