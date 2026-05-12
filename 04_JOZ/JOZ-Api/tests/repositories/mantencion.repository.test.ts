import { MantencionQueryRepository } from '../../src/repositories/queries/mantencion.query.repository';

describe('MantencionQueryRepository', () => {
  it('debe exponer métodos básicos', () => {
    const repo = new MantencionQueryRepository();
    expect(typeof repo.findById).toBe('function');
    expect(typeof repo.findByVehiculo).toBe('function');
    expect(typeof repo.findAll).toBe('function');
  });
});
