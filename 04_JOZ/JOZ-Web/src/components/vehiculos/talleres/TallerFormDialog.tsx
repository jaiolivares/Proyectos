import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { Comuna } from "../../../models/ubicaciones/comuna";
import { Taller, TallerPayload } from "../../../models/vehiculos/taller";
import { ComunaService } from "../../../services/ubicaciones/comuna.service";

type TallerFormValues = {
  Nombre: string;
  IdComuna: string;
  Direccion: string;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  taller?: Taller | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: TallerPayload) => Promise<void>;
};

const emptyForm: TallerFormValues = {
  Nombre: "",
  IdComuna: "",
  Direccion: "",
};

function mapTallerToFormValues(taller?: Taller | null): TallerFormValues {
  if (!taller) {
    return emptyForm;
  }

  return {
    Nombre: taller.Nombre,
    IdComuna: String(taller.IdComuna),
    Direccion: taller.Direccion,
  };
}

export default function TallerFormDialog({ open, mode, taller, loading, onClose, onSubmit }: Props) {
  const comunaService = useMemo(() => new ComunaService(), []);
  const [formValues, setFormValues] = useState<TallerFormValues>(emptyForm);
  const [comunas, setComunas] = useState<Comuna[]>([]);
  const [loadingComunas, setLoadingComunas] = useState(false);
  const [comunasError, setComunasError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFormValues(mapTallerToFormValues(taller));
    }
  }, [open, taller]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const loadComunas = async () => {
      setLoadingComunas(true);
      setComunasError(null);

      try {
        const data = await comunaService.fetchAll();
        setComunas([...data].sort((left, right) => left.Descripcion.localeCompare(right.Descripcion, "es")));
      } catch (error: any) {
        setComunas([]);
        setComunasError(error?.message || "No fue posible cargar las comunas");
      } finally {
        setLoadingComunas(false);
      }
    };

    void loadComunas();
  }, [comunaService, open]);

  const handleChange = (field: keyof TallerFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const comunaValue = Number(formValues.IdComuna);
  const comunaIsInvalid = formValues.IdComuna.trim() !== "" && !Number.isInteger(comunaValue);
  const selectedComunaIsMissing = formValues.IdComuna.trim() !== "" && comunas.length > 0 && !comunas.some((comuna) => comuna.Id === comunaValue);
  const selectedComuna = comunas.find((comuna) => comuna.Id === comunaValue) ?? null;
  const formIsInvalid = !formValues.Nombre.trim() || !formValues.Direccion.trim() || !formValues.IdComuna.trim() || comunaIsInvalid || selectedComunaIsMissing || loadingComunas || comunas.length === 0;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formIsInvalid) {
      return;
    }

    await onSubmit({
      Nombre: formValues.Nombre.trim(),
      IdComuna: comunaValue,
      Direccion: formValues.Direccion.trim(),
    });
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{mode === "create" ? "Agregar taller" : "Editar taller"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {comunasError && <Alert severity="error">{comunasError}</Alert>}
            <TextField label="Nombre" value={formValues.Nombre} onChange={handleChange("Nombre")} required fullWidth />
            <Autocomplete
              options={comunas}
              value={selectedComuna}
              loading={loadingComunas}
              disabled={loadingComunas || comunas.length === 0}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
              getOptionLabel={(option) => option.Descripcion}
              noOptionsText="No hay comunas disponibles"
              loadingText="Cargando comunas..."
              onChange={(_, value) => {
                setFormValues((prev) => ({
                  ...prev,
                  IdComuna: value ? String(value.Id) : "",
                }));
              }}
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.Id}>
                  <Box>
                    <Typography variant="body1">{option.Descripcion}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.Codigo}
                    </Typography>
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Comuna"
                  required
                  error={comunaIsInvalid || selectedComunaIsMissing}
                  helperText={
                    loadingComunas ? "Cargando comunas..." : comunas.length === 0 ? "No hay comunas disponibles desde la API" : selectedComunaIsMissing ? "La comuna seleccionada ya no existe en la API" : "Busca por nombre y selecciona una comuna"
                  }
                />
              )}
            />
            <TextField label="Dirección" value={formValues.Direccion} onChange={handleChange("Direccion")} required fullWidth multiline minRows={2} />
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
