import { Request, Response } from "express";
import { ComunaDto } from "../../dtos/ubicaciones/comuna/comuna.dto";
import type { Respuesta } from "../../dtos/utils/respuesta.dto";
import { respuestaError, respuestaOk } from "../../dtos/utils/respuesta.dto";
import { ComunaQueryService } from "../../services/queries/ubicaciones/comuna/comuna.query.service";

export class ComunaController {
  private comunaQueryService: ComunaQueryService;

  constructor(comunaQueryService: ComunaQueryService) {
    this.comunaQueryService = comunaQueryService;
  }

  public async obtenerTodos(_: Request, res: Response<Respuesta<ComunaDto[]>>): Promise<Response<Respuesta<ComunaDto[]>>> {
    const comunas = await this.comunaQueryService.obtenerComunas();

    if (comunas.length === 0) {
      return res.status(404).json(respuestaError<ComunaDto[]>("No se encontraron Comunas"));
    }

    return res.status(200).json(respuestaOk<ComunaDto[]>(comunas));
  }

  public async obtenerPorId(req: Request, res: Response<Respuesta<ComunaDto>>): Promise<Response<Respuesta<ComunaDto>>> {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json(respuestaError<ComunaDto>("ID inválido"));
    }

    const comuna = await this.comunaQueryService.obtenerComuna(id);

    if (!comuna) {
      return res.status(404).json(respuestaError<ComunaDto>("Comuna no encontrada"));
    }

    return res.status(200).json(respuestaOk<ComunaDto>(comuna));
  }
}