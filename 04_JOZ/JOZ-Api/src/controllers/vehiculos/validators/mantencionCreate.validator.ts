export function ValidataEstructuraCreateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") return { valid: false, errors: ["Body debe ser un objeto"] };

  if (typeof body.IdVehiculo !== "number" || Number.isNaN(body.IdVehiculo)) {
    errors.push("IdVehiculo debe ser número");
  }

  if (!body.Fecha || isNaN(new Date(body.Fecha).getTime())) {
    errors.push("Fecha inválida");
  }

  if (typeof body.IdTaller !== "number" || Number.isNaN(body.IdTaller)) {
    errors.push("IdTaller debe ser número");
  }

  if (typeof body.Servicio !== "string" || body.Servicio.trim() === "") {
    errors.push("Servicio inválido");
  }

  if (typeof body.MontoTotal !== "number" || Number.isNaN(body.MontoTotal)) {
    errors.push("MontoTotal debe ser número");
  }

  if (typeof body.IdUsuario !== "number" || Number.isNaN(body.IdUsuario)) {
    errors.push("IdUsuario debe ser número");
  }

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
