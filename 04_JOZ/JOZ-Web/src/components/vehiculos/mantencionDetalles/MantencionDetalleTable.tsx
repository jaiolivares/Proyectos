import { MantencionDetalle } from "../../../models/vehiculos/mantencionDetalle";
import EntityTable, { EntityTableColumn } from "../shared/EntityTable";
import { formatCurrency } from "../shared/formatters";

type Props = {
  items: MantencionDetalle[];
  onEdit: (item: MantencionDetalle) => void;
  onDelete: (item: MantencionDetalle) => void;
};

const columns: EntityTableColumn<MantencionDetalle>[] = [
  { key: "id", label: "ID", render: (item) => item.Id },
  { key: "mantencion", label: "Id mantención", render: (item) => item.IdMantencion },
  { key: "producto", label: "Producto", render: (item) => item.Producto },
  { key: "detalle", label: "Detalle", render: (item) => item.DetalleProducto },
  { key: "monto", label: "Monto", render: (item) => formatCurrency(item.Monto) },
];

export default function MantencionDetalleTable({ items, onEdit, onDelete }: Props) {
  return (
    <EntityTable items={items} columns={columns} emptyText="No hay detalles de mantención cargados. Usa el botón Agregar detalle para crear el primero." editLabel="Editar detalle" deleteLabel="Eliminar detalle" onEdit={onEdit} onDelete={onDelete} />
  );
}
