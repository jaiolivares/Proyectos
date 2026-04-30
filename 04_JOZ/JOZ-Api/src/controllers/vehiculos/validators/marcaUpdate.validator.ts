export function ValidataEstructuraUpdateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Body debe ser un objeto"] };
  }

  if (body.Marca === undefined && body.Descripcion === undefined) {
    return { valid: false, errors: ["No hay campos para actualizar"] };
  }

  if (body.Marca !== undefined && (typeof body.Marca !== "string" || body.Marca.trim().length === 0)) errors.push("Marca debe ser texto y no vacío");

  if (body.Descripcion !== undefined && typeof body.Descripcion !== "string") errors.push("Descripcion debe ser texto");

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
