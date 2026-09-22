import { AddCircleOutline as AddCircleOutlineIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";

interface Props {
  loading: boolean;
  submitting: boolean;
  onReload: () => void;
  onCreate: () => void;
  onFilterChange?: (filters: { Ano?: string; Color?: string; Motor?: string }) => void;
  anoOptions?: string[];
  colorOptions?: string[];
  motorOptions?: string[];
}

export default function VehiculosFilters({ loading, submitting, onReload, onCreate, onFilterChange, anoOptions = [], colorOptions = [], motorOptions = [] }: Props) {
  const [ano, setAno] = React.useState("");
  const [color, setColor] = React.useState("");
  const [motor, setMotor] = React.useState("");

  const clearFilters = () => {
    setAno("");
    setColor("");
    setMotor("");
    onFilterChange?.({});
  };

  const changeAno = (value: string) => {
    setAno(value);
    onFilterChange?.({ Ano: value.trim() || undefined, Color: color.trim() || undefined, Motor: motor.trim() || undefined });
  };

  const changeColor = (value: string) => {
    setColor(value);
    onFilterChange?.({ Ano: ano.trim() || undefined, Color: value.trim() || undefined, Motor: motor.trim() || undefined });
  };

  const changeMotor = (value: string) => {
    setMotor(value);
    onFilterChange?.({ Ano: ano.trim() || undefined, Color: color.trim() || undefined, Motor: value.trim() || undefined });
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between">
          <Box>
            <Typography variant="h6">Filtros</Typography>
            <Typography color="text.secondary">Filtra los vehículos por año, color o número de motor.</Typography>
          </Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onReload} disabled={loading || submitting}>
              Recargar
            </Button>
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={onCreate} disabled={submitting}>
              Agregar vehículo
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr 1fr auto",
            },
            alignItems: "center",
          }}
        >
          <Autocomplete freeSolo options={anoOptions} inputValue={ano} onInputChange={(_, v) => changeAno(v)} renderInput={(params) => <TextField {...params} fullWidth label="Año" size="small" />} />
          <Autocomplete freeSolo options={colorOptions} inputValue={color} onInputChange={(_, v) => changeColor(v)} renderInput={(params) => <TextField {...params} fullWidth label="Color" size="small" />} />
          <Autocomplete freeSolo options={motorOptions} inputValue={motor} onInputChange={(_, v) => changeMotor(v)} renderInput={(params) => <TextField {...params} fullWidth label="Motor" size="small" />} />
          <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
            <Button variant="text" onClick={clearFilters} disabled={!ano && !color && !motor}>
              Limpiar
            </Button>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
