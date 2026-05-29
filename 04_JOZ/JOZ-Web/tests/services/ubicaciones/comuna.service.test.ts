import { Comuna } from "../../../src/models/ubicaciones/comuna";
import { ComunaService } from "../../../src/services/ubicaciones/comuna.service";

describe("ComunaService", () => {
  const comunas: Comuna[] = [
    {
      Id: 1,
      IdCiudad: 10,
      Codigo: "STG",
      Descripcion: "Santiago",
    },
  ];

  it("retorna la lista de comunas cuando la API trae datos", async () => {
    const httpClient = {
      get: vi.fn().mockResolvedValue({
        data: {
          Dato: comunas,
        },
      }),
    };

    const service = new ComunaService(httpClient as any);

    await expect(service.fetchAll()).resolves.toEqual(comunas);
  });

  it("retorna arreglo vacio cuando la API responde 404", async () => {
    const httpClient = {
      get: vi.fn().mockRejectedValue({
        response: {
          status: 404,
        },
      }),
    };

    const service = new ComunaService(httpClient as any);

    await expect(service.fetchAll()).resolves.toEqual([]);
  });

  it("normaliza el error cuando la carga falla", async () => {
    const httpClient = {
      get: vi.fn().mockRejectedValue({
        response: {
          data: {
            Mensaje: "Servicio no disponible",
          },
        },
      }),
    };

    const service = new ComunaService(httpClient as any);

    await expect(service.fetchAll()).rejects.toThrow("Servicio no disponible");
  });
});
