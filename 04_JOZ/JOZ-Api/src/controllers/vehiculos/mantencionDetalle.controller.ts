import { Request, Response } from "express";
import { MantencionDetalleQueryService } from "../../services/queries/vehiculos/mantencionDetalle/mantencionDetalle.query.service";
import { MantencionDetalleCommandService } from "../../services/commands/vehiculos/mantencionDetalle/mantencionDetalle.command.service";
import { MantencionDetalleCreateRequestDto } from "../../dtos/vehiculos/mantencionDetalle/mantencionDetalleCreateRequest.dto";
import { MantencionDetalleCreateResponseDto } from "../../dtos/vehiculos/mantencionDetalle/mantencionDetalleCreateResponse.dto";
import { MantencionDetalleUpdateRequestDto } from "../../dtos/vehiculos/mantencionDetalle/mantencionDetalleUpdateRequest.dto";
import { MantencionDetalleUpdateResponseDto } from "../../dtos/vehiculos/mantencionDetalle/mantencionDetalleUpdateResponse.dto";
import { NormalizaBody } from "../../utils/util";
import { respuestaOk, respuestaError } from "../../dtos/utils/respuesta.dto";
import type { Respuesta } from "../../dtos/utils/respuesta.dto";
import { MantencionDetalleDto } from "../../dtos/vehiculos/mantencionDetalle/mantencionDetalle.dto";
import { errorMiddleware } from "../../middleware/error.middleware";
import { ValidataEstructuraCreateBody } from "./validators/mantencionDetalleCreate.validator";
import { ValidataEstructuraUpdateBody } from "./validators/mantencionDetalleUpdate.validator";

export class MantencionDetalleController {
  private mantencionDetalleQueryService: MantencionDetalleQueryService;
  private mantencionDetalleCommandService: MantencionDetalleCommandService;

  constructor(mantencionDetalleCommandService: MantencionDetalleCommandService, mantencionDetalleQueryService: MantencionDetalleQueryService) {
    this.mantencionDetalleCommandService = mantencionDetalleCommandService;
    this.mantencionDetalleQueryService = mantencionDetalleQueryService;
  }

  public async obtenerTodos(_: Request, res: Response<Respuesta<MantencionDetalleDto[]>>): Promise<Response<Respuesta<MantencionDetalleDto[]>>> {
    const items = await this.mantencionDetalleQueryService.obtenerMantencionDetalles();
    if (items.length === 0) {
      return res.status(404).json(respuestaError<MantencionDetalleDto[]>("No se encontraron detalles de mantencion"));
    }
    return res.status(200).json(respuestaOk<MantencionDetalleDto[]>(items));
  }

  public async obtenerPorId(req: Request, res: Response<Respuesta<MantencionDetalleDto>>): Promise<Response<Respuesta<MantencionDetalleDto>>> {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(respuestaError<MantencionDetalleDto>("ID inválido"));
    const found = await this.mantencionDetalleQueryService.obtenerMantencionDetalle(id);
    if (!found) return res.status(404).json(respuestaError<MantencionDetalleDto>("Detalle de mantencion no encontrado"));
    return res.status(200).json(respuestaOk<MantencionDetalleDto>(found));
  }

  public async crear(req: Request<{}, {}, MantencionDetalleCreateRequestDto>, res: Response<Respuesta<MantencionDetalleCreateResponseDto>>): Promise<Response<Respuesta<MantencionDetalleCreateResponseDto>>> {
    try {
      NormalizaBody(req.body);
      const validation = ValidataEstructuraCreateBody(req.body);
      if (!validation.valid) return res.status(400).json(respuestaError<MantencionDetalleCreateResponseDto>(validation.errors?.join("; ") ?? "Body inválido"));
      const created = await this.mantencionDetalleCommandService.crearMantencionDetalle(req.body);
      return res.status(201).json(respuestaOk<MantencionDetalleCreateResponseDto>(created));
    } catch (err: any) {
      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<MantencionDetalleCreateResponseDto>("ERROR CATCH: " + (err?.message ?? "error interno")));
    }
  }

  public async actualizar(req: Request<{ id: string }, {}, MantencionDetalleUpdateRequestDto>, res: Response<Respuesta<MantencionDetalleUpdateResponseDto>>): Promise<Response<Respuesta<MantencionDetalleUpdateResponseDto>>> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json(respuestaError<MantencionDetalleUpdateResponseDto>("ID inválido"));
      if (req.body == null) return res.status(400).json(respuestaError<MantencionDetalleUpdateResponseDto>("No existen datos para actualizar"));
      NormalizaBody(req.body);
      const validation = ValidataEstructuraUpdateBody(req.body);
      if (!validation.valid) return res.status(400).json(respuestaError<MantencionDetalleUpdateResponseDto>(validation.errors?.join("; ") ?? "Body inválido"));
      const updated = await this.mantencionDetalleCommandService.actualizarMantencionDetalle(id, req.body);
      if (!updated) return res.status(404).json(respuestaError<MantencionDetalleUpdateResponseDto>("Detalle de mantencion no encontrado"));
      return res.status(200).json(respuestaOk<MantencionDetalleUpdateResponseDto>(updated));
    } catch (err: any) {
      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<MantencionDetalleUpdateResponseDto>("ERROR CATCH: " + (err?.message ?? "error interno")));
    }
  }

  public async eliminar(req: Request, res: Response<Respuesta<null>>): Promise<Response<Respuesta<null>>> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json(respuestaError<null>("ID inválido"));
      const deleted = await this.mantencionDetalleCommandService.eliminarMantencionDetalle(id);
      if (!deleted) return res.status(404).json(respuestaError<null>("Detalle de mantencion no encontrado"));
      return res.status(200).json(respuestaOk<null>(null));
    } catch (err: any) {
      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<null>("ERROR CATCH: " + (err?.message ?? "error interno")));
    }
  }
}

export default MantencionDetalleController;
