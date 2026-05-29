import { act, renderHook, waitFor } from "@testing-library/react";
import { useTalleresCrud } from "../../src/hooks/useTalleresCrud";
import { Taller, TallerPayload } from "../../src/models/vehiculos/taller";
import { ITallerService } from "../../src/services/vehiculos/taller.service";

describe("useTalleresCrud", () => {
  const talleresBase: Taller[] = [
    { Id: 1, Nombre: "Taller Norte", IdComuna: 1, Direccion: "Dirección 1" },
    { Id: 3, Nombre: "Taller Sur", IdComuna: 2, Direccion: "Dirección 3" },
    { Id: 2, Nombre: "Taller Centro", IdComuna: 3, Direccion: "Dirección 2" },
  ];

  const nuevoPayload: TallerPayload = {
    Nombre: "Taller Nuevo",
    IdComuna: 4,
    Direccion: "Dirección nueva",
  };

  function createServiceMock(overrides: Partial<ITallerService> = {}): ITallerService {
    return {
      fetchAll: vi.fn().mockResolvedValue(talleresBase),
      create: vi.fn().mockResolvedValue({ Id: 4, ...nuevoPayload }),
      update: vi.fn().mockImplementation(async (id: number, payload: TallerPayload) => ({ Id: id, ...payload })),
      remove: vi.fn().mockResolvedValue("Taller eliminado correctamente."),
      ...overrides,
    };
  }

  it("carga talleres ordenados descendentemente al iniciar", async () => {
    const service = createServiceMock();

    const { result } = renderHook(() => useTalleresCrud(service));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(service.fetchAll).toHaveBeenCalledTimes(1);
    expect(result.current.talleres.map((item) => item.Id)).toEqual([3, 2, 1]);
    expect(result.current.error).toBeNull();
  });

  it("expone error cuando falla la carga inicial", async () => {
    const service = createServiceMock({
      fetchAll: vi.fn().mockRejectedValue(new Error("Carga fallida")),
    });

    const { result } = renderHook(() => useTalleresCrud(service));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Carga fallida");
    });

    expect(result.current.talleres).toEqual([]);
  });

  it("crea talleres, cierra el formulario y publica mensaje de éxito", async () => {
    const service = createServiceMock();
    const { result } = renderHook(() => useTalleresCrud(service));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.openCreateForm();
    });

    expect(result.current.formOpen).toBe(true);
    expect(result.current.formMode).toBe("create");

    await act(async () => {
      await result.current.submitForm(nuevoPayload);
    });

    expect(service.create).toHaveBeenCalledWith(nuevoPayload);
    expect(result.current.talleres.map((item) => item.Id)).toEqual([4, 3, 2, 1]);
    expect(result.current.success).toBe("Taller Taller Nuevo creado correctamente.");
    expect(result.current.formOpen).toBe(false);
    expect(result.current.selectedTaller).toBeNull();
  });

  it("actualiza talleres existentes y confirma el mensaje de éxito", async () => {
    const service = createServiceMock();
    const { result } = renderHook(() => useTalleresCrud(service));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const original = talleresBase[0];
    const updatedPayload: TallerPayload = {
      Nombre: "Taller Norte Editado",
      IdComuna: 1,
      Direccion: "Dirección editada",
    };

    act(() => {
      result.current.openEditForm(original);
    });

    await act(async () => {
      await result.current.submitForm(updatedPayload);
    });

    expect(service.update).toHaveBeenCalledWith(original.Id, updatedPayload);
    expect(result.current.talleres.find((item) => item.Id === original.Id)).toEqual({
      Id: original.Id,
      ...updatedPayload,
    });
    expect(result.current.success).toBe("Taller Taller Norte Editado actualizado correctamente.");
  });

  it("elimina talleres usando el target seleccionado", async () => {
    const service = createServiceMock();
    const { result } = renderHook(() => useTalleresCrud(service));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const target = talleresBase[1];

    act(() => {
      result.current.openDeleteDialog(target);
    });

    expect(result.current.deleteTarget).toEqual(target);

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(service.remove).toHaveBeenCalledWith(target.Id);
    expect(result.current.talleres.some((item) => item.Id === target.Id)).toBe(false);
    expect(result.current.deleteTarget).toBeNull();
    expect(result.current.success).toBe("Taller eliminado correctamente.");
  });
});
