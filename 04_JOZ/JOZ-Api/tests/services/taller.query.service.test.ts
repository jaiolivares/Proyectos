import { TallerQueryService } from "../../src/services/queries/vehiculos/taller/taller.query.service";

describe("TallerQueryService", () => {
  const obtenerTaller = jest.fn();
  const obtenerTalleres = jest.fn();

  const buildService = () =>
    new TallerQueryService({
      obtenerTaller,
      obtenerTalleres,
    } as any);

  beforeEach(() => {
    obtenerTaller.mockReset();
    obtenerTalleres.mockReset();
  });

  it("retorna null cuando el taller no existe", async () => {
    obtenerTaller.mockResolvedValue(null);

    const result = await buildService().obtenerTaller(99);

    expect(result).toBeNull();
  });

  it("mapea correctamente un taller", async () => {
    obtenerTaller.mockResolvedValue({ Id: 8, Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" });

    const result = await buildService().obtenerTaller(8);

    expect(result).toEqual({ Id: 8, Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" });
  });

  it("mapea una lista de talleres", async () => {
    obtenerTalleres.mockResolvedValue([{ Id: 8, Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" }]);

    const result = await buildService().obtenerTalleres();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ Id: 8, Nombre: "Taller Norte", IdComuna: 4, Direccion: "Av. Siempre Viva 123" });
  });
});