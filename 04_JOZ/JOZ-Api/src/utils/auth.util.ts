import { Response } from "express";

export function ObtenerIdUsuarioDesdeLocals(res: Response): number | null {
  const idUsuario = Number((res.locals.auth as any)?.Id);

  if (!idUsuario || isNaN(idUsuario)) {
    return null;
  }

  return idUsuario;
}
