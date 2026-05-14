import { MantencionQueryService } from "../../src/services/queries/vehiculos/mantencion/mantencion.query.service";

describe("MantencionQueryService", () => {
  it("debe instanciarse y exponer métodos", async () => {
    const service = new MantencionQueryService();
    expect(typeof service.obtenerMantencion).toBe("function");
    expect(typeof service.obtenerMantenciones).toBe("function");
  });
});
