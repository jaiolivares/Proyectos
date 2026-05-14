import { MantencionDetalleQueryService } from "../../src/services/queries/vehiculos/mantencionDetalle/mantencionDetalle.query.service";

describe("MantencionDetalleQueryService", () => {
  const obtenerMantencionDetalle = jest.fn();
  const obtenerMantencionDetalles = jest.fn();

  const buildService = () => new MantencionDetalleQueryService({ obtenerMantencionDetalle, obtenerMantencionDetalles } as any);

  beforeEach(() => {
    obtenerMantencionDetalle.mockReset();
    obtenerMantencionDetalles.mockReset();
  });

  it("retorna null cuando no existe", async () => {
    obtenerMantencionDetalle.mockResolvedValue(null);
    const result = await buildService().obtenerMantencionDetalle(99);
    expect(result).toBeNull();
  });

  it("mapea correctamente un detalle", async () => {
    obtenerMantencionDetalle.mockResolvedValue({ Id: 1, IdMantencion: 2, Producto: "P", DetalleProducto: "D", Monto: 500 });
    const result = await buildService().obtenerMantencionDetalle(1);
    expect(result).toBeTruthy();
    expect(result?.Id).toBe(1);
  });

  it("mapea lista", async () => {
    obtenerMantencionDetalles.mockResolvedValue([{ Id: 1, IdMantencion: 2, Producto: "P", DetalleProducto: "D", Monto: 500 }]);
    const result = await buildService().obtenerMantencionDetalles();
    expect(result).toHaveLength(1);
  });
});
