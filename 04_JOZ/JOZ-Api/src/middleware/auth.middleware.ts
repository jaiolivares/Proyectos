import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { respuestaError } from "../dtos/utils/respuesta.dto";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json(respuestaError<null>("Token de acceso requerido"));
  }

  const [scheme, token] = authorizationHeader.trim().split(/\s+/);

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return res.status(401).json(respuestaError<null>("Token de acceso inválido"));
  }

  try {
    res.locals.auth = jwt.verify(token, config.jwt.secret as jwt.Secret);
    next();
  } catch {
    return res.status(401).json(respuestaError<null>("ERROR: Token de acceso inválido"));
  }
};
