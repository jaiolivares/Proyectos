import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo, useState } from "react";
import { Mantencion } from "../../../models/vehiculos/mantencion";
import { MantencionDetalle, MantencionDetallePayload } from "../../../models/vehiculos/mantencionDetalle";
import { MantencionService } from "../../../services/vehiculos/mantencion.service";

type FormValues = {
  IdMantencion: string;
  Producto: string;
  DetalleProducto: string;
  Monto: string;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  item?: MantencionDetalle | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: MantencionDetallePayload) => Promise<void>;
};

const emptyForm: FormValues = {
  IdMantencion: "",
  Producto: "",
  DetalleProducto: "",
  Monto: "",
};

function mapItemToFormValues(item?: MantencionDetalle | null): FormValues {
  if (!item) {
    return emptyForm;
  }

  return {
    IdMantencion: String(item.IdMantencion),
    Producto: item.Producto,
    DetalleProducto: item.DetalleProducto,
    Monto: String(item.Monto),
  };
}

export default function MantencionDetalleFormDialog({ open, mode, item, loading, onClose, onSubmit }: Props) {
  const mantencionService = useMemo(() => new MantencionService(), []);
  const [formValues, setFormValues] = useState<FormValues>(emptyForm);
  const [mantenciones, setMantenciones] = useState<Mantencion[]>([]);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFormValues(mapItemToFormValues(item));
    }
  }, [open, item]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const loadOptions = async () => {
      setOptionsError(null);

      try {
        const data = await mantencionService.fetchAll();
        setMantenciones(data);
      } catch (error: any) {
        setMantenciones([]);
        setOptionsError(error?.message || "No fue posible cargar las mantenciones");
      }
    };

    void loadOptions();
  }, [mantencionService, open]);

  const handleChange = (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const mantencionId = Number(formValues.IdMantencion);
  const monto = Number(formValues.Monto);
  const selectedMantencion = mantenciones.find((option) => option.Id === mantencionId) ?? null;
  const formIsInvalid = !selectedMantencion || !formValues.Producto.trim() || !formValues.DetalleProducto.trim() || Number.isNaN(monto);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formIsInvalid) {
      return;
    }

    await onSubmit({
      IdMantencion: mantencionId,
      Producto: formValues.Producto.trim(),
      DetalleProducto: formValues.DetalleProducto.trim(),
      Monto: monto,
    });
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{mode === "create" ? "Agregar detalle" : "Editar detalle"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {optionsError && <Alert severity="error">{optionsError}</Alert>}
            <Autocomplete
              options={mantenciones}
              value={selectedMantencion}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
              getOptionLabel={(option) => `Mantención #${option.Id} · ${option.Servicio}`}
              noOptionsText="No hay mantenciones disponibles"
              onChange={(_, value) => {
                setFormValues((prev) => ({ ...prev, IdMantencion: value ? String(value.Id) : "" }));
              }}
              renderInput={(params) => <TextField {...params} label="Mantención" required />}
            />
            <TextField label="Producto" value={formValues.Producto} onChange={handleChange("Producto")} required fullWidth />
            <TextField label="Detalle del producto" value={formValues.DetalleProducto} onChange={handleChange("DetalleProducto")} required fullWidth multiline minRows={3} />
            <TextField label="Monto" type="number" value={formValues.Monto} onChange={handleChange("Monto")} required fullWidth inputProps={{ min: 0 }} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={loading || formIsInvalid}>
            {loading ? "Guardando..." : mode === "create" ? "Crear" : "Guardar cambios"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
