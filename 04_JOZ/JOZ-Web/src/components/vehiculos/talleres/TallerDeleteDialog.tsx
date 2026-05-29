import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { Taller } from "../../../models/vehiculos/taller";

type Props = {
  open: boolean;
  taller?: Taller | null;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export default function TallerDeleteDialog({ open, taller, loading, onClose, onConfirm }: Props) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle>Eliminar taller</DialogTitle>
      <DialogContent>
        <Typography>{taller ? `Se eliminará el taller ${taller.Nombre}. Esta acción no se puede deshacer.` : "Selecciona un taller válido para eliminar."}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={() => void onConfirm()} color="error" variant="contained" disabled={loading || !taller}>
          {loading ? "Eliminando..." : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
