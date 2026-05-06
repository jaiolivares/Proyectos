import { Request, Response } from "express";
import { TallerCreateRequestDto } from "../../dtos/vehiculos/taller/tallerCreateRequest.dto";
import { TallerCreateResponseDto } from "../../dtos/vehiculos/taller/tallerCreateResponse.dto";
import { TallerUpdateRequestDto } from "../../dtos/vehiculos/taller/tallerUpdateRequest.dto";
import { TallerUpdateResponseDto } from "../../dtos/vehiculos/taller/tallerUpdateResponse.dto";
import { respuestaOk, respuestaError } from "../../dtos/utils/respuesta.dto";
import type { Respuesta } from "../../dtos/utils/respuesta.dto";
import { ValidataEstructuraCreateBody } from "./validators/tallerCreate.validator";
import { ValidataEstructuraUpdateBody } from "./validators/tallerUpdate.validator";
import { NormalizaBody } from "../../utils/util";
import { TallerDto } from "../../dtos/vehiculos/taller/taller.dto";
import { TallerCommandService } from "../../services/commands/vehiculos/taller/taller.command.service";
import { TallerQueryService } from "../../services/queries/vehiculos/taller/taller.query.service";

export class TallerController {
  private commandService: TallerCommandService;
  private queryService: TallerQueryService;

  constructor(commandService: TallerCommandService, queryService: TallerQueryService) {
    this.commandService = commandService;
    this.queryService = queryService;
  }

  public async obtenerTodos(_: Request, res: Response<Respuesta<TallerDto[]>>): Promise<Response<Respuesta<TallerDto[]>>> {
    const items = await this.queryService.obtenerTalleres();

    if (items.length === 0)
      return res.status(404).json(respuestaError<TallerDto[]>("No se encontraron Talleres"));

    return res.status(200).json(respuestaOk<TallerDto[]>(items));
  }

  public async obtenerPorId(req: Request, res: Response<Respuesta<TallerDto>>): Promise<Response<Respuesta<TallerDto>>> {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json(respuestaError<TallerDto>("ID inválido"));

    const found = await this.queryService.obtenerTaller(id);

    if (!found)
      return res.status(404).json(respuestaError<TallerDto>("Taller no encontrado"));

    return res.status(200).json(respuestaOk<TallerDto>(found));
  }

  public async crear(req: Request<{}, {}, TallerCreateRequestDto>, res: Response<Respuesta<TallerCreateResponseDto>>): Promise<Response<Respuesta<TallerCreateResponseDto>>> {
    try {
      NormalizaBody(req.body);
      const validation = ValidataEstructuraCreateBody(req.body);

      if (!validation.valid) {
        return res.status(400).json(respuestaError<TallerCreateResponseDto>(validation.errors?.join('; ') ?? 'Body inválido'));
      }

      const created = await this.commandService.crearTaller(req.body);
      return res.status(201).json(respuestaOk<TallerCreateResponseDto>(created));
      
    } catch (err: any) {
      if (err?.message === 'IdComuna no es válido') {
        return res.status(400).json(respuestaError<TallerCreateResponseDto>(err.message));
      }
      return res.status(500).json(respuestaError<TallerCreateResponseDto>(err?.message ?? 'error interno'));
    }
  }

  public async actualizar(req: Request<{ id: string }, {}, TallerUpdateRequestDto>, res: Response<Respuesta<TallerUpdateResponseDto>>): Promise<Response<Respuesta<TallerUpdateResponseDto>>> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id))
        return res.status(400).json(respuestaError<TallerUpdateResponseDto>("ID inválido"));

      if (req.body == null)
        return res.status(400).json(respuestaError<TallerUpdateResponseDto>("No existen datos para actualizar"));

      NormalizaBody(req.body);
      const validation = ValidataEstructuraUpdateBody(req.body);

      if (!validation.valid) {
        return res.status(400).json(respuestaError<TallerUpdateResponseDto>(validation.errors?.join('; ') ?? 'Body inválido'));
      }

      const updated = await this.commandService.actualizarTaller(id, req.body);
      return res.status(200).json(respuestaOk<TallerUpdateResponseDto>(updated));

    } catch (err: any) {
      if (err?.message === "Taller no encontrado") {
        return res.status(400).json(respuestaError<TallerUpdateResponseDto>(err.message));
      }

      if (err?.message === "IdComuna no es válido") {
        return res.status(400).json(respuestaError<TallerUpdateResponseDto>(err.message));
      }
      return res.status(500).json(respuestaError<TallerUpdateResponseDto>(err?.message ?? "error interno"));
    }
  }

  public async eliminar(req: Request, res: Response<Respuesta<string>>): Promise<Response<Respuesta<string>>> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id))
        return res.status(400).json(respuestaError<string>("ID inválido"));

      const deleted = await this.commandService.eliminarTaller(id);
      
      return res.status(200).json(respuestaOk<string>(deleted));

    } catch (err: any) {
      if (err?.message === "Taller no encontrado") {
        return res.status(400).json(respuestaError<string>(err.message));
      }
      return res.status(500).json(respuestaError<string>(err?.message ?? "error interno"));
    }
  }
}
