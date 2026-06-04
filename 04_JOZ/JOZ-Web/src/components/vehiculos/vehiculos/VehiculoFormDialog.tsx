import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo, useState } from "react";
import { MarcaModeloVehiculo } from "../../../models/vehiculos/marcaModeloVehiculo";
import { Vehiculo, VehiculoPayload } from "../../../models/vehiculos/vehiculo";
import { MarcaModeloVehiculoService } from "../../../services/vehiculos/marcaModeloVehiculo.service";
import { toDateInputValue } from "../shared/formatters";

type FormValues = {
  IdMarcaModeloVehiculo: string;
  Ano: string;
  NumeroMotor: string;
  NumeroChasis: string;
  Color: string;
  FechaCompra: string;
  MontoCompra: string;
  Vendido: boolean;
  FechaVenta: string;
  MontoVenta: string;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  vehiculo?: Vehiculo | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: VehiculoPayload) => Promise<void>;
};

const emptyForm: FormValues = {
  IdMarcaModeloVehiculo: "",
  Ano: "",
  NumeroMotor: "",
  NumeroChasis: "",
  Color: "",
  FechaCompra: "",
  MontoCompra: "",
  Vendido: false,
  FechaVenta: "",
  MontoVenta: "",
};

function mapVehiculoToFormValues(vehiculo?: Vehiculo | null): FormValues {
  if (!vehiculo) {
    return emptyForm;
  }

  return {
    IdMarcaModeloVehiculo: String(vehiculo.IdMarcaModeloVehiculo),
    Ano: String(vehiculo.Ano),
    NumeroMotor: vehiculo.NumeroMotor,
    NumeroChasis: vehiculo.NumeroChasis,
    Color: vehiculo.Color,
    FechaCompra: toDateInputValue(vehiculo.FechaCompra),
    MontoCompra: String(vehiculo.MontoCompra),
    Vendido: vehiculo.Vendido,
    FechaVenta: toDateInputValue(vehiculo.FechaVenta),
    MontoVenta: vehiculo.MontoVenta == null ? "" : String(vehiculo.MontoVenta),
  };
}

export default function VehiculoFormDialog({ open, mode, vehiculo, loading, onClose, onSubmit }: Props) {
  const relationService = useMemo(() => new MarcaModeloVehiculoService(), []);
  const [formValues, setFormValues] = useState<FormValues>(emptyForm);
  const [relations, setRelations] = useState<MarcaModeloVehiculo[]>([]);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFormValues(mapVehiculoToFormValues(vehiculo));
    }
  }, [open, vehiculo]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const loadOptions = async () => {
      setOptionsError(null);

      try {
        const data = await relationService.fetchAll();
        setRelations(data);
      } catch (error: any) {
        setRelations([]);
        setOptionsError(error?.message || "No fue posible cargar las asociaciones marca-modelo");
      }
    };

    void loadOptions();
  }, [open, relationService]);

  const handleChange = (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === "Vendido" ? event.target.checked : event.target.value;
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const relationId = Number(formValues.IdMarcaModeloVehiculo);
  const ano = Number(formValues.Ano);
  const montoCompra = Number(formValues.MontoCompra);
  const montoVenta = formValues.MontoVenta.trim() ? Number(formValues.MontoVenta) : null;
  const selectedRelation = relations.find((option) => option.Id === relationId) ?? null;
  const formIsInvalid = !selectedRelation || !Number.isInteger(ano) || !formValues.NumeroMotor.trim() || !formValues.NumeroChasis.trim() || !formValues.Color.trim() || !formValues.FechaCompra || Number.isNaN(montoCompra);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formIsInvalid) {
      return;
    }

    const payload: VehiculoPayload = {
      IdMarcaModeloVehiculo: relationId,
      Ano: ano,
      NumeroMotor: formValues.NumeroMotor.trim(),
      NumeroChasis: formValues.NumeroChasis.trim(),
      Color: formValues.Color.trim(),
      FechaCompra: formValues.FechaCompra,
      MontoCompra: montoCompra,
    };

    if (mode === "edit") {
      payload.Vendido = formValues.Vendido;
      payload.FechaVenta = formValues.Vendido && formValues.FechaVenta ? formValues.FechaVenta : null;
      payload.MontoVenta = formValues.Vendido ? montoVenta : null;
    }

    await onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{mode === "create" ? "Agregar vehículo" : "Editar vehículo"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {optionsError && <Alert severity="error">{optionsError}</Alert>}
            <Autocomplete
              options={relations}
              value={selectedRelation}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
              getOptionLabel={(option) => `#${option.Id} · Marca ${option.IdMarca} / Modelo ${option.IdModelo}`}
              noOptionsText="No hay asociaciones disponibles"
              onChange={(_, value) => {
                setFormValues((prev) => ({ ...prev, IdMarcaModeloVehiculo: value ? String(value.Id) : "" }));
              }}
              renderInput={(params) => <TextField {...params} label="Marca-modelo" required />}
            />
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField label="Año" type="number" value={formValues.Ano} onChange={handleChange("Ano")} required fullWidth inputProps={{ min: 1900 }} />
              <TextField label="Color" value={formValues.Color} onChange={handleChange("Color")} required fullWidth />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField label="Número motor" value={formValues.NumeroMotor} onChange={handleChange("NumeroMotor")} required fullWidth />
              <TextField label="Número chasis" value={formValues.NumeroChasis} onChange={handleChange("NumeroChasis")} required fullWidth />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField label="Fecha compra" type="date" value={formValues.FechaCompra} onChange={handleChange("FechaCompra")} required fullWidth InputLabelProps={{ shrink: true }} />
              <TextField label="Monto compra" type="number" value={formValues.MontoCompra} onChange={handleChange("MontoCompra")} required fullWidth inputProps={{ min: 0 }} />
            </Stack>
            {mode === "edit" && (
              <>
                <FormControlLabel control={<Checkbox checked={formValues.Vendido} onChange={handleChange("Vendido")} />} label="Vehículo vendido" />
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField label="Fecha venta" type="date" value={formValues.FechaVenta} onChange={handleChange("FechaVenta")} fullWidth InputLabelProps={{ shrink: true }} disabled={!formValues.Vendido} />
                  <TextField label="Monto venta" type="number" value={formValues.MontoVenta} onChange={handleChange("MontoVenta")} fullWidth inputProps={{ min: 0 }} disabled={!formValues.Vendido} />
                </Stack>
              </>
            )}
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
