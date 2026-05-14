export function ValidataEstructuraUpdateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!body || typeof body !== 'object') return { valid: false, errors: ['Body debe ser un objeto'] };
  if (body.Producto === undefined && body.DetalleProducto === undefined && body.Monto === undefined) return { valid: false, errors: ['No hay campos para actualizar'] };
  if (body.Producto !== undefined && (typeof body.Producto !== 'string' || body.Producto.trim() === '')) errors.push('Producto inválido');
  if (body.DetalleProducto !== undefined && (typeof body.DetalleProducto !== 'string' || body.DetalleProducto.trim() === '')) errors.push('DetalleProducto inválido');
  if (body.Monto !== undefined && (typeof body.Monto !== 'number' || Number.isNaN(body.Monto))) errors.push('Monto debe ser número');
  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
