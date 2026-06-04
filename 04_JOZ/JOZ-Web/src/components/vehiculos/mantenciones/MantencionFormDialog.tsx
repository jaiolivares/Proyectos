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
import { Mantencion, MantencionPayload } from "../../../models/vehiculos/mantencion";
import { Taller } from "../../../models/vehiculos/taller";
import { Vehiculo } from "../../../models/vehiculos/vehiculo";
import { TallerService } from "../../../services/vehiculos/taller.service";
import { VehiculoService } from "../../../services/vehiculos/vehiculo.service";
import { toDateInputValue } from "../shared/formatters";

type FormValues = {
  IdVehiculo: string;
  Fecha: string;
  IdTaller: string;
  Servicio: string;
  MontoTotal: string;
  Kilometraje: string;
  Boleta: string;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  mantencion?: Mantencion | null;
  userId?: number;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: MantencionPayload) => Promise<void>;
};

const emptyForm: FormValues = {
  IdVehiculo: "",
  Fecha: "",
  IdTaller: "",
  Servicio: "",
  MontoTotal: "",
  Kilometraje: "",
  Boleta: "",
};

function mapMantencionToFormValues(mantencion?: Mantencion | null): FormValues {
  if (!mantencion) {
    return emptyForm;
  }

  return {
    IdVehiculo: String(mantencion.IdVehiculo),
    Fecha: toDateInputValue(mantencion.Fecha),
    IdTaller: String(mantencion.IdTaller),
    Servicio: mantencion.Servicio,
    MontoTotal: String(mantencion.MontoTotal),
    Kilometraje: mantencion.Kilometraje == null ? "" : String(mantencion.Kilometraje),
    Boleta: mantencion.Boleta ?? "",
  };
}

export default function MantencionFormDialog({ open, mode, mantencion, userId, loading, onClose, onSubmit }: Props) {
  const vehiculoService = useMemo(() => new VehiculoService(), []);
  const tallerService = useMemo(() => new TallerService(), []);
  const [formValues, setFormValues] = useState<FormValues>(emptyForm);
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFormValues(mapMantencionToFormValues(mantencion));
    }
  }, [open, mantencion]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const loadOptions = async () => {
      setOptionsError(null);

      try {
        const [vehiculosData, talleresData] = await Promise.all([vehiculoService.fetchAll(), tallerService.fetchAll()]);
        setVehiculos(vehiculosData);
        setTalleres(talleresData);
      } catch (error: any) {
        setVehiculos([]);
        setTalleres([]);
        setOptionsError(error?.message || "No fue posible cargar vehículos y talleres");
      }
    };

    void loadOptions();
  }, [open, tallerService, vehiculoService]);

  const handleChange = (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const vehiculoId = Number(formValues.IdVehiculo);
  const tallerId = Number(formValues.IdTaller);
  const montoTotal = Number(formValues.MontoTotal);
  const kilometraje = formValues.Kilometraje.trim() ? Number(formValues.Kilometraje) : null;
  const selectedVehiculo = vehiculos.find((option) => option.Id === vehiculoId) ?? null;
  const selectedTaller = talleres.find((option) => option.Id === tallerId) ?? null;
  const createIsMissingUser = mode === "create" && !userId;
  const formIsInvalid = !selectedVehiculo || !selectedTaller || !formValues.Fecha || !formValues.Servicio.trim() || Number.isNaN(montoTotal) || createIsMissingUser;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formIsInvalid) {
      return;
    }

    const payload: MantencionPayload = {
      IdVehiculo: vehiculoId,
      Fecha: formValues.Fecha,
      IdTaller: tallerId,
      Servicio: formValues.Servicio.trim(),
      MontoTotal: montoTotal,
      Kilometraje: kilometraje,
      Boleta: formValues.Boleta.trim() || null,
    };

    if (mode === "create" && userId) {
      payload.IdUsuario = userId;
    }

    await onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{mode === "create" ? "Agregar mantención" : "Editar mantención"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {createIsMissingUser && <Alert severity="warning">No se encontró el usuario autenticado para registrar la mantención.</Alert>}
            {optionsError && <Alert severity="error">{optionsError}</Alert>}
            <Autocomplete
              options={vehiculos}
              value={selectedVehiculo}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
              getOptionLabel={(option) => `Vehículo #${option.Id} · ${option.Ano} · ${option.NumeroMotor}`}
              noOptionsText="No hay vehículos disponibles"
              onChange={(_, value) => {
                setFormValues((prev) => ({ ...prev, IdVehiculo: value ? String(value.Id) : "" }));
              }}
              renderInput={(params) => <TextField {...params} label="Vehículo" required />}
            />
            <Autocomplete
              options={talleres}
              value={selectedTaller}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
              getOptionLabel={(option) => `${option.Nombre} (#${option.Id})`}
              noOptionsText="No hay talleres disponibles"
              onChange={(_, value) => {
                setFormValues((prev) => ({ ...prev, IdTaller: value ? String(value.Id) : "" }));
              }}
              renderInput={(params) => <TextField {...params} label="Taller" required />}
            />
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField label="Fecha" type="date" value={formValues.Fecha} onChange={handleChange("Fecha")} required fullWidth InputLabelProps={{ shrink: true }} />
              <TextField label="Monto total" type="number" value={formValues.MontoTotal} onChange={handleChange("MontoTotal")} required fullWidth inputProps={{ min: 0 }} />
            </Stack>
            <TextField label="Servicio" value={formValues.Servicio} onChange={handleChange("Servicio")} required fullWidth />
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField label="Kilometraje" type="number" value={formValues.Kilometraje} onChange={handleChange("Kilometraje")} fullWidth inputProps={{ min: 0 }} />
              <TextField label="Boleta" value={formValues.Boleta} onChange={handleChange("Boleta")} fullWidth />
            </Stack>
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
