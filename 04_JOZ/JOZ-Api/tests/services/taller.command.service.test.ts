/// <reference types="jest" />
import { TallerCommandService } from "../../src/services/commands/vehiculos/taller/taller.command.service";

describe("TallerCommandService", () => {
  const crearTaller = jest.fn();
  const actualizarTaller = jest.fn();
  const eliminarTaller = jest.fn();
  const obtenerTaller = jest.fn();
  const obtenerComuna = jest.fn();

  const buildService = () =>
    new TallerCommandService(
      {
        crearTaller,
        actualizarTaller,
        eliminarTaller,
      } as any,
      {
        obtenerTaller,
      } as any,
      {
        obtenerComuna,
      } as any
    );

  const requestBody = {
    Nombre: "Taller Norte",
    IdComuna: 4,
    Direccion: "Av. Siempre Viva 123",
  };

  beforeEach(() => {
    crearTaller.mockReset();
    actualizarTaller.mockReset();
    eliminarTaller.mockReset();
    obtenerTaller.mockReset();
    obtenerComuna.mockReset();
  });

  it("lanza error al crear cuando la comuna no existe", async () => {
    obtenerComuna.mockResolvedValue(null);

    await expect(buildService().crearTaller(requestBody as any)).rejects.toThrow("IdComuna no es válido");
    expect(crearTaller).not.toHaveBeenCalled();
  });

  it("mapea la respuesta cuando crea un taller válido", async () => {
    obtenerComuna.mockResolvedValue({ Id: 4 });
    crearTaller.mockResolvedValue({ Id: 8, Nombre: "Taller Norte", Direccion: "Av. Siempre Viva 123", IdComuna: 4 });

    const result = await buildService().crearTaller(requestBody as any);

    expect(crearTaller).toHaveBeenCalledWith(requestBody);
    expect(result).toEqual({ Id: 8, Nombre: "Taller Norte", Direccion: "Av. Siempre Viva 123", IdComuna: 4 });
  });

  it("lanza error al actualizar cuando el taller no existe", async () => {
    obtenerTaller.mockResolvedValue(null);

    await expect(buildService().actualizarTaller(8, requestBody as any)).rejects.toThrow("Taller no encontrado");
    expect(actualizarTaller).not.toHaveBeenCalled();
  });

  it("lanza error al actualizar cuando la comuna no es válida", async () => {
    obtenerTaller.mockResolvedValue({ Id: 8 });
    obtenerComuna.mockResolvedValue(null);

    await expect(buildService().actualizarTaller(8, requestBody as any)).rejects.toThrow("IdComuna no es válido");
    expect(actualizarTaller).not.toHaveBeenCalled();
  });

  it("elimina cuando el taller existe", async () => {
    obtenerTaller.mockResolvedValue({ Id: 8 });
    eliminarTaller.mockResolvedValue("Taller eliminado correctamente");

    const result = await buildService().eliminarTaller(8);

    expect(eliminarTaller).toHaveBeenCalledWith(8);
    expect(result).toBe("Taller eliminado correctamente");
  });
});