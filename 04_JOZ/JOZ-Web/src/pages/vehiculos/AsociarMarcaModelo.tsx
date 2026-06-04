import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import MarcaModeloVehiculoFormDialog from "../../components/vehiculos/marcaModeloVehiculo/MarcaModeloVehiculoFormDialog";
import MarcaModeloVehiculoTable from "../../components/vehiculos/marcaModeloVehiculo/MarcaModeloVehiculoTable";
import CrudContent from "../../components/vehiculos/shared/CrudContent";
import CrudPageHeader from "../../components/vehiculos/shared/CrudPageHeader";
import CrudPanel from "../../components/vehiculos/shared/CrudPanel";
import DeleteDialog from "../../components/vehiculos/shared/DeleteDialog";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMarcaModeloVehiculoCrud } from "../../hooks/useMarcaModeloVehiculoCrud";

export default function AsociarMarcaModelo() {
  const { user } = useAuthContext();
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email;
  const { items, loading, submitting, error, success, formMode, formOpen, selectedItem, deleteTarget, loadItems, openCreateForm, openEditForm, closeForm, openDeleteDialog, closeDeleteDialog, submitForm, confirmDelete, clearSuccess } =
    useMarcaModeloVehiculoCrud();

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <CrudPageHeader title="Asociar Marca-Modelo" description="Administra las asociaciones entre marcas y modelos disponibles en tu API." displayName={displayName} />
        <CrudPanel
          title="CRUD de asociaciones"
          description="Crea, edita, elimina y recarga asociaciones marca-modelo desde los endpoints protegidos de JOZ-Api."
          createLabel="Agregar asociación"
          loading={loading}
          submitting={submitting}
          onReload={() => void loadItems()}
          onCreate={openCreateForm}
        />
        <CrudContent loading={loading} error={error} success={success} loadingLabel="Cargando asociaciones..." onCloseSuccess={clearSuccess}>
          <MarcaModeloVehiculoTable items={items} onEdit={openEditForm} onDelete={openDeleteDialog} />
        </CrudContent>
      </Stack>

      <MarcaModeloVehiculoFormDialog open={formOpen} mode={formMode} item={selectedItem} loading={submitting} onClose={closeForm} onSubmit={submitForm} />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        title="Eliminar asociación"
        item={deleteTarget}
        loading={submitting}
        getDescription={(item) => (item ? `Se eliminará la asociación #${item.Id} entre marca ${item.IdMarca} y modelo ${item.IdModelo}.` : "Selecciona una asociación válida para eliminar.")}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}
