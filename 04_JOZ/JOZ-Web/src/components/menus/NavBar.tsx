import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { PUBLIC_SITE_URL } from "../../config/appConfig";
import { APP_ROUTES } from "../../config/routes";
import { useAuthContext } from "../../contexts/AuthContext";
import { AUTH_STORAGE_KEY } from "../../models/auths/user";

interface Props {
  showSidebarToggle?: boolean;
  onOpenSidebar?: () => void;
}

export default function NavBar({ showSidebarToggle = false, onOpenSidebar }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthContext();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const isActive = (path: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    handleCloseNavMenu();

    // Eliminar credenciales locales y redirigir al sitio público
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch {}
      window.location.replace(PUBLIC_SITE_URL);
      return;
    }

    // Fallback para entornos no navegador
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ position: "relative" }}>
        {showSidebarToggle && (
          <IconButton size="large" aria-label="abrir menú lateral" onClick={onOpenSidebar} color="inherit" sx={{ mr: 1, display: { xs: "inline-flex", md: "none" } }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ mr: 2 }}>
          JOZ
        </Typography>

        {/* Centered desktop menu */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: { xs: "none", md: "flex" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button
            color="inherit"
            component={RouterLink}
            to={APP_ROUTES.home.path}
            sx={{
              bgcolor: isActive(APP_ROUTES.home.path) ? "rgba(255,255,255,0.15)" : "transparent",
              borderRadius: 1,
            }}
          >
            {APP_ROUTES.home.label}
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to={APP_ROUTES.vehiculos.path}
            sx={{
              bgcolor: isActive(APP_ROUTES.vehiculos.path) ? "rgba(255,255,255,0.15)" : "transparent",
              borderRadius: 1,
            }}
          >
            {APP_ROUTES.vehiculos.label}
          </Button>
        </Box>

        {/* Right-aligned logout on desktop */}
        <Box sx={{ ml: "auto", display: { xs: "none", md: "block" } }}>
          <Button color="inherit" onClick={handleLogout}>
            Salir
          </Button>
        </Box>

        {/* Mobile menu button */}
        <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
          <IconButton size="large" aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuItem component={RouterLink} to={APP_ROUTES.home.path} onClick={handleCloseNavMenu} selected={isActive(APP_ROUTES.home.path)}>
              {APP_ROUTES.home.label}
            </MenuItem>
            <MenuItem component={RouterLink} to={APP_ROUTES.vehiculos.path} onClick={handleCloseNavMenu} selected={isActive(APP_ROUTES.vehiculos.path)}>
              {APP_ROUTES.vehiculos.label}
            </MenuItem>
            <MenuItem onClick={handleLogout}>Salir</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
