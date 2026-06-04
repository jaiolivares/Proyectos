import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { CrudEntity } from "../../../models/vehiculos/crud";

interface Props<TItem extends CrudEntity> {
  open: boolean;
  title: string;
  item?: TItem | null;
  loading?: boolean;
  getDescription: (item?: TItem | null) => string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteDialog<TItem extends CrudEntity>({ open, title, item, loading, getDescription, onClose, onConfirm }: Props<TItem>) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{getDescription(item)}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={() => void onConfirm()} color="error" variant="contained" disabled={loading || !item}>
          {loading ? "Eliminando..." : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
