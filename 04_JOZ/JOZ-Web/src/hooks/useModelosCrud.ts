import { useMemo } from "react";
import { Modelo, ModeloPayload } from "../models/vehiculos/modelo";
import { IModeloService, ModeloService } from "../services/vehiculos/modelo.service";
import { useCrudResource } from "./useCrudResource";

export function useModelosCrud(modeloService?: IModeloService) {
  const service = useMemo(() => modeloService ?? new ModeloService(), [modeloService]);

  return useCrudResource<Modelo, ModeloPayload>({
    service,
    messages: {
      loadError: "No fue posible cargar los modelos",
      saveError: "No fue posible guardar el modelo",
      deleteError: "No fue posible eliminar el modelo",
      createSuccess: (item) => `Modelo ${item.Modelo} creado correctamente.`,
      updateSuccess: (item) => `Modelo ${item.Modelo} actualizado correctamente.`,
      deleteSuccess: (item, apiMessage) => apiMessage || `Modelo ${item.Modelo} eliminado correctamente.`,
    },
  });
}
