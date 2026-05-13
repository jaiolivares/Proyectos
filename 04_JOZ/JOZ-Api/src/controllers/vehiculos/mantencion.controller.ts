import { Request, Response } from 'express';
import { MantencionQueryService } from '../../services/queries/vehiculos/mantencion/mantencion.query.service';
import { MantencionCommandService } from '../../services/commands/vehiculos/mantencion/mantencion.command.service';
import { MantencionCreateRequestDto } from '../../dtos/vehiculos/mantencion/mantencionCreateRequest.dto';
import { MantencionCreateResponseDto } from '../../dtos/vehiculos/mantencion/mantencionCreateResponse.dto';
import { MantencionUpdateRequestDto } from '../../dtos/vehiculos/mantencion/mantencionUpdateRequest.dto';
import { MantencionUpdateResponseDto } from '../../dtos/vehiculos/mantencion/mantencionUpdateResponse.dto';
import { NormalizaBody } from '../../utils/util';
import { obtenerIdUsuarioDesdeLocals } from '../../utils/auth.util';
import { ValidataEstructuraCreateBody } from './validators/mantencionCreate.validator';
import { ValidataEstructuraUpdateBody } from './validators/mantencionUpdate.validator';
import { respuestaOk, respuestaError } from '../../dtos/utils/respuesta.dto';
import type { Respuesta } from '../../dtos/utils/respuesta.dto';
import { MantencionDto } from '../../dtos/vehiculos/mantencion/mantencion.dto';
import { errorMiddleware } from '../../middleware/error.middleware';

export class MantencionController {
  private mantencionQueryService: MantencionQueryService;
  private mantencionCommandService: MantencionCommandService;

  constructor(mantencionCommandService: MantencionCommandService, mantencionQueryService: MantencionQueryService) {
    this.mantencionCommandService = mantencionCommandService;
    this.mantencionQueryService = mantencionQueryService;
  }

  public async obtenerTodos(_: Request, res: Response<Respuesta<MantencionDto[]>>): Promise<Response<Respuesta<MantencionDto[]>>> {
    const items = await this.mantencionQueryService.obtenerMantenciones();

    if (items.length === 0) 
    	return res.status(404).json(respuestaError<MantencionDto[]>('No se encontraron mantenciones'));
    
    return res.status(200).json(respuestaOk<MantencionDto[]>(items));
  }

  public async obtenerPorId(req: Request, res: Response<Respuesta<MantencionDto>>): Promise<Response<Respuesta<MantencionDto>>> {
    const id = Number(req.params.id);
    if (isNaN(id)) 
    	return res.status(400).json(respuestaError<MantencionDto>('ID inválido'));
    
    const found = await this.mantencionQueryService.obtenerMantencion(id);
    
    if (!found) 
    	return res.status(404).json(respuestaError<MantencionDto>('Mantención no encontrada'));
    
    return res.status(200).json(respuestaOk<MantencionDto>(found));
  }

  public async crear(req: Request<{}, {}, MantencionCreateRequestDto>, res: Response<Respuesta<MantencionCreateResponseDto>>): Promise<Response<Respuesta<MantencionCreateResponseDto>>> {
    try {
      NormalizaBody(req.body);
      const validation = ValidataEstructuraCreateBody(req.body);

      if (!validation.valid) 
      	return res.status(400).json(respuestaError<MantencionCreateResponseDto>(validation.errors?.join('; ') ?? 'Body inválido'));

      const idUsuario = obtenerIdUsuarioDesdeLocals(res);
      const idUsuario = obtenerIdUsuarioDesdeLocals(res);
      const idUsuario = obtenerIdUsuarioDesdeLocals(res);
      const idUsuario = obtenerIdUsuarioDesdeLocals(res);


      console.log("usuario LOGUEADO (ID): ", idUsuario);

      if (!idUsuario)
        return res.status(401).json(respuestaError<MantencionCreateResponseDto>('IdUsuario no presente en token'));

      const created = await this.mantencionCommandService.crearMantencion(req.body, idUsuario);
      return res.status(201).json(respuestaOk<MantencionCreateResponseDto>(created));
    } catch (err: any) {

      if (err?.message === "IdVehiculo no es válido") {
        return res.status(400).json(respuestaError<MantencionCreateResponseDto>(err.message));
      }

      if (err?.message === "IdTaller no es válido") {
        return res.status(400).json(respuestaError<MantencionCreateResponseDto>(err.message));
      }

      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<MantencionCreateResponseDto>('ERROR CATCH: ' + (err?.message ?? 'error interno')));
    }
  }

  public async actualizar(req: Request<{ id: string }, {}, MantencionUpdateRequestDto>, res: Response<Respuesta<MantencionUpdateResponseDto>>): Promise<Response<Respuesta<MantencionUpdateResponseDto>>> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) 
      	return res.status(400).json(respuestaError<MantencionUpdateResponseDto>('ID inválido'));
      if (req.body == null) 
      	return res.status(400).json(respuestaError<MantencionUpdateResponseDto>('No existen datos para actualizar'));
      
      NormalizaBody(req.body);
      const validation = ValidataEstructuraUpdateBody(req.body);
      if (!validation.valid) 
      	return res.status(400).json(respuestaError<MantencionUpdateResponseDto>(validation.errors?.join('; ') ?? 'Body inválido'));

      const updated = await this.mantencionCommandService.actualizarMantencion(id, req.body);
      if (!updated) 
      	return res.status(404).json(respuestaError<MantencionUpdateResponseDto>('Mantención no encontrada'));

      return res.status(200).json(respuestaOk<MantencionUpdateResponseDto>(updated));
    } catch (err: any) {
      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<MantencionUpdateResponseDto>('ERROR CATCH: ' + (err?.message ?? 'error interno')));
    }
  }

  public async eliminar(req: Request, res: Response<Respuesta<null>>): Promise<Response<Respuesta<null>>> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id))
      	return res.status(400).json(respuestaError<null>('ID inválido'));
      
      const deleted = await this.mantencionCommandService.eliminarMantencion(id);
      if (!deleted)
      	return res.status(404).json(respuestaError<null>('Mantención no encontrada'));

      return res.status(200).json(respuestaOk<null>(null));
    } catch (err: any) {
      errorMiddleware(err, req, res, () => {}, true);
      return res.status(500).json(respuestaError<null>('ERROR CATCH: ' + (err?.message ?? 'error interno')));
    }
  }

}