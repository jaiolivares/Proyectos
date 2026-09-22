import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useMemo, useState } from "react";
import TallerDeleteDialog from "../../components/vehiculos/talleres/TallerDeleteDialog";
import TallerFormDialog from "../../components/vehiculos/talleres/TallerFormDialog";
import TalleresFilters from "../../components/vehiculos/talleres/TalleresFilters.tsx";
import TalleresMessage from "../../components/vehiculos/talleres/TalleresMessage";
import TalleresPageHeader from "../../components/vehiculos/talleres/TalleresPageHeader";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTalleresCrud } from "../../hooks/useTalleresCrud";
import { includesNormalized } from "../../utils/text";

export default function Talleres() {
  const { user } = useAuthContext();
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email;
  const { talleres, loading, submitting, error, success, formMode, formOpen, selectedTaller, deleteTarget, loadTalleres, openCreateForm, openEditForm, closeForm, openDeleteDialog, closeDeleteDialog, submitForm, confirmDelete, clearSuccess } =
    useTalleresCrud();

  const [filters, setFilters] = useState<{ Nombre?: string; Comuna?: string; Direccion?: string }>({});

  const filteredTalleres = useMemo(() => {
    const fNombre = filters.Nombre ?? "";
    const fComuna = filters.Comuna ?? "";
    const fDireccion = filters.Direccion ?? "";

    return talleres.filter((t) => {
      if (fNombre && !includesNormalized(t.Nombre, fNombre)) return false;
      if (fComuna) {
        const desc = t.Comuna?.Descripcion ?? "";
        if (!includesNormalized(desc, fComuna)) return false;
      }
      if (fDireccion && !includesNormalized(t.Direccion, fDireccion)) return false;
      return true;
    });
  }, [talleres, filters]);

  const nombreOptions = useMemo(() => Array.from(new Set(talleres.map((t) => t.Nombre).filter(Boolean))), [talleres]);
  const comunaOptions = useMemo(() => Array.from(new Set(talleres.map((t) => t.Comuna?.Descripcion).filter((v): v is string => typeof v === "string"))), [talleres]);
  const direccionOptions = useMemo(() => Array.from(new Set(talleres.map((t) => t.Direccion).filter(Boolean))), [talleres]);

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <TalleresPageHeader displayName={displayName} />

        <TalleresFilters
          loading={loading}
          submitting={submitting}
          onReload={() => void loadTalleres()}
          onCreate={openCreateForm}
          onFilterChange={(f) => setFilters(f)}
          nombreOptions={nombreOptions}
          comunaOptions={comunaOptions}
          direccionOptions={direccionOptions}
        />

        <TalleresMessage talleres={filteredTalleres} totalCount={talleres.length} loading={loading} error={error} success={success} onCloseSuccess={clearSuccess} onEdit={openEditForm} onDelete={openDeleteDialog} />
      </Stack>

      <TallerFormDialog open={formOpen} mode={formMode} taller={selectedTaller} loading={submitting} onClose={closeForm} onSubmit={submitForm} />

      <TallerDeleteDialog open={Boolean(deleteTarget)} taller={deleteTarget} loading={submitting} onClose={closeDeleteDialog} onConfirm={confirmDelete} />
    </Container>
  );
}
