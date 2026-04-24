export function ValidataEstructuraCreateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Body debe ser un objeto"] };
  }

  if (typeof body.IdMarcaModeloVehiculo !== "number" || Number.isNaN(body.IdMarcaModeloVehiculo)) errors.push("IdMarcaModeloVehiculo debe ser número");

  if (typeof body.Ano !== "number" || !Number.isInteger(body.Ano)) errors.push("Ano debe ser entero");

  if (typeof body.NumeroMotor !== "string" || body.NumeroMotor.trim() === "") errors.push("NumeroMotor es requerido");
  if (typeof body.NumeroChasis !== "string" || body.NumeroChasis.trim() === "") errors.push("NumeroChasis es requerido");
  if (typeof body.Color !== "string" || body.Color.trim() === "") errors.push("Color es requerido");

  // FechaCompra puede llegar como string o Date
  if (!body.FechaCompra) {
    errors.push("FechaCompra es requerida");
  } else {
    const fecha = body.FechaCompra instanceof Date ? body.FechaCompra : new Date(body.FechaCompra);
    if (isNaN(fecha.getTime())) errors.push("FechaCompra no es una fecha válida");
  }

  if (typeof body.MontoCompra !== "number" || Number.isNaN(body.MontoCompra)) errors.push("MontoCompra debe ser número");

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
