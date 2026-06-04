import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  description: string;
  displayName?: string;
}

export default function CrudPageHeader({ title, description, displayName }: Props) {
  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        {description} Sesión actual: {displayName}.
      </Typography>
    </Box>
  );
}
