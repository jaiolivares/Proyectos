import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import MantencionFormDialog from "../../components/vehiculos/mantenciones/MantencionFormDialog";
import MantencionTable from "../../components/vehiculos/mantenciones/MantencionTable";
import CrudContent from "../../components/vehiculos/shared/CrudContent";
import CrudPageHeader from "../../components/vehiculos/shared/CrudPageHeader";
import CrudPanel from "../../components/vehiculos/shared/CrudPanel";
import DeleteDialog from "../../components/vehiculos/shared/DeleteDialog";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMantencionesCrud } from "../../hooks/useMantencionesCrud";

export default function Mantenciones() {
  const { user } = useAuthContext();
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email;
  const { items, loading, submitting, error, success, formMode, formOpen, selectedItem, deleteTarget, loadItems, openCreateForm, openEditForm, closeForm, openDeleteDialog, closeDeleteDialog, submitForm, confirmDelete, clearSuccess } =
    useMantencionesCrud();

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <CrudPageHeader title="Mantenciones" description="Administra las mantenciones asociadas a tus vehículos y talleres." displayName={displayName} />
        <CrudPanel
          title="CRUD de mantenciones"
          description="Crea, edita, elimina y recarga mantenciones desde los endpoints protegidos de JOZ-Api."
          createLabel="Agregar mantención"
          loading={loading}
          submitting={submitting}
          onReload={() => void loadItems()}
          onCreate={openCreateForm}
        />
        <CrudContent loading={loading} error={error} success={success} loadingLabel="Cargando mantenciones..." onCloseSuccess={clearSuccess}>
          <MantencionTable mantenciones={items} onEdit={openEditForm} onDelete={openDeleteDialog} />
        </CrudContent>
      </Stack>

      <MantencionFormDialog open={formOpen} mode={formMode} mantencion={selectedItem} userId={user?.Id} loading={submitting} onClose={closeForm} onSubmit={submitForm} />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        title="Eliminar mantención"
        item={deleteTarget}
        loading={submitting}
        getDescription={(item) => (item ? `Se eliminará la mantención #${item.Id} del vehículo ${item.IdVehiculo}.` : "Selecciona una mantención válida para eliminar.")}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}
