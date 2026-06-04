import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ModeloFormDialog from "../../components/vehiculos/modelos/ModeloFormDialog";
import ModeloTable from "../../components/vehiculos/modelos/ModeloTable";
import CrudContent from "../../components/vehiculos/shared/CrudContent";
import CrudPageHeader from "../../components/vehiculos/shared/CrudPageHeader";
import CrudPanel from "../../components/vehiculos/shared/CrudPanel";
import DeleteDialog from "../../components/vehiculos/shared/DeleteDialog";
import { useAuthContext } from "../../contexts/AuthContext";
import { useModelosCrud } from "../../hooks/useModelosCrud";

export default function Modelos() {
  const { user } = useAuthContext();
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email;
  const { items, loading, submitting, error, success, formMode, formOpen, selectedItem, deleteTarget, loadItems, openCreateForm, openEditForm, closeForm, openDeleteDialog, closeDeleteDialog, submitForm, confirmDelete, clearSuccess } =
    useModelosCrud();

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <CrudPageHeader title="Modelos" description="Administra el catálogo de modelos conectado a tu API." displayName={displayName} />
        <CrudPanel
          title="CRUD de modelos"
          description="Crea, edita, elimina y recarga modelos desde los endpoints protegidos de JOZ-Api."
          createLabel="Agregar modelo"
          loading={loading}
          submitting={submitting}
          onReload={() => void loadItems()}
          onCreate={openCreateForm}
        />
        <CrudContent loading={loading} error={error} success={success} loadingLabel="Cargando modelos..." onCloseSuccess={clearSuccess}>
          <ModeloTable modelos={items} onEdit={openEditForm} onDelete={openDeleteDialog} />
        </CrudContent>
      </Stack>

      <ModeloFormDialog open={formOpen} mode={formMode} modelo={selectedItem} loading={submitting} onClose={closeForm} onSubmit={submitForm} />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        title="Eliminar modelo"
        item={deleteTarget}
        loading={submitting}
        getDescription={(item) => (item ? `Se eliminará el modelo ${item.Modelo}. Esta acción no se puede deshacer.` : "Selecciona un modelo válido para eliminar.")}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}
