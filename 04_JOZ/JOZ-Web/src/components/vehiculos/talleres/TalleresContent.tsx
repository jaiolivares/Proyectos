import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { Taller } from "../../../models/vehiculos/taller";
import PageLoader from "../../feedback/PageLoader";
import TallerTable from "./TallerTable";

interface Props {
  talleres: Taller[];
  loading: boolean;
  error: string | null;
  success: string | null;
  onCloseSuccess: () => void;
  onEdit: (taller: Taller) => void;
  onDelete: (taller: Taller) => void;
}

export default function TalleresContent({ talleres, loading, error, success, onCloseSuccess, onEdit, onDelete }: Props) {
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success" onClose={onCloseSuccess}>
          {success}
        </Alert>
      )}

      {loading ? (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <PageLoader label="Cargando talleres..." />
        </Paper>
      ) : (
        <TallerTable talleres={talleres} onEdit={onEdit} onDelete={onDelete} />
      )}
    </>
  );
}
