import { useMemo } from "react";
import { MantencionDetalle, MantencionDetallePayload } from "../models/vehiculos/mantencionDetalle";
import { IMantencionDetalleService, MantencionDetalleService } from "../services/vehiculos/mantencionDetalle.service";
import { useCrudResource } from "./useCrudResource";

export function useMantencionDetallesCrud(detailService?: IMantencionDetalleService) {
  const service = useMemo(() => detailService ?? new MantencionDetalleService(), [detailService]);

  return useCrudResource<MantencionDetalle, MantencionDetallePayload>({
    service,
    messages: {
      loadError: "No fue posible cargar los detalles de mantención",
      saveError: "No fue posible guardar el detalle de mantención",
      deleteError: "No fue posible eliminar el detalle de mantención",
      createSuccess: (item) => `Detalle #${item.Id} creado correctamente.`,
      updateSuccess: (item) => `Detalle #${item.Id} actualizado correctamente.`,
      deleteSuccess: (item, apiMessage) => apiMessage || `Detalle #${item.Id} eliminado correctamente.`,
    },
  });
}
