import { Modelo } from "../../../models/vehiculos/modelo";
import EntityTable, { EntityTableColumn } from "../shared/EntityTable";

type Props = {
  modelos: Modelo[];
  onEdit: (modelo: Modelo) => void;
  onDelete: (modelo: Modelo) => void;
};

const columns: EntityTableColumn<Modelo>[] = [
  { key: "id", label: "ID", render: (item) => item.Id },
  { key: "tipo", label: "Id tipo vehículo", render: (item) => item.IdTipoVehiculo },
  { key: "modelo", label: "Modelo", render: (item) => item.Modelo },
  { key: "descripcion", label: "Descripción", render: (item) => item.Descripcion },
];

export default function ModeloTable({ modelos, onEdit, onDelete }: Props) {
  return <EntityTable items={modelos} columns={columns} emptyText="No hay modelos cargados. Usa el botón Agregar modelo para crear el primero." editLabel="Editar modelo" deleteLabel="Eliminar modelo" onEdit={onEdit} onDelete={onDelete} />;
}
