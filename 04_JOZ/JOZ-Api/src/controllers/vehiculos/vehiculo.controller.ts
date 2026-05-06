import { Request, Response } from "express";
import { VehiculoCommandService } from "../../services/commands/vehiculos/vehiculo/vehiculo.command.service";
import { VehiculoQueryService } from "../../services/queries/vehiculos/vehiculo/vehiculo.query.service";
import { VehiculoCreateRequestDto } from "../../dtos/vehiculos/vehiculo/vehiculoCreateRequest.dto";
import { VehiculoCreateResponseDto } from "../../dtos/vehiculos/vehiculo/vehiculoCreateResponse.dto";
import { ValidataEstructuraCreateBody } from "./validators/vehiculoCreate.validator";
import { ValidataEstructuraUpdateBody } from "./validators/vehiculoUpdate.validator";
import { NormalizaBody } from "../../utils/util";
import { VehiculoUpdateRequestDto } from "../../dtos/vehiculos/vehiculo/vehiculoUpdateRequest.dto";
import { VehiculoUpdateResponseDto } from "../../dtos/vehiculos/vehiculo/vehiculoUpdateResponse.dto";
import { respuestaOk, respuestaError } from "../../dtos/utils/respuesta.dto";
import type { Respuesta } from "../../dtos/utils/respuesta.dto";
import { VehiculoDto } from "../../dtos/vehiculos/vehiculo/vehiculo.dto";

export class VehiculoController {
  private vehiculoCommandService: VehiculoCommandService;
  private vehiculoQueryService: VehiculoQueryService;

  constructor(vehiculoCommandService: VehiculoCommandService, vehiculoQueryService: VehiculoQueryService) {
    this.vehiculoCommandService = vehiculoCommandService;
    this.vehiculoQueryService = vehiculoQueryService;
  }

  public async obtenerTodos(_: Request, res: Response<Respuesta<VehiculoDto[]>>): Promise<Response<Respuesta<VehiculoDto[]>>> {
    const items = await this.vehiculoQueryService.obtenerVehiculos();

    if (items.length === 0)
      return res.status(404).json(respuestaError<VehiculoDto[]>("No se encontraron Vehículos"));

    return res.status(200).json(respuestaOk<VehiculoDto[]>(items));
  }

  public async obtenerPorId(req: Request, res: Response<Respuesta<VehiculoDto>>): Promise<Response<Respuesta<VehiculoDto>>> {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json(respuestaError<VehiculoDto>("ID inválido"));

    const found = await this.vehiculoQueryService.obtenerVehiculo(id);
    
    if (!found)
      return res.status(404).json(respuestaError<VehiculoDto>("Vehículo no encontrado"));
    
    return res.status(200).json(respuestaOk<VehiculoDto>(found));
  }

  public async crear(req: Request<{}, {}, VehiculoCreateRequestDto>, res: Response<Respuesta<VehiculoCreateResponseDto>>): Promise<Response<Respuesta<VehiculoCreateResponseDto>>> {
    try {      
      NormalizaBody(req.body);
      const validation = ValidataEstructuraCreateBody(req.body);

      if (!validation.valid) {
        return res.status(400).json(respuestaError<VehiculoCreateResponseDto>(validation.errors?.join('; ') ?? 'Body inválido'));
      }
      const created = await this.vehiculoCommandService.crearVehiculo(req.body);
      return res.status(201).json(respuestaOk<VehiculoCreateResponseDto>(created));
      
    } catch (err: any) {
      if (err?.message === 'IdMarcaModeloVehiculo no es válido') {
        return res.status(400).json(respuestaError<VehiculoCreateResponseDto>(err.message));
      }
      return res.status(500).json(respuestaError<VehiculoCreateResponseDto>(err.message ?? 'error interno'));
    }
  }

  public async actualizar(req: Request<{ id: string }, {}, VehiculoUpdateRequestDto>, res: Response<Respuesta<VehiculoUpdateResponseDto>>): Promise<Response<Respuesta<VehiculoUpdateResponseDto>>> {
    try {

      const id = Number(req.params.id);

      if (isNaN(id))
        return res.status(400).json(respuestaError<VehiculoUpdateResponseDto>("ID inválido"));

      if (req.body == null)
        return res.status(400).json(respuestaError<VehiculoUpdateResponseDto>("No existen datos para actualizar"));

      NormalizaBody(req.body);
      const validation = ValidataEstructuraUpdateBody(req.body);

      if (!validation.valid) {
        return res.status(400).json(respuestaError<VehiculoUpdateResponseDto>(validation.errors?.join("; ") ?? "Body inválido"));
      }

      const updated = await this.vehiculoCommandService.actualizarVehiculo(id, req.body);
      return res.status(200).json(respuestaOk<VehiculoUpdateResponseDto>(updated));

    } catch (err: any) {

      if (err?.message === "Vehículo no encontrado") {
        return res.status(400).json(respuestaError<VehiculoUpdateResponseDto>(err.message));
      }

      if (err?.message === "IdMarcaModeloVehiculo no es válido") {
        return res.status(400).json(respuestaError<VehiculoUpdateResponseDto>(err.message));
      }
      return res.status(500).json(respuestaError<VehiculoUpdateResponseDto>(err.message ?? "error interno"));
    }
  }

  public async eliminar(req: Request, res: Response<Respuesta<string>>): Promise<Response<Respuesta<string>>> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id))
        return res.status(400).json(respuestaError<string>("ID inválido"));

      const deleted = await this.vehiculoCommandService.eliminarVehiculo(id);
      
      return res.status(200).json(respuestaOk<string>(deleted));
    
    } catch (err: any) {
      if (err?.message === "Vehículo no encontrado") {
        return res.status(400).json(respuestaError<string>(err.message));
      }

      return res.status(500).json(respuestaError<string>(err.message ?? "error interno"));
    }

  }
}
