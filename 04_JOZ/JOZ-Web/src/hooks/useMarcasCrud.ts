import { useMemo } from "react";
import { Marca, MarcaPayload } from "../models/vehiculos/marca";
import { IMarcaService, MarcaService } from "../services/vehiculos/marca.service";
import { useCrudResource } from "./useCrudResource";

export function useMarcasCrud(marcaService?: IMarcaService) {
  const service = useMemo(() => marcaService ?? new MarcaService(), [marcaService]);

  return useCrudResource<Marca, MarcaPayload>({
    service,
    messages: {
      loadError: "No fue posible cargar las marcas",
      saveError: "No fue posible guardar la marca",
      deleteError: "No fue posible eliminar la marca",
      createSuccess: (item) => `Marca ${item.Marca} creada correctamente.`,
      updateSuccess: (item) => `Marca ${item.Marca} actualizada correctamente.`,
      deleteSuccess: (item, apiMessage) => apiMessage || `Marca ${item.Marca} eliminada correctamente.`,
    },
  });
}
