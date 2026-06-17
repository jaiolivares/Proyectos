import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
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
  onFilterChange?: (filters: { Nombre?: string; Comuna?: string; Direccion?: string }) => void;
  nombreOptions?: string[];
  comunaOptions?: string[];
  direccionOptions?: string[];
}

export default function TalleresCrudPanel({ loading, submitting, onReload, onCreate, onFilterChange, nombreOptions = [], comunaOptions = [], direccionOptions = [] }: Props) {
  const [nombre, setNombre] = React.useState("");
  const [comuna, setComuna] = React.useState("");
  const [direccion, setDireccion] = React.useState("");

  const clearFilters = () => {
    setNombre("");
    setComuna("");
    setDireccion("");
    onFilterChange?.({});
  };

  const changeNombre = (value: string) => {
    setNombre(value);
    onFilterChange?.({ Nombre: value.trim() || undefined, Comuna: comuna.trim() || undefined, Direccion: direccion.trim() || undefined });
  };

  const changeComuna = (value: string) => {
    setComuna(value);
    onFilterChange?.({ Nombre: nombre.trim() || undefined, Comuna: value.trim() || undefined, Direccion: direccion.trim() || undefined });
  };

  const changeDireccion = (value: string) => {
    setDireccion(value);
    onFilterChange?.({ Nombre: nombre.trim() || undefined, Comuna: comuna.trim() || undefined, Direccion: value.trim() || undefined });
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between">
          <Box>
            <Typography variant="h6">Filtros</Typography>
            <Typography color="text.secondary">Filtra los talleres por nombre, comuna o dirección.</Typography>
          </Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onReload} disabled={loading || submitting}>
              Recargar
            </Button>
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={onCreate} disabled={submitting}>
              Agregar taller
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(320px, 2.4fr) minmax(220px, 1.2fr) minmax(220px, 1.4fr) auto",
            },
            alignItems: "center",
          }}
        >
          <Autocomplete freeSolo options={nombreOptions} inputValue={nombre} onInputChange={(_, v) => changeNombre(v)} renderInput={(params) => <TextField {...params} fullWidth label="Nombre" size="small" />} />
          <Autocomplete freeSolo options={comunaOptions} inputValue={comuna} onInputChange={(_, v) => changeComuna(v)} renderInput={(params) => <TextField {...params} fullWidth label="Comuna" size="small" />} />
          <Autocomplete freeSolo options={direccionOptions} inputValue={direccion} onInputChange={(_, v) => changeDireccion(v)} renderInput={(params) => <TextField {...params} fullWidth label="Dirección" size="small" />} />
          <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
            <Button variant="text" onClick={clearFilters} disabled={!nombre && !comuna && !direccion}>
              Limpiar
            </Button>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
