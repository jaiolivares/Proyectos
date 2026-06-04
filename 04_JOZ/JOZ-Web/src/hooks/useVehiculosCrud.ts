import { useMemo } from "react";
import { Vehiculo, VehiculoPayload } from "../models/vehiculos/vehiculo";
import { IVehiculoService, VehiculoService } from "../services/vehiculos/vehiculo.service";
import { useCrudResource } from "./useCrudResource";

export function useVehiculosCrud(vehiculoService?: IVehiculoService) {
  const service = useMemo(() => vehiculoService ?? new VehiculoService(), [vehiculoService]);

  return useCrudResource<Vehiculo, VehiculoPayload>({
    service,
    messages: {
      loadError: "No fue posible cargar los vehículos",
      saveError: "No fue posible guardar el vehículo",
      deleteError: "No fue posible eliminar el vehículo",
      createSuccess: (item) => `Vehículo #${item.Id} creado correctamente.`,
      updateSuccess: (item) => `Vehículo #${item.Id} actualizado correctamente.`,
      deleteSuccess: (item, apiMessage) => apiMessage || `Vehículo #${item.Id} eliminado correctamente.`,
    },
  });
}
