export function ValidataEstructuraCreateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Body debe ser un objeto"] };
  }

  if (typeof body.IdTipoVehiculo !== "number" || Number.isNaN(body.IdTipoVehiculo)) errors.push("IdTipoVehiculo debe ser número");

  if (typeof body.Modelo !== "string" || body.Modelo.trim().length === 0) errors.push("Modelo debe ser texto y no vacío");

  if (body.Descripcion !== undefined && typeof body.Descripcion !== "string") errors.push("Descripcion debe ser texto");

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
