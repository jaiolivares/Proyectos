import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { ReactNode } from "react";
import PageLoader from "../../feedback/PageLoader";

interface Props {
  loading: boolean;
  error: string | null;
  success: string | null;
  loadingLabel: string;
  onCloseSuccess: () => void;
  children: ReactNode;
}

export default function CrudContent({ loading, error, success, loadingLabel, onCloseSuccess, children }: Props) {
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
          <PageLoader label={loadingLabel} />
        </Paper>
      ) : (
        children
      )}
    </>
  );
}
