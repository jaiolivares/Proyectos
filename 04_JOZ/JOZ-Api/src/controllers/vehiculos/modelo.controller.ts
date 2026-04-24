import { Request, Response } from "express";
import { ModeloQueryService } from "../../services/queries/vehiculos/modelo/modelo.query.service";
import { ModeloCommandService } from "../../services/commands/vehiculos/modelo/modelo.command.service";
import { respuestaOk, respuestaError } from "../../dtos/utils/respuesta.dto";
import type { Respuesta } from "../../dtos/utils/respuesta.dto";
import { ModeloDto } from "../../dtos/vehiculos/modelo/modelo.dto";

export class ModeloController {
  private modeloQueryService: ModeloQueryService;
  private modeloCommandService: ModeloCommandService;

  constructor(modeloCommandService: ModeloCommandService, modeloQueryService: ModeloQueryService) {
    this.modeloCommandService = modeloCommandService;
    this.modeloQueryService = modeloQueryService;
  }

  public async obtenerTodos(_: Request, res: Response<Respuesta<ModeloDto[]>>): Promise<Response<Respuesta<ModeloDto[]>>> {
    const items = await this.modeloQueryService.obtenerModelos();
    if (items.length === 0) return res.status(404).json(respuestaError<ModeloDto[]>("No se encontraron Modelos"));
    return res.status(200).json(respuestaOk<ModeloDto[]>(items));
  }

  public async obtenerPorId(req: Request, res: Response<Respuesta<ModeloDto>>): Promise<Response<Respuesta<ModeloDto>>> {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(respuestaError<ModeloDto>("ID inválido"));

    const found = await this.modeloQueryService.obtenerModelo(id);
    if (!found) return res.status(404).json(respuestaError<ModeloDto>("Modelo no encontrado"));
    return res.status(200).json(respuestaOk<ModeloDto>(found));
  }

  public async crear(req: Request<{}, {}, any>, res: Response<Respuesta<any>>): Promise<Response<Respuesta<any>>> {
    const created = await this.modeloCommandService.crearModelo(req.body);
    return res.status(201).json(respuestaOk<any>(created));
  }

  public async actualizar(req: Request<{ id: string }, {}, any>, res: Response<Respuesta<any>>): Promise<Response<Respuesta<any>>> {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(respuestaError<any>("ID inválido"));

    const updated = await this.modeloCommandService.actualizarModelo(id, req.body);
    if (!updated) return res.status(404).json(respuestaError<any>("Modelo no encontrado"));
    return res.status(200).json(respuestaOk<any>(updated));
  }

  public async eliminar(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(respuestaError<null>("ID inválido"));

    const deleted = await this.modeloCommandService.eliminarModelo(id);
    if (!deleted) return res.status(404).json(respuestaError<null>("Modelo no encontrado"));
    return res.status(204).send();
  }
}
