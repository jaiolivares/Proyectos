import { Mantencion } from "../../../models/vehiculos/mantencion";
import EntityTable, { EntityTableColumn } from "../shared/EntityTable";
import { formatCurrency, formatDateLabel } from "../shared/formatters";

type Props = {
  mantenciones: Mantencion[];
  onEdit: (mantencion: Mantencion) => void;
  onDelete: (mantencion: Mantencion) => void;
};

const columns: EntityTableColumn<Mantencion>[] = [
  { key: "id", label: "ID", render: (item) => item.Id },
  { key: "vehiculo", label: "Id vehículo", render: (item) => item.IdVehiculo },
  { key: "fecha", label: "Fecha", render: (item) => formatDateLabel(item.Fecha) },
  { key: "taller", label: "Id taller", render: (item) => item.IdTaller },
  { key: "servicio", label: "Servicio", render: (item) => item.Servicio },
  { key: "monto", label: "Monto total", render: (item) => formatCurrency(item.MontoTotal) },
  { key: "km", label: "Kilometraje", render: (item) => item.Kilometraje ?? "-" },
  { key: "usuario", label: "Id usuario", render: (item) => item.IdUsuarioCreacion },
];

export default function MantencionTable({ mantenciones, onEdit, onDelete }: Props) {
  return (
    <EntityTable
      items={mantenciones}
      columns={columns}
      emptyText="No hay mantenciones cargadas. Usa el botón Agregar mantención para crear la primera."
      editLabel="Editar mantención"
      deleteLabel="Eliminar mantención"
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
