export function ValidataEstructuraUpdateBody(body: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== 'object') return { valid: false, errors: ['Body debe ser un objeto'] };

  if (body.Fecha === undefined && body.IdTaller === undefined && body.Servicio === undefined && body.MontoTotal === undefined && body.Boleta === undefined) {
    return { valid: false, errors: ['No hay campos para actualizar'] };
  }

  if (body.Fecha !== undefined && isNaN(new Date(body.Fecha).getTime())) errors.push('Fecha inválida');
  if (body.IdTaller !== undefined && (typeof body.IdTaller !== 'number' || Number.isNaN(body.IdTaller))) errors.push('IdTaller debe ser número');
  if (body.Servicio !== undefined && (typeof body.Servicio !== 'string' || body.Servicio.trim() === '')) errors.push('Servicio inválido');
  if (body.MontoTotal !== undefined && (typeof body.MontoTotal !== 'number' || Number.isNaN(body.MontoTotal))) errors.push('MontoTotal debe ser número');
  if (body.Boleta !== undefined && body.Boleta !== null && typeof body.Boleta !== 'string') errors.push('Boleta inválida');

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}
