import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useMemo, useState } from "react";
import CrudPageHeader from "../../components/vehiculos/shared/CrudPageHeader";
import DeleteDialog from "../../components/vehiculos/shared/DeleteDialog";
import VehiculoFormDialog from "../../components/vehiculos/vehiculos/VehiculoFormDialog";
import VehiculosFilters from "../../components/vehiculos/vehiculos/VehiculosFilters";
import VehiculosMessage from "../../components/vehiculos/vehiculos/VehiculosMessage";
import { useAuthContext } from "../../contexts/AuthContext";
import { useVehiculosCrud } from "../../hooks/useVehiculosCrud";
import { includesNormalized } from "../../utils/text";

export default function MisVehiculos() {
  const { user } = useAuthContext();
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email;
  const { items, loading, submitting, error, success, formMode, formOpen, selectedItem, deleteTarget, loadItems, openCreateForm, openEditForm, closeForm, openDeleteDialog, closeDeleteDialog, submitForm, confirmDelete, clearSuccess } =
    useVehiculosCrud();

  const [filters, setFilters] = useState<{ Ano?: string; Color?: string; Motor?: string }>({});

  const filteredItems = useMemo(() => {
    const fAno = filters.Ano ?? "";
    const fColor = filters.Color ?? "";
    const fMotor = filters.Motor ?? "";

    return items.filter((v) => {
      if (fAno && !includesNormalized(String(v.Ano), fAno)) return false;
      if (fColor && !includesNormalized(v.Color, fColor)) return false;
      if (fMotor && !includesNormalized(v.NumeroMotor, fMotor)) return false;
      return true;
    });
  }, [items, filters]);

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <CrudPageHeader title="Vehículos" description="Administra los vehículos registrados en tu API." displayName={displayName} />
        <VehiculosFilters
          loading={loading}
          submitting={submitting}
          onReload={() => void loadItems()}
          onCreate={openCreateForm}
          onFilterChange={(f) => setFilters(f)}
          anoOptions={Array.from(new Set(items.map((i) => String(i.Ano))))}
          colorOptions={Array.from(new Set(items.map((i) => i.Color).filter(Boolean)))}
          motorOptions={Array.from(new Set(items.map((i) => i.NumeroMotor).filter(Boolean)))}
        />

        <VehiculosMessage vehiculos={filteredItems} totalCount={items.length} loading={loading} error={error} success={success} onCloseSuccess={clearSuccess} onEdit={openEditForm} onDelete={openDeleteDialog} />
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
