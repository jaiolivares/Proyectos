import { Request, Response } from "express";
import type { Respuesta } from "../../dtos/utils/respuesta.dto";
import { respuestaError, respuestaOk } from "../../dtos/utils/respuesta.dto";
import { TallerDto } from "../../dtos/vehiculos/taller/taller.dto";
import { TallerCreateRequestDto } from "../../dtos/vehiculos/taller/tallerCreateRequest.dto";
import { TallerCreateResponseDto } from "../../dtos/vehiculos/taller/tallerCreateResponse.dto";
import { TallerUpdateRequestDto } from "../../dtos/vehiculos/taller/tallerUpdateRequest.dto";
import { TallerUpdateResponseDto } from "../../dtos/vehiculos/taller/tallerUpdateResponse.dto";
import { errorMiddleware } from "../../middleware/error.middleware";
import { TallerCommandService } from "../../services/commands/vehiculos/taller/taller.command.service";
import { TallerQueryService } from "../../services/queries/vehiculos/taller/taller.query.service";
import { NormalizaBody } from "../../utils/util";
import { ValidataEstructuraCreateBody } from "./validators/tallerCreate.validator";
import { ValidataEstructuraUpdateBody } from "./validators/tallerUpdate.validator";

export class TallerController {
  private tallerCommandService: TallerCommandService;
  private tallerQueryService: TallerQueryService;

  constructor(tallerCommandService: TallerCommandService, tallerQueryService: TallerQueryService) {
    this.tallerCommandService = tallerCommandService;
    this.tallerQueryService = tallerQueryService;
  }

  public async obtenerTodos(_: Request, res: Response<Respuesta<TallerDto[]>>): Promise<Response<Respuesta<TallerDto[]>>> {
    const items = await this.tallerQueryService.obtenerTalleres();

    if (items.length === 0) {
      return res.status(404).json(respuestaError<TallerDto[]>("No se encontraron Talleres"));
    }

    return res.status(200).json(respuestaOk<TallerDto[]>(items));
  }

  public async obtenerPorId(req: Request, res: Response<Respuesta<TallerDto>>): Promise<Response<Respuesta<TallerDto>>> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(respuestaError<TallerDto>("ID inválido"));
    }

    const found = await this.tallerQueryService.obtenerTaller(id);
    if (!found) {
      return res.status(404).json(respuestaError<TallerDto>("Taller no encontrado"));
    }

    return res.status(200).json(respuestaOk<TallerDto>(found));
  }

  public async crear(req: Request<{}, {}, TallerCreateRequestDto>, res: Response<Respuesta<TallerCreateResponseDto>>): Promise<Response<Respuesta<TallerCreateResponseDto>>> {
    try {
      NormalizaBody(req.body);

      const validation = ValidataEstructuraCreateBody(req.body);
      if (!validation.valid) {
        return res.status(400).json(respuestaError<TallerCreateResponseDto>(validation.errors?.join("; ") ?? "Body inválido"));
      }

      const created = await this.tallerCommandService.crearTaller(req.body);
      return res.status(201).json(respuestaOk<TallerCreateResponseDto>(created));
    } catch (err: any) {
      if (err.message === "IdComuna no es válido") {
        return res.status(404).json(respuestaError<TallerCreateResponseDto>(err.message));
      }
      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<TallerCreateResponseDto>("ERROR CATCH: " + (err?.message ?? "error interno")));
    }
  }

  public async actualizar(req: Request<{ id: string }, {}, TallerUpdateRequestDto>, res: Response<Respuesta<TallerUpdateResponseDto>>): Promise<Response<Respuesta<TallerUpdateResponseDto>>> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json(respuestaError<TallerUpdateResponseDto>("ID inválido"));
      }

      if (req.body == null) {
        return res.status(404).json(respuestaError<TallerUpdateResponseDto>("No existen datos para actualizar"));
      }

      NormalizaBody(req.body);

      const validation = ValidataEstructuraUpdateBody(req.body);
      if (!validation.valid) {
        return res.status(400).json(respuestaError<TallerUpdateResponseDto>(validation.errors?.join("; ") ?? "Body inválido"));
      }

      const updated = await this.tallerCommandService.actualizarTaller(id, req.body);
      return res.status(200).json(respuestaOk<TallerUpdateResponseDto>(updated));
    } catch (err: any) {
      if (err.message === "Taller no encontrado" || err.message === "IdComuna no es válido") {
        return res.status(404).json(respuestaError<TallerUpdateResponseDto>(err.message));
      }

      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<TallerUpdateResponseDto>("ERROR CATCH: " + (err?.message ?? "error interno")));
    }
  }

  public async eliminar(req: Request, res: Response<Respuesta<string>>): Promise<Response<Respuesta<string>>> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json(respuestaError<string>("ID inválido"));
      }

      const deleted = await this.tallerCommandService.eliminarTaller(id);
      return res.status(200).json(respuestaOk<string>(deleted));
    } catch (err: any) {
      if (err.message === "Taller no encontrado") {
        return res.status(404).json(respuestaError<string>(err.message));
      }

      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<string>("ERROR CATCH: " + (err?.message ?? "error interno")));
    }
  }
}
