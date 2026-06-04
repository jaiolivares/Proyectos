import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  description: string;
  createLabel: string;
  loading: boolean;
  submitting: boolean;
  onReload: () => void;
  onCreate: () => void;
}

export default function CrudPanel({ title, description, createLabel, loading, submitting, onReload, onCreate }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between">
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography color="text.secondary">{description}</Typography>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onReload} disabled={loading || submitting}>
            Recargar
          </Button>
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={onCreate} disabled={submitting}>
            {createLabel}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
