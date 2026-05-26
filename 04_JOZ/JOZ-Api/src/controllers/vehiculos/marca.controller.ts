import { Request, Response } from "express";
import type { Respuesta } from "../../dtos/utils/respuesta.dto";
import { respuestaError, respuestaOk } from "../../dtos/utils/respuesta.dto";
import { MarcaDto } from "../../dtos/vehiculos/marca/marca.dto";
import { MarcaCreateRequestDto } from "../../dtos/vehiculos/marca/marcaCreateRequest.dto";
import { MarcaCreateResponseDto } from "../../dtos/vehiculos/marca/marcaCreateResponse.dto";
import { MarcaUpdateRequestDto } from "../../dtos/vehiculos/marca/marcaUpdateRequest.dto";
import { MarcaUpdateResponseDto } from "../../dtos/vehiculos/marca/marcaUpdateResponse.dto";
import { errorMiddleware } from "../../middleware/error.middleware";
import { MarcaCommandService } from "../../services/commands/vehiculos/marca/marca.command.service";
import { MarcaQueryService } from "../../services/queries/vehiculos/marca/marca.query.service";
import { NormalizaBody } from "../../utils/util";
import { ValidataEstructuraCreateBody } from "./validators/marcaCreate.validator";
import { ValidataEstructuraUpdateBody } from "./validators/marcaUpdate.validator";

export class MarcaController {
  private marcaCommandService: MarcaCommandService;
  private marcaQueryService: MarcaQueryService;

  constructor(marcaCommandService: MarcaCommandService, marcaQueryService: MarcaQueryService) {
    this.marcaCommandService = marcaCommandService;
    this.marcaQueryService = marcaQueryService;
  }

  public async obtenerTodos(_: Request, res: Response<Respuesta<MarcaDto[]>>): Promise<Response<Respuesta<MarcaDto[]>>> {
    const items = await this.marcaQueryService.obtenerMarcas();

    if (items.length === 0) {
      return res.status(404).json(respuestaError<MarcaDto[]>("No se encontraron Marcas"));
    }

    return res.status(200).json(respuestaOk<MarcaDto[]>(items));
  }

  public async obtenerPorId(req: Request, res: Response<Respuesta<MarcaDto>>): Promise<Response<Respuesta<MarcaDto>>> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(respuestaError<MarcaDto>("ID inválido"));
    }

    const found = await this.marcaQueryService.obtenerMarca(id);
    if (!found) {
      return res.status(404).json(respuestaError<MarcaDto>("Marca no encontrada"));
    }

    return res.status(200).json(respuestaOk<MarcaDto>(found));
  }

  public async crear(req: Request<{}, {}, MarcaCreateRequestDto>, res: Response<Respuesta<MarcaCreateResponseDto>>): Promise<Response<Respuesta<MarcaCreateResponseDto>>> {
    try {
      NormalizaBody(req.body);

      const validation = ValidataEstructuraCreateBody(req.body);
      if (!validation.valid) {
        return res.status(400).json(respuestaError<MarcaCreateResponseDto>(validation.errors?.join("; ") ?? "Body inválido"));
      }

      const created = await this.marcaCommandService.crearMarca(req.body);
      return res.status(201).json(respuestaOk<MarcaCreateResponseDto>(created));
    } catch (err: any) {
      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<MarcaCreateResponseDto>("ERROR CATCH: " + (err?.message ?? "error interno")));
    }
  }

  public async actualizar(req: Request<{ id: string }, {}, MarcaUpdateRequestDto>, res: Response<Respuesta<MarcaUpdateResponseDto>>): Promise<Response<Respuesta<MarcaUpdateResponseDto>>> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json(respuestaError<MarcaUpdateResponseDto>("ID inválido"));
      }

      if (req.body == null) {
        return res.status(400).json(respuestaError<MarcaUpdateResponseDto>("No existen datos para actualizar"));
      }

      NormalizaBody(req.body);

      const validation = ValidataEstructuraUpdateBody(req.body);
      if (!validation.valid) {
        return res.status(400).json(respuestaError<MarcaUpdateResponseDto>(validation.errors?.join("; ") ?? "Body inválido"));
      }

      const updated = await this.marcaCommandService.actualizarMarca(id, req.body);
      return res.status(200).json(respuestaOk<MarcaUpdateResponseDto>(updated));
    } catch (err: any) {
      if (err.message === "Marca no encontrada") {
        return res.status(404).json(respuestaError<MarcaUpdateResponseDto>(err.message));
      }

      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<MarcaUpdateResponseDto>("ERROR CATCH: " + (err?.message ?? "error interno")));
    }
  }

  public async eliminar(req: Request, res: Response<Respuesta<string>>): Promise<Response<Respuesta<string>>> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json(respuestaError<string>("ID inválido"));
      }

      const deleted = await this.marcaCommandService.eliminarMarca(id);
      return res.status(200).json(respuestaOk<string>(deleted));
    } catch (err: any) {
      if (err.message === "Marca no encontrada") {
        return res.status(404).json(respuestaError<string>(err.message));
      }

      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<string>("ERROR CATCH: " + (err?.message ?? "error interno")));
    }
  }
}
