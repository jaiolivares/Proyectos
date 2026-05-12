import { MantencionQueryService } from '../../src/services/queries/mantencion.query.service';

describe('MantencionQueryService', () => {
  it('debe instanciarse y exponer métodos', async () => {
    const service = new MantencionQueryService();
    expect(typeof service.getById).toBe('function');
    expect(typeof service.getByVehiculo).toBe('function');
    expect(typeof service.listAll).toBe('function');
  });
});
