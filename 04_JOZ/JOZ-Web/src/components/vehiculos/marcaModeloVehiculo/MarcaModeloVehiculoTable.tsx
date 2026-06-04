import { MarcaModeloVehiculo } from "../../../models/vehiculos/marcaModeloVehiculo";
import EntityTable, { EntityTableColumn } from "../shared/EntityTable";

type Props = {
  items: MarcaModeloVehiculo[];
  onEdit: (item: MarcaModeloVehiculo) => void;
  onDelete: (item: MarcaModeloVehiculo) => void;
};

const columns: EntityTableColumn<MarcaModeloVehiculo>[] = [
  { key: "id", label: "ID", render: (item) => item.Id },
  { key: "marca", label: "Id marca", render: (item) => item.IdMarca },
  { key: "modelo", label: "Id modelo", render: (item) => item.IdModelo },
];

export default function MarcaModeloVehiculoTable({ items, onEdit, onDelete }: Props) {
  return (
    <EntityTable items={items} columns={columns} emptyText="No hay asociaciones cargadas. Usa el botón Agregar asociación para crear la primera." editLabel="Editar asociación" deleteLabel="Eliminar asociación" onEdit={onEdit} onDelete={onDelete} />
  );
}
