export function ValidataEstructuraCreateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Body debe ser un objeto"] };
  }

  if (typeof body.Nombre !== "string" || body.Nombre.trim().length === 0) errors.push("Nombre debe ser texto y no vacío");

  if (typeof body.IdComuna !== "number" || Number.isNaN(body.IdComuna)) errors.push("IdComuna debe ser número");

  if (typeof body.Direccion !== "string" || body.Direccion.trim().length === 0) errors.push("Direccion debe ser texto y no vacío");

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
