import { useMemo } from "react";
import { MarcaModeloVehiculo, MarcaModeloVehiculoPayload } from "../models/vehiculos/marcaModeloVehiculo";
import { IMarcaModeloVehiculoService, MarcaModeloVehiculoService } from "../services/vehiculos/marcaModeloVehiculo.service";
import { useCrudResource } from "./useCrudResource";

export function useMarcaModeloVehiculoCrud(resourceService?: IMarcaModeloVehiculoService) {
  const service = useMemo(() => resourceService ?? new MarcaModeloVehiculoService(), [resourceService]);

  return useCrudResource<MarcaModeloVehiculo, MarcaModeloVehiculoPayload>({
    service,
    messages: {
      loadError: "No fue posible cargar las asociaciones de marca y modelo",
      saveError: "No fue posible guardar la asociación",
      deleteError: "No fue posible eliminar la asociación",
      createSuccess: (item) => `Asociación #${item.Id} creada correctamente.`,
      updateSuccess: (item) => `Asociación #${item.Id} actualizada correctamente.`,
      deleteSuccess: (item, apiMessage) => apiMessage || `Asociación #${item.Id} eliminada correctamente.`,
    },
  });
}
