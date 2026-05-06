export function ValidataEstructuraUpdateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Body debe ser un objeto"] };
  }

  if (body.Nombre === undefined && body.IdComuna === undefined && body.Direccion === undefined) {
    return { valid: false, errors: ["No hay campos para actualizar"] };
  }

  if (body.Nombre !== undefined && (typeof body.Nombre !== "string" || body.Nombre.trim().length === 0)) errors.push("Nombre debe ser texto y no vacío");

  if (body.IdComuna !== undefined && (typeof body.IdComuna !== "number" || Number.isNaN(body.IdComuna))) errors.push("IdComuna debe ser número");

  if (body.Direccion !== undefined && (typeof body.Direccion !== "string" || body.Direccion.trim().length === 0)) errors.push("Direccion debe ser texto y no vacío");

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
