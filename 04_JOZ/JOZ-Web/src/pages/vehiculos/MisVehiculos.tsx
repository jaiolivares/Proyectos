import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import CrudContent from "../../components/vehiculos/shared/CrudContent";
import CrudPageHeader from "../../components/vehiculos/shared/CrudPageHeader";
import CrudPanel from "../../components/vehiculos/shared/CrudPanel";
import DeleteDialog from "../../components/vehiculos/shared/DeleteDialog";
import VehiculoFormDialog from "../../components/vehiculos/vehiculos/VehiculoFormDialog";
import VehiculoTable from "../../components/vehiculos/vehiculos/VehiculoTable";
import { useAuthContext } from "../../contexts/AuthContext";
import { useVehiculosCrud } from "../../hooks/useVehiculosCrud";

export default function MisVehiculos() {
  const { user } = useAuthContext();
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email;
  const { items, loading, submitting, error, success, formMode, formOpen, selectedItem, deleteTarget, loadItems, openCreateForm, openEditForm, closeForm, openDeleteDialog, closeDeleteDialog, submitForm, confirmDelete, clearSuccess } =
    useVehiculosCrud();

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <CrudPageHeader title="Vehículos" description="Administra los vehículos registrados en tu API." displayName={displayName} />
        <CrudPanel
          title="CRUD de vehículos"
          description="Crea, edita, elimina y recarga vehículos desde los endpoints protegidos de JOZ-Api."
          createLabel="Agregar vehículo"
          loading={loading}
          submitting={submitting}
          onReload={() => void loadItems()}
          onCreate={openCreateForm}
        />
        <CrudContent loading={loading} error={error} success={success} loadingLabel="Cargando vehículos..." onCloseSuccess={clearSuccess}>
          <VehiculoTable vehiculos={items} onEdit={openEditForm} onDelete={openDeleteDialog} />
        </CrudContent>
      </Stack>

      <VehiculoFormDialog open={formOpen} mode={formMode} vehiculo={selectedItem} loading={submitting} onClose={closeForm} onSubmit={submitForm} />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        title="Eliminar vehículo"
        item={deleteTarget}
        loading={submitting}
        getDescription={(item) => (item ? `Se eliminará el vehículo #${item.Id}. Esta acción no se puede deshacer.` : "Selecciona un vehículo válido para eliminar.")}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}
