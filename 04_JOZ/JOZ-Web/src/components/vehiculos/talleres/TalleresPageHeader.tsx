import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  displayName?: string;
}

export default function TalleresPageHeader({ displayName }: Props) {
  return (
    <Box>
      <Typography variant="h4">Talleres</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Administra el catálogo de talleres conectado a tu API. Sesión actual: {displayName}.
      </Typography>
    </Box>
  );
}
