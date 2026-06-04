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
import { Marca } from "../../../models/vehiculos/marca";
import { MarcaModeloVehiculo, MarcaModeloVehiculoPayload } from "../../../models/vehiculos/marcaModeloVehiculo";
import { Modelo } from "../../../models/vehiculos/modelo";
import { MarcaService } from "../../../services/vehiculos/marca.service";
import { ModeloService } from "../../../services/vehiculos/modelo.service";

type FormValues = {
  IdMarca: string;
  IdModelo: string;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  item?: MarcaModeloVehiculo | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: MarcaModeloVehiculoPayload) => Promise<void>;
};

const emptyForm: FormValues = {
  IdMarca: "",
  IdModelo: "",
};

function mapItemToFormValues(item?: MarcaModeloVehiculo | null): FormValues {
  if (!item) {
    return emptyForm;
  }

  return {
    IdMarca: String(item.IdMarca),
    IdModelo: String(item.IdModelo),
  };
}

export default function MarcaModeloVehiculoFormDialog({ open, mode, item, loading, onClose, onSubmit }: Props) {
  const marcaService = useMemo(() => new MarcaService(), []);
  const modeloService = useMemo(() => new ModeloService(), []);
  const [formValues, setFormValues] = useState<FormValues>(emptyForm);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
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
        const [marcasData, modelosData] = await Promise.all([marcaService.fetchAll(), modeloService.fetchAll()]);
        setMarcas(marcasData);
        setModelos(modelosData);
      } catch (error: any) {
        setMarcas([]);
        setModelos([]);
        setOptionsError(error?.message || "No fue posible cargar marcas y modelos");
      }
    };

    void loadOptions();
  }, [marcaService, modeloService, open]);

  const marcaId = Number(formValues.IdMarca);
  const modeloId = Number(formValues.IdModelo);
  const selectedMarca = marcas.find((option) => option.Id === marcaId) ?? null;
  const selectedModelo = modelos.find((option) => option.Id === modeloId) ?? null;
  const formIsInvalid = !selectedMarca || !selectedModelo;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formIsInvalid) {
      return;
    }

    await onSubmit({
      IdMarca: marcaId,
      IdModelo: modeloId,
    });
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{mode === "create" ? "Agregar asociación" : "Editar asociación"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {optionsError && <Alert severity="error">{optionsError}</Alert>}
            <Autocomplete
              options={marcas}
              value={selectedMarca}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
              getOptionLabel={(option) => `${option.Marca} (#${option.Id})`}
              noOptionsText="No hay marcas disponibles"
              onChange={(_, value) => {
                setFormValues((prev) => ({ ...prev, IdMarca: value ? String(value.Id) : "" }));
              }}
              renderInput={(params) => <TextField {...params} label="Marca" required />}
            />
            <Autocomplete
              options={modelos}
              value={selectedModelo}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
              getOptionLabel={(option) => `${option.Modelo} (#${option.Id})`}
              noOptionsText="No hay modelos disponibles"
              onChange={(_, value) => {
                setFormValues((prev) => ({ ...prev, IdModelo: value ? String(value.Id) : "" }));
              }}
              renderInput={(params) => <TextField {...params} label="Modelo" required />}
            />
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
