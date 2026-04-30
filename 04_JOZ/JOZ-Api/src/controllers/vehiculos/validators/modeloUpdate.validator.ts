export function ValidataEstructuraUpdateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Body debe ser un objeto"] };
  }

  if (body.IdTipoVehiculo === undefined && body.Modelo === undefined && body.Descripcion === undefined) {
    return { valid: false, errors: ["No hay campos para actualizar"] };
  }

  if (body.IdTipoVehiculo !== undefined && (typeof body.IdTipoVehiculo !== "number" || Number.isNaN(body.IdTipoVehiculo))) errors.push("IdTipoVehiculo debe ser número");

  if (body.Modelo !== undefined && (typeof body.Modelo !== "string" || body.Modelo.trim().length === 0)) errors.push("Modelo debe ser texto y no vacío");

  if (body.Descripcion !== undefined && typeof body.Descripcion !== "string") errors.push("Descripcion debe ser texto");

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
