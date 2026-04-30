import { Request, Response } from "express";
import { ModeloQueryService } from "../../services/queries/vehiculos/modelo/modelo.query.service";
import { ModeloCommandService } from "../../services/commands/vehiculos/modelo/modelo.command.service";
import { ModeloCreateRequestDto } from "../../dtos/vehiculos/modelo/modeloCreateRequest.dto";
import { ModeloCreateResponseDto } from "../../dtos/vehiculos/modelo/modeloCreateResponse.dto";
import { ModeloUpdateRequestDto } from "../../dtos/vehiculos/modelo/modeloUpdateRequest.dto";
import { ModeloUpdateResponseDto } from "../../dtos/vehiculos/modelo/modeloUpdateResponse.dto";
import { ValidataEstructuraCreateBody } from "./validators/modeloCreate.validator";
import { ValidataEstructuraUpdateBody } from "./validators/modeloUpdate.validator";
import { NormalizaBody } from "../../utils/util";
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

  public async crear(req: Request<{}, {}, ModeloCreateRequestDto>, res: Response<Respuesta<ModeloCreateResponseDto>>): Promise<Response<Respuesta<ModeloCreateResponseDto>>> {
    try {
      NormalizaBody(req.body);
      const validation = ValidataEstructuraCreateBody(req.body);

      if (!validation.valid) {
        return res.status(400).json(respuestaError<ModeloCreateResponseDto>(validation.errors?.join('; ') ?? 'Body inválido'));
      }

      const created = await this.modeloCommandService.crearModelo(req.body);
      return res.status(201).json(respuestaOk<ModeloCreateResponseDto>(created));

    } catch (err: any) {
      return res.status(500).json(respuestaError<ModeloCreateResponseDto>(err?.message ?? 'error interno'));
    }
  }

  public async actualizar(req: Request<{ id: string }, {}, ModeloUpdateRequestDto>, res: Response<Respuesta<ModeloUpdateResponseDto>>): Promise<Response<Respuesta<ModeloUpdateResponseDto>>> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id))
        return res.status(400).json(respuestaError<ModeloUpdateResponseDto>("ID inválido"));

      if (req.body == null)
        return res.status(400).json(respuestaError<ModeloUpdateResponseDto>("No existen datos para actualizar"));

      NormalizaBody(req.body);
      const validation = ValidataEstructuraUpdateBody(req.body);

      if (!validation.valid) {
        return res.status(400).json(respuestaError<ModeloUpdateResponseDto>(validation.errors?.join('; ') ?? 'Body inválido'));
      }

      const updated = await this.modeloCommandService.actualizarModelo(id, req.body);
      if (!updated) return res.status(404).json(respuestaError<ModeloUpdateResponseDto>("Modelo no encontrado"));

      return res.status(200).json(respuestaOk<ModeloUpdateResponseDto>(updated));

    } catch (err: any) {
      return res.status(500).json(respuestaError<ModeloUpdateResponseDto>(err?.message ?? 'error interno'));
    }
  }

  public async eliminar(req: Request, res: Response<Respuesta<null>>): Promise<Response<Respuesta<null>>> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id))
        return res.status(400).json(respuestaError<null>("ID inválido"));

      const deleted = await this.modeloCommandService.eliminarModelo(id);
      if (!deleted) return res.status(404).json(respuestaError<null>("Modelo no encontrado"));

      return res.status(200).json(respuestaOk<null>(null));

    } catch (err: any) {
      return res.status(500).json(respuestaError<null>(err?.message ?? 'error interno'));
    }
  }
}
