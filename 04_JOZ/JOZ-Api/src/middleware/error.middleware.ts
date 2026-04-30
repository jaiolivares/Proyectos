import { Request, Response, NextFunction } from 'express';
import { respuestaError } from "../dtos/utils/respuesta.dto";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err?.stack || err);
    res.status(500).json(respuestaError<null>(err?.message || 'MIDDLEWARE => Internal Server Error'));
};