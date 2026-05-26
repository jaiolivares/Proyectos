export function ValidataEstructuraUpdateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Body debe ser un objeto"] };
  }

  if (body.IdMarca === undefined && body.IdModelo === undefined) {
    return { valid: false, errors: ["No hay campos para actualizar"] };
  }

  if (body.IdMarca !== undefined && (typeof body.IdMarca !== "number" || Number.isNaN(body.IdMarca))) {
    errors.push("IdMarca debe ser número");
  }

  if (body.IdModelo !== undefined && (typeof body.IdModelo !== "number" || Number.isNaN(body.IdModelo))) {
    errors.push("IdModelo debe ser número");
  }

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
