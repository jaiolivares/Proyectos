import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import MantencionDetalleFormDialog from "../../components/vehiculos/mantencionDetalles/MantencionDetalleFormDialog";
import MantencionDetalleTable from "../../components/vehiculos/mantencionDetalles/MantencionDetalleTable";
import CrudContent from "../../components/vehiculos/shared/CrudContent";
import CrudPageHeader from "../../components/vehiculos/shared/CrudPageHeader";
import CrudPanel from "../../components/vehiculos/shared/CrudPanel";
import DeleteDialog from "../../components/vehiculos/shared/DeleteDialog";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMantencionDetallesCrud } from "../../hooks/useMantencionDetallesCrud";

export default function MantencionDetalles() {
  const { user } = useAuthContext();
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email;
  const { items, loading, submitting, error, success, formMode, formOpen, selectedItem, deleteTarget, loadItems, openCreateForm, openEditForm, closeForm, openDeleteDialog, closeDeleteDialog, submitForm, confirmDelete, clearSuccess } =
    useMantencionDetallesCrud();

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <CrudPageHeader title="Detalle de Mantenciones" description="Administra los ítems de detalle asociados a cada mantención registrada en tu API." displayName={displayName} />
        <CrudPanel
          title="CRUD de detalles"
          description="Crea, edita, elimina y recarga detalles de mantención desde los endpoints protegidos de JOZ-Api."
          createLabel="Agregar detalle"
          loading={loading}
          submitting={submitting}
          onReload={() => void loadItems()}
          onCreate={openCreateForm}
        />
        <CrudContent loading={loading} error={error} success={success} loadingLabel="Cargando detalles de mantención..." onCloseSuccess={clearSuccess}>
          <MantencionDetalleTable items={items} onEdit={openEditForm} onDelete={openDeleteDialog} />
        </CrudContent>
      </Stack>

      <MantencionDetalleFormDialog open={formOpen} mode={formMode} item={selectedItem} loading={submitting} onClose={closeForm} onSubmit={submitForm} />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        title="Eliminar detalle"
        item={deleteTarget}
        loading={submitting}
        getDescription={(item) => (item ? `Se eliminará el detalle #${item.Id} de la mantención ${item.IdMantencion}.` : "Selecciona un detalle válido para eliminar.")}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}
