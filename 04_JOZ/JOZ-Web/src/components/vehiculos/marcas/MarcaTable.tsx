import { Marca } from "../../../models/vehiculos/marca";
import EntityTable, { EntityTableColumn } from "../shared/EntityTable";

type Props = {
  marcas: Marca[];
  onEdit: (marca: Marca) => void;
  onDelete: (marca: Marca) => void;
};

const columns: EntityTableColumn<Marca>[] = [
  { key: "id", label: "ID", render: (item) => item.Id },
  { key: "marca", label: "Marca", render: (item) => item.Marca },
  { key: "descripcion", label: "Descripción", render: (item) => item.Descripcion },
];

export default function MarcaTable({ marcas, onEdit, onDelete }: Props) {
  return <EntityTable items={marcas} columns={columns} emptyText="No hay marcas cargadas. Usa el botón Agregar marca para crear la primera." editLabel="Editar marca" deleteLabel="Eliminar marca" onEdit={onEdit} onDelete={onDelete} />;
}
