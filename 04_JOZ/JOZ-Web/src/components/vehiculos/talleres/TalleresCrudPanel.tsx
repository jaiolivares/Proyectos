import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  loading: boolean;
  submitting: boolean;
  onReload: () => void;
  onCreate: () => void;
}

export default function TalleresCrudPanel({ loading, submitting, onReload, onCreate }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between">
        <Box>
          <Typography variant="h6">CRUD de talleres</Typography>
          <Typography color="text.secondary">Crea, edita, elimina y recarga talleres desde los endpoints protegidos de JOZ-Api.</Typography>
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
    </Paper>
  );
}
