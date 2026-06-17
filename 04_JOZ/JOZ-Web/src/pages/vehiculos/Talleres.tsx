import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useMemo, useState } from "react";
import TallerDeleteDialog from "../../components/vehiculos/talleres/TallerDeleteDialog";
import TallerFormDialog from "../../components/vehiculos/talleres/TallerFormDialog";
import TalleresContent from "../../components/vehiculos/talleres/TalleresContent";
import TalleresCrudPanel from "../../components/vehiculos/talleres/TalleresCrudPanel";
import TalleresPageHeader from "../../components/vehiculos/talleres/TalleresPageHeader";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTalleresCrud } from "../../hooks/useTalleresCrud";

export default function Talleres() {
  const { user } = useAuthContext();
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email || "ccc";
  const { talleres, loading, submitting, error, success, formMode, formOpen, selectedTaller, deleteTarget, loadTalleres, openCreateForm, openEditForm, closeForm, openDeleteDialog, closeDeleteDialog, submitForm, confirmDelete, clearSuccess } =
    useTalleresCrud();

  const [filters, setFilters] = useState<{ Nombre?: string; Comuna?: string; Direccion?: string }>({});

  const filteredTalleres = useMemo(() => {
    const fNombre = filters.Nombre?.toLowerCase();
    const fComuna = filters.Comuna?.toLowerCase();
    const fDireccion = filters.Direccion?.toLowerCase();

    return talleres.filter((t) => {
      if (fNombre && !(t.Nombre || "").toLowerCase().includes(fNombre)) return false;
      if (fComuna) {
        const desc = t.Comuna?.Descripcion ?? "";
        if (!desc.toLowerCase().includes(fComuna)) return false;
      }
      if (fDireccion && !(t.Direccion || "").toLowerCase().includes(fDireccion)) return false;
      return true;
    });
  }, [talleres, filters]);

  const nombreOptions = useMemo(() => Array.from(new Set(talleres.map((t) => t.Nombre).filter(Boolean))), [talleres]);
  const comunaOptions = useMemo(() => Array.from(new Set(talleres.map((t) => t.Comuna?.Descripcion).filter(Boolean as any))), [talleres]);
  const direccionOptions = useMemo(() => Array.from(new Set(talleres.map((t) => t.Direccion).filter(Boolean))), [talleres]);

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <TalleresPageHeader displayName={displayName} />

        <TalleresCrudPanel
          loading={loading}
          submitting={submitting}
          onReload={() => void loadTalleres()}
          onCreate={openCreateForm}
          onFilterChange={(f) => setFilters(f)}
          nombreOptions={nombreOptions}
          comunaOptions={comunaOptions}
          direccionOptions={direccionOptions}
        />

        <TalleresContent talleres={filteredTalleres} totalCount={talleres.length} loading={loading} error={error} success={success} onCloseSuccess={clearSuccess} onEdit={openEditForm} onDelete={openDeleteDialog} />
      </Stack>

      <TallerFormDialog open={formOpen} mode={formMode} taller={selectedTaller} loading={submitting} onClose={closeForm} onSubmit={submitForm} />

      <TallerDeleteDialog open={Boolean(deleteTarget)} taller={deleteTarget} loading={submitting} onClose={closeDeleteDialog} onConfirm={confirmDelete} />
    </Container>
  );
}
