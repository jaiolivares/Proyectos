import { useCallback, useEffect, useMemo, useState } from "react";
import { CrudEntity, CrudFormMode, CrudService } from "../models/vehiculos/crud";

type UseCrudResourceOptions<TItem extends CrudEntity, TPayload> = {
  service: CrudService<TItem, TPayload>;
  sortItems?: (items: TItem[]) => TItem[];
  messages: {
    loadError: string;
    saveError: string;
    deleteError: string;
    createSuccess: (item: TItem) => string;
    updateSuccess: (item: TItem) => string;
    deleteSuccess: (item: TItem, apiMessage: string) => string;
  };
};

function defaultSort<TItem extends CrudEntity>(items: TItem[]) {
  return [...items].sort((left, right) => right.Id - left.Id);
}

export function useCrudResource<TItem extends CrudEntity, TPayload>({ service, sortItems = defaultSort, messages }: UseCrudResourceOptions<TItem, TPayload>) {
  const memoizedService = useMemo(() => service, [service]);
  const [items, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<CrudFormMode>("create");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TItem | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await memoizedService.fetchAll();
      setItems(sortItems(data));
    } catch (requestError: any) {
      setError(requestError?.message || messages.loadError);
    } finally {
      setLoading(false);
    }
  }, [memoizedService, messages.loadError, sortItems]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const openCreateForm = () => {
    setSuccess(null);
    setSelectedItem(null);
    setFormMode("create");
    setFormOpen(true);
  };

  const openEditForm = (item: TItem) => {
    setSuccess(null);
    setSelectedItem(item);
    setFormMode("edit");
    setFormOpen(true);
  };

  const closeForm = () => {
    if (submitting) {
      return;
    }

    setFormOpen(false);
    setSelectedItem(null);
  };

  const openDeleteDialog = (item: TItem) => {
    setSuccess(null);
    setDeleteTarget(item);
  };

  const closeDeleteDialog = () => {
    if (submitting) {
      return;
    }

    setDeleteTarget(null);
  };

  const submitForm = async (payload: TPayload) => {
    setSubmitting(true);
    setError(null);

    try {
      if (formMode === "create") {
        const created = await memoizedService.create(payload);
        setItems((prev) => sortItems([created, ...prev]));
        setSuccess(messages.createSuccess(created));
      } else if (selectedItem) {
        const updated = await memoizedService.update(selectedItem.Id, payload);
        setItems((prev) => sortItems(prev.map((item) => (item.Id === updated.Id ? updated : item))));
        setSuccess(messages.updateSuccess(updated));
      }

      setFormOpen(false);
      setSelectedItem(null);
    } catch (requestError: any) {
      setError(requestError?.message || messages.saveError);
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
      const message = await memoizedService.remove(deleteTarget.Id);
      setItems((prev) => prev.filter((item) => item.Id !== deleteTarget.Id));
      setSuccess(messages.deleteSuccess(deleteTarget, message));
      setDeleteTarget(null);
    } catch (requestError: any) {
      setError(requestError?.message || messages.deleteError);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    items,
    loading,
    submitting,
    error,
    success,
    formMode,
    formOpen,
    selectedItem,
    deleteTarget,
    loadItems,
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
