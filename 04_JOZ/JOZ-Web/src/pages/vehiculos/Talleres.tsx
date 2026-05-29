import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TallerDeleteDialog from "../../components/vehiculos/talleres/TallerDeleteDialog";
import TallerFormDialog from "../../components/vehiculos/talleres/TallerFormDialog";
import TalleresContent from "../../components/vehiculos/talleres/TalleresContent";
import TalleresCrudPanel from "../../components/vehiculos/talleres/TalleresCrudPanel";
import TalleresPageHeader from "../../components/vehiculos/talleres/TalleresPageHeader";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTalleresCrud } from "../../hooks/useTalleresCrud";

export default function Talleres() {
  const { user } = useAuthContext();
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email;
  const { talleres, loading, submitting, error, success, formMode, formOpen, selectedTaller, deleteTarget, loadTalleres, openCreateForm, openEditForm, closeForm, openDeleteDialog, closeDeleteDialog, submitForm, confirmDelete, clearSuccess } =
    useTalleresCrud();

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <TalleresPageHeader displayName={displayName} />

        <TalleresCrudPanel loading={loading} submitting={submitting} onReload={() => void loadTalleres()} onCreate={openCreateForm} />

        <TalleresContent talleres={talleres} loading={loading} error={error} success={success} onCloseSuccess={clearSuccess} onEdit={openEditForm} onDelete={openDeleteDialog} />
      </Stack>

      <TallerFormDialog open={formOpen} mode={formMode} taller={selectedTaller} loading={submitting} onClose={closeForm} onSubmit={submitForm} />

      <TallerDeleteDialog open={Boolean(deleteTarget)} taller={deleteTarget} loading={submitting} onClose={closeDeleteDialog} onConfirm={confirmDelete} />
    </Container>
  );
}
