import { MantencionQueryService } from "../../src/services/queries/vehiculos/mantencion/mantencion.query.service";

describe("MantencionQueryService", () => {
  const obtenerMantencion = jest.fn();
  const obtenerMantenciones = jest.fn();

  const buildService = () => new MantencionQueryService({ obtenerMantencion, obtenerMantenciones } as any);

  beforeEach(() => {
    obtenerMantencion.mockReset();
    obtenerMantenciones.mockReset();
  });

  it("retorna null cuando no existe", async () => {
    obtenerMantencion.mockResolvedValue(null);
    const result = await buildService().obtenerMantencion(99);
    expect(result).toBeNull();
  });

  it("mapea correctamente una mantencion", async () => {
    obtenerMantencion.mockResolvedValue({ Id: 1, IdVehiculo: 2, Fecha: new Date(), IdTaller: 3, Servicio: "S", MontoTotal: 1000, Boleta: null, IdUsuario: 4 });
    const result = await buildService().obtenerMantencion(1);
    expect(result).toBeTruthy();
    expect(result?.Id).toBe(1);
  });

  it("mapea lista", async () => {
    obtenerMantenciones.mockResolvedValue([{ Id: 1, IdVehiculo: 2, Fecha: new Date(), IdTaller: 3, Servicio: "S", MontoTotal: 1000, Boleta: null, IdUsuario: 4 }]);
    const result = await buildService().obtenerMantenciones();
    expect(result).toHaveLength(1);
  });
});
