import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { Vehiculo } from "../../../models/vehiculos/vehiculo";
import PageLoader from "../../feedback/PageLoader";
import VehiculoTable from "./VehiculoTable";

interface Props {
  vehiculos: Vehiculo[];
  totalCount?: number;
  loading: boolean;
  error: string | null;
  success: string | null;
  onCloseSuccess: () => void;
  onEdit: (vehiculo: Vehiculo) => void;
  onDelete: (vehiculo: Vehiculo) => void;
}

export default function VehiculosMessage({ vehiculos, totalCount, loading, error, success, onCloseSuccess, onEdit, onDelete }: Props) {
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
          <PageLoader label="Cargando vehículos..." />
        </Paper>
      ) : (
        <VehiculoTable vehiculos={vehiculos} onEdit={onEdit} onDelete={onDelete} />
      )}
    </>
  );
}
