import { useMemo } from "react";
import { Mantencion, MantencionPayload } from "../models/vehiculos/mantencion";
import { IMantencionService, MantencionService } from "../services/vehiculos/mantencion.service";
import { useCrudResource } from "./useCrudResource";

export function useMantencionesCrud(mantencionService?: IMantencionService) {
  const service = useMemo(() => mantencionService ?? new MantencionService(), [mantencionService]);

  return useCrudResource<Mantencion, MantencionPayload>({
    service,
    messages: {
      loadError: "No fue posible cargar las mantenciones",
      saveError: "No fue posible guardar la mantención",
      deleteError: "No fue posible eliminar la mantención",
      createSuccess: (item) => `Mantención #${item.Id} creada correctamente.`,
      updateSuccess: (item) => `Mantención #${item.Id} actualizada correctamente.`,
      deleteSuccess: (item, apiMessage) => apiMessage || `Mantención #${item.Id} eliminada correctamente.`,
    },
  });
}
