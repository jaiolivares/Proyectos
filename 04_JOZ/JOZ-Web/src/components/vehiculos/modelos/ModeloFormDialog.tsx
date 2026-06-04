import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Modelo, ModeloPayload } from "../../../models/vehiculos/modelo";

type ModeloFormValues = {
  IdTipoVehiculo: string;
  Modelo: string;
  Descripcion: string;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  modelo?: Modelo | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: ModeloPayload) => Promise<void>;
};

const emptyForm: ModeloFormValues = {
  IdTipoVehiculo: "",
  Modelo: "",
  Descripcion: "",
};

function mapModeloToFormValues(modelo?: Modelo | null): ModeloFormValues {
  if (!modelo) {
    return emptyForm;
  }

  return {
    IdTipoVehiculo: String(modelo.IdTipoVehiculo),
    Modelo: modelo.Modelo,
    Descripcion: modelo.Descripcion,
  };
}

export default function ModeloFormDialog({ open, mode, modelo, loading, onClose, onSubmit }: Props) {
  const [formValues, setFormValues] = useState<ModeloFormValues>(emptyForm);

  useEffect(() => {
    if (open) {
      setFormValues(mapModeloToFormValues(modelo));
    }
  }, [open, modelo]);

  const handleChange = (field: keyof ModeloFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const tipoVehiculo = Number(formValues.IdTipoVehiculo);
  const formIsInvalid = !Number.isInteger(tipoVehiculo) || !formValues.Modelo.trim() || !formValues.Descripcion.trim();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formIsInvalid) {
      return;
    }

    await onSubmit({
      IdTipoVehiculo: tipoVehiculo,
      Modelo: formValues.Modelo.trim(),
      Descripcion: formValues.Descripcion.trim(),
    });
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{mode === "create" ? "Agregar modelo" : "Editar modelo"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Id tipo vehículo" type="number" value={formValues.IdTipoVehiculo} onChange={handleChange("IdTipoVehiculo")} required fullWidth inputProps={{ min: 1 }} />
            <TextField label="Modelo" value={formValues.Modelo} onChange={handleChange("Modelo")} required fullWidth />
            <TextField label="Descripción" value={formValues.Descripcion} onChange={handleChange("Descripcion")} required fullWidth multiline minRows={3} />
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
