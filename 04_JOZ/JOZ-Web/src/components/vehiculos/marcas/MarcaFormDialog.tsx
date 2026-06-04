import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Marca, MarcaPayload } from "../../../models/vehiculos/marca";

type MarcaFormValues = {
  Marca: string;
  Descripcion: string;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  marca?: Marca | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: MarcaPayload) => Promise<void>;
};

const emptyForm: MarcaFormValues = {
  Marca: "",
  Descripcion: "",
};

function mapMarcaToFormValues(marca?: Marca | null): MarcaFormValues {
  if (!marca) {
    return emptyForm;
  }

  return {
    Marca: marca.Marca,
    Descripcion: marca.Descripcion,
  };
}

export default function MarcaFormDialog({ open, mode, marca, loading, onClose, onSubmit }: Props) {
  const [formValues, setFormValues] = useState<MarcaFormValues>(emptyForm);

  useEffect(() => {
    if (open) {
      setFormValues(mapMarcaToFormValues(marca));
    }
  }, [open, marca]);

  const handleChange = (field: keyof MarcaFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const formIsInvalid = !formValues.Marca.trim() || !formValues.Descripcion.trim();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formIsInvalid) {
      return;
    }

    await onSubmit({
      Marca: formValues.Marca.trim(),
      Descripcion: formValues.Descripcion.trim(),
    });
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{mode === "create" ? "Agregar marca" : "Editar marca"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Marca" value={formValues.Marca} onChange={handleChange("Marca")} required fullWidth />
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
