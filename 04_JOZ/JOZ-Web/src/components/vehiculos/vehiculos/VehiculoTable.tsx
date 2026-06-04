import { Vehiculo } from "../../../models/vehiculos/vehiculo";
import EntityTable, { EntityTableColumn } from "../shared/EntityTable";
import { formatCurrency, formatDateLabel } from "../shared/formatters";

type Props = {
  vehiculos: Vehiculo[];
  onEdit: (vehiculo: Vehiculo) => void;
  onDelete: (vehiculo: Vehiculo) => void;
};

const columns: EntityTableColumn<Vehiculo>[] = [
  { key: "id", label: "ID", render: (item) => item.Id },
  { key: "asociacion", label: "Id marca-modelo", render: (item) => item.IdMarcaModeloVehiculo },
  { key: "ano", label: "Año", render: (item) => item.Ano },
  { key: "motor", label: "Motor", render: (item) => item.NumeroMotor },
  { key: "chasis", label: "Chasis", render: (item) => item.NumeroChasis },
  { key: "color", label: "Color", render: (item) => item.Color },
  { key: "compra", label: "Fecha compra", render: (item) => formatDateLabel(item.FechaCompra) },
  { key: "monto", label: "Monto compra", render: (item) => formatCurrency(item.MontoCompra) },
  { key: "vendido", label: "Vendido", render: (item) => (item.Vendido ? "Sí" : "No") },
];

export default function VehiculoTable({ vehiculos, onEdit, onDelete }: Props) {
  return <EntityTable items={vehiculos} columns={columns} emptyText="No hay vehículos cargados. Usa el botón Agregar vehículo para crear el primero." editLabel="Editar vehículo" deleteLabel="Eliminar vehículo" onEdit={onEdit} onDelete={onDelete} />;
}
