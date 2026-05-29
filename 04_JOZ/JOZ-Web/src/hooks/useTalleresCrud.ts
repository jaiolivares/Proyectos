import { useCallback, useEffect, useMemo, useState } from "react";
import { Taller, TallerPayload } from "../models/vehiculos/taller";
import { ITallerService, TallerService } from "../services/vehiculos/taller.service";

export type TallerFormMode = "create" | "edit";

function sortTalleres(items: Taller[]) {
  return [...items].sort((left, right) => right.Id - left.Id);
}

export function useTalleresCrud(tallerService?: ITallerService) {
  const service = useMemo(() => tallerService ?? new TallerService(), [tallerService]);
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<TallerFormMode>("create");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTaller, setSelectedTaller] = useState<Taller | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Taller | null>(null);

  const loadTalleres = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await service.fetchAll();
      setTalleres(sortTalleres(data));
    } catch (requestError: any) {
      setError(requestError?.message || "No fue posible cargar los talleres");
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    void loadTalleres();
  }, [loadTalleres]);

  const openCreateForm = () => {
    setSuccess(null);
    setSelectedTaller(null);
    setFormMode("create");
    setFormOpen(true);
  };

  const openEditForm = (taller: Taller) => {
    setSuccess(null);
    setSelectedTaller(taller);
    setFormMode("edit");
    setFormOpen(true);
  };

  const closeForm = () => {
    if (submitting) {
      return;
    }

    setFormOpen(false);
    setSelectedTaller(null);
  };

  const openDeleteDialog = (taller: Taller) => {
    setSuccess(null);
    setDeleteTarget(taller);
  };

  const closeDeleteDialog = () => {
    if (submitting) {
      return;
    }

    setDeleteTarget(null);
  };

  const submitForm = async (payload: TallerPayload) => {
    setSubmitting(true);
    setError(null);

    try {
      if (formMode === "create") {
        const created = await service.create(payload);
        setTalleres((prev) => sortTalleres([created, ...prev]));
        setSuccess(`Taller ${created.Nombre} creado correctamente.`);
      } else if (selectedTaller) {
        const updated = await service.update(selectedTaller.Id, payload);
        setTalleres((prev) => sortTalleres(prev.map((item) => (item.Id === updated.Id ? updated : item))));
        setSuccess(`Taller ${updated.Nombre} actualizado correctamente.`);
      }

      setFormOpen(false);
      setSelectedTaller(null);
    } catch (requestError: any) {
      setError(requestError?.message || "No fue posible guardar el taller");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const message = await service.remove(deleteTarget.Id);
      setTalleres((prev) => prev.filter((item) => item.Id !== deleteTarget.Id));
      setSuccess(message || `Taller ${deleteTarget.Nombre} eliminado correctamente.`);
      setDeleteTarget(null);
    } catch (requestError: any) {
      setError(requestError?.message || "No fue posible eliminar el taller");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    talleres,
    loading,
    submitting,
    error,
    success,
    formMode,
    formOpen,
    selectedTaller,
    deleteTarget,
    loadTalleres,
    openCreateForm,
    openEditForm,
    closeForm,
    openDeleteDialog,
    closeDeleteDialog,
    submitForm,
    confirmDelete,
    clearSuccess: () => setSuccess(null),
  };
}
