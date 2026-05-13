import { MantencionQueryRepository } from '../../src/repositories/queries/vehiculos/mantencion/mantencion.query.repository';

describe('MantencionQueryRepository', () => {
  it('debe exponer métodos básicos', () => {
    const repo = new MantencionQueryRepository();
    expect(typeof repo.obtenerMantencion).toBe('function');
    expect(typeof repo.obtenerMantenciones).toBe('function');
  });
});
