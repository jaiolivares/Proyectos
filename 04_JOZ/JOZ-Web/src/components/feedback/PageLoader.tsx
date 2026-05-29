import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

type PageLoaderProps = {
  label?: string;
  size?: number;
};

function CircularProgressWithLabel({ value, size = 72 }: { value: number; size?: number }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={value} size={size} />
      <Box
        sx={{
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        }}
      >
        <Typography component="div" variant="caption" sx={{ fontWeight: 700 }} color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function PageLoader({ label = "Cargando...", size }: PageLoaderProps) {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((previous) => {
        if (previous >= 90) {
          return 90;
        }

        return Math.min(previous + Math.max(4, (100 - previous) / 6), 90);
      });
    }, 180);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <CircularProgressWithLabel value={progress} size={size} />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}
