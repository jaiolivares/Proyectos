export function ValidataEstructuraCreateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Body debe ser un objeto"] };
  }

  if (typeof body.IdMarca !== "number" || Number.isNaN(body.IdMarca)) errors.push("IdMarca debe ser número");

  if (typeof body.IdModeloVehiculo !== "number" || Number.isNaN(body.IdModeloVehiculo)) errors.push("IdModeloVehiculo debe ser número");

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
