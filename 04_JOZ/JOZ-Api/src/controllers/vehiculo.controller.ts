import { Request, Response } from "express";
import { VehiculoCommandService } from "../services/commands/vehiculo/vehiculo.command.service";
import { VehiculoQueryService } from "../services/queries/vehiculo/vehiculo.query.service";
import { VehiculoCreateRequestDto } from "../dtos/vehiculo/vehiculoCreateRequest.dto";
import { VehiculoCreateResponseDto } from "../dtos/vehiculo/vehiculoCreateResponse.dto";
import { VehiculoUpdateRequestDto } from "../dtos/vehiculo/vehiculoUpdateRequest.dto";
import { VehiculoUpdateResponseDto } from "../dtos/vehiculo/vehiculoUpdateResponse.dto";

export class VehiculoController {
  private vehiculoCommandService: VehiculoCommandService;
  private vehiculoQueryService: VehiculoQueryService;

  constructor(vehiculoCommandService: VehiculoCommandService, vehiculoQueryService: VehiculoQueryService) {
    this.vehiculoCommandService = vehiculoCommandService;
    this.vehiculoQueryService = vehiculoQueryService;
  }

  public async obtenerTodos(req: Request, res: Response): Promise<Response> {
    const items = await this.vehiculoQueryService.obtenerVehiculos();
    return res.status(200).json(items);
  }

  public async obtenerPorId(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const found = await this.vehiculoQueryService.obtenerVehiculo(id);
    if (!found) return res.status(404).json({ message: "Vehículo no encontrado" });
    return res.status(200).json(found);
  }

  public async crear(req: Request<{}, {}, VehiculoCreateRequestDto>, res: Response<VehiculoCreateResponseDto>): Promise<Response<VehiculoCreateResponseDto>> {
    try {
      const created = await this.vehiculoCommandService.crearVehiculo(req.body);
      return res.status(201).json(created);
    } catch (err: any) {
      return res.status(500).json({ message: err.message ?? 'error' } as any);
    }
  }

  public async actualizar(req: Request<{ id: string }, {}, VehiculoUpdateRequestDto>, res: Response<VehiculoUpdateResponseDto>): Promise<Response<VehiculoUpdateResponseDto>> {
    const id = Number(req.params.id);
    const updated = await this.vehiculoCommandService.actualizarVehiculo(id, req.body);
    if (!updated) return res.status(404).json({ message: "Vehículo no encontrado" });
    return res.status(200).json(updated);
  }

  public async eliminar(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const deleted = await this.vehiculoCommandService.eliminarVehiculo(id);
    if (!deleted) return res.status(404).json({ message: "Vehículo no encontrado" });
    return res.status(204).send();
  }
}
