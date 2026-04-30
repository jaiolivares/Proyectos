export function ValidataEstructuraUpdateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Body debe ser un objeto"] };
  }

  if (body.IdMarca === undefined && body.IdModeloVehiculo === undefined) {
    return { valid: false, errors: ["No hay campos para actualizar"] };
  }

  if (body.IdMarca !== undefined && (typeof body.IdMarca !== "number" || Number.isNaN(body.IdMarca))) errors.push("IdMarca debe ser número");

  if (body.IdModeloVehiculo !== undefined && (typeof body.IdModeloVehiculo !== "number" || Number.isNaN(body.IdModeloVehiculo))) errors.push("IdModeloVehiculo debe ser número");

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
