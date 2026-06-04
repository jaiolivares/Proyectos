import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import MarcaFormDialog from "../../components/vehiculos/marcas/MarcaFormDialog";
import MarcaTable from "../../components/vehiculos/marcas/MarcaTable";
import CrudContent from "../../components/vehiculos/shared/CrudContent";
import CrudPageHeader from "../../components/vehiculos/shared/CrudPageHeader";
import CrudPanel from "../../components/vehiculos/shared/CrudPanel";
import DeleteDialog from "../../components/vehiculos/shared/DeleteDialog";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMarcasCrud } from "../../hooks/useMarcasCrud";

export default function Marcas() {
  const { user } = useAuthContext();
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email;
  const { items, loading, submitting, error, success, formMode, formOpen, selectedItem, deleteTarget, loadItems, openCreateForm, openEditForm, closeForm, openDeleteDialog, closeDeleteDialog, submitForm, confirmDelete, clearSuccess } =
    useMarcasCrud();

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <CrudPageHeader title="Marcas" description="Administra el catálogo de marcas conectado a tu API." displayName={displayName} />
        <CrudPanel
          title="CRUD de marcas"
          description="Crea, edita, elimina y recarga marcas desde los endpoints protegidos de JOZ-Api."
          createLabel="Agregar marca"
          loading={loading}
          submitting={submitting}
          onReload={() => void loadItems()}
          onCreate={openCreateForm}
        />
        <CrudContent loading={loading} error={error} success={success} loadingLabel="Cargando marcas..." onCloseSuccess={clearSuccess}>
          <MarcaTable marcas={items} onEdit={openEditForm} onDelete={openDeleteDialog} />
        </CrudContent>
      </Stack>

      <MarcaFormDialog open={formOpen} mode={formMode} marca={selectedItem} loading={submitting} onClose={closeForm} onSubmit={submitForm} />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        title="Eliminar marca"
        item={deleteTarget}
        loading={submitting}
        getDescription={(item) => (item ? `Se eliminará la marca ${item.Marca}. Esta acción no se puede deshacer.` : "Selecciona una marca válida para eliminar.")}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}
