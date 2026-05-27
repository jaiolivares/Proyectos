import MenuIcon from '@mui/icons-material/Menu'
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { PUBLIC_SITE_URL } from '../../config/appConfig'
import { useAuthContext } from '../../contexts/AuthContext'
import { AUTH_STORAGE_KEY } from '../../models/user'

export default function NavBar() {
  const navigate = useNavigate()
  const { logout } = useAuthContext()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleLogout = () => {
    handleCloseNavMenu()

    // Eliminar credenciales locales y redirigir al sitio público
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
      } catch {}
      window.location.replace(PUBLIC_SITE_URL)
      return
    }

    // Fallback para entornos no navegador
    logout()
    navigate('/')
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ position: 'relative' }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          JOZ
        </Typography>

        {/* Centered desktop menu */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'flex' },
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Button color="inherit" component={RouterLink} to="/home">
            Inicio
          </Button>
          <Button color="inherit" component={RouterLink} to="/vehiculos">
            Vehículos
          </Button>
        </Box>

        {/* Right-aligned logout on desktop */}
        <Box sx={{ ml: 'auto', display: { xs: 'none', md: 'block' } }}>
          <Button color="inherit" onClick={handleLogout}>
            Salir
          </Button>
        </Box>

        {/* Mobile menu button */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuItem component={RouterLink} to="/home" onClick={handleCloseNavMenu}>
              Inicio
            </MenuItem>
            <MenuItem component={RouterLink} to="/vehiculos" onClick={handleCloseNavMenu}>
              Vehículos
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Salir
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
