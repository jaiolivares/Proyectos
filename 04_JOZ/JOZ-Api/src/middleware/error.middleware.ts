import { Request, Response, NextFunction } from 'express';
import { respuestaError } from "../dtos/utils/respuesta.dto";
import { ErrorApiCommandService } from '../services/commands/errors/errorApi/errorApi.command.service';

const errorApiCommandService = new ErrorApiCommandService();

export const errorMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = Number.isInteger(err?.statusCode) ? err.statusCode : Number.isInteger(err?.status) ? err.status : 500;

    console.error(err?.stack || err);

    try {
        await errorApiCommandService.registrarError(err, req);
    } catch (persistError) {
        console.error('No fue posible registrar ErrorApi:', persistError);
    }

    res.status(statusCode).json(respuestaError<null>(err?.message || 'MIDDLEWARE => Internal Server Error'));
};