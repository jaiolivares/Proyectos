import { Taller, TallerPayload } from "../../../src/models/vehiculos/taller";
import { TallerService } from "../../../src/services/vehiculos/taller.service";

describe("TallerService", () => {
  const payload: TallerPayload = {
    Nombre: "Taller Centro",
    IdComuna: 1,
    Direccion: "Av. Siempre Viva 123",
  };

  const taller: Taller = {
    Id: 99,
    ...payload,
  };

  it("fetchAll retorna talleres y tolera respuesta sin Dato", async () => {
    const httpClient = {
      get: vi
        .fn()
        .mockResolvedValueOnce({ data: { Dato: [taller] } })
        .mockResolvedValueOnce({ data: { Dato: null } }),
    };

    const service = new TallerService(httpClient as any);

    await expect(service.fetchAll()).resolves.toEqual([taller]);
    await expect(service.fetchAll()).resolves.toEqual([]);
  });

  it("create retorna el taller creado y propaga mensaje de negocio", async () => {
    const httpClient = {
      post: vi
        .fn()
        .mockResolvedValueOnce({ data: { Dato: taller } })
        .mockResolvedValueOnce({ data: { Dato: null, Mensaje: "Sin taller" } }),
    };

    const service = new TallerService(httpClient as any);

    await expect(service.create(payload)).resolves.toEqual(taller);
    await expect(service.create(payload)).rejects.toThrow("Sin taller");
  });

  it("update retorna el taller actualizado", async () => {
    const httpClient = {
      patch: vi.fn().mockResolvedValue({ data: { Dato: taller } }),
    };

    const service = new TallerService(httpClient as any);

    await expect(service.update(taller.Id, payload)).resolves.toEqual(taller);
  });

  it("remove retorna el mensaje de eliminacion", async () => {
    const httpClient = {
      delete: vi.fn().mockResolvedValue({ data: { Mensaje: "Taller eliminado" } }),
    };

    const service = new TallerService(httpClient as any);

    await expect(service.remove(taller.Id)).resolves.toBe("Taller eliminado");
  });

  it("normaliza los errores de fetch y remove", async () => {
    const fetchClient = {
      get: vi.fn().mockRejectedValue({
        response: {
          data: {
            Mensaje: "Error de carga",
          },
        },
      }),
    };
    const removeClient = {
      delete: vi.fn().mockRejectedValue(new Error("Error de red")),
    };

    await expect(new TallerService(fetchClient as any).fetchAll()).rejects.toThrow("Error de carga");
    await expect(new TallerService(removeClient as any).remove(taller.Id)).rejects.toThrow("Error de red");
  });
});
