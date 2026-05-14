export function ValidataEstructuraCreateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Body debe ser un objeto"] };
  }

  if (typeof body.IdMantencion !== "number" || Number.isNaN(body.IdMantencion)) {
    errors.push("IdMantencion debe ser número");
  }

  if (typeof body.Producto !== "string" || body.Producto.trim() === "") {
    errors.push("Producto inválido");
  }

  if (typeof body.DetalleProducto !== "string" || body.DetalleProducto.trim() === "") {
    errors.push("DetalleProducto inválido");
  }

  if (typeof body.Monto !== "number" || Number.isNaN(body.Monto)) {
    errors.push("Monto debe ser número");
  }

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
