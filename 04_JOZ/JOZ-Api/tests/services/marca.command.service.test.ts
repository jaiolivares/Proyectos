import { MarcaCommandService } from "../../src/services/commands/vehiculos/marca/marca.command.service";

describe("MarcaCommandService", () => {
  const crearMarca = jest.fn();
  const actualizarMarca = jest.fn();
  const eliminarMarca = jest.fn();
  const obtenerMarca = jest.fn();

  const buildService = () => new MarcaCommandService({ crearMarca, actualizarMarca, eliminarMarca } as any, { obtenerMarca } as any);

  beforeEach(() => {
    crearMarca.mockReset();
    actualizarMarca.mockReset();
    eliminarMarca.mockReset();
    obtenerMarca.mockReset();
  });

  it("crea una marca", async () => {
    const body = { Marca: "Toyota", Descripcion: "Japon" };
    crearMarca.mockResolvedValue({ Id: 1, ...body });

    const result = await buildService().crearMarca(body);

    expect(crearMarca).toHaveBeenCalledWith(body);
    expect(result).toEqual({ Id: 1, ...body });
  });

  it("retorna null al actualizar si la marca no existe", async () => {
    obtenerMarca.mockResolvedValue(null);

    const result = await buildService().actualizarMarca(1, { Marca: "Mazda" } as any);

    expect(actualizarMarca).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("elimina solo si la marca existe", async () => {
    obtenerMarca.mockResolvedValue({ Id: 1 });
    eliminarMarca.mockResolvedValue(true);

    const result = await buildService().eliminarMarca(1);

    expect(eliminarMarca).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });
});
