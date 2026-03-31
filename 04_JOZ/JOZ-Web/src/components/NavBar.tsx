import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

export default function NavBar() {
  const { user } = useAuthContext()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
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
          <Button color="inherit" component={RouterLink} to="/welcome">
            Inicio
          </Button>
          <Button color="inherit" component={RouterLink} to="/items">
            Items
          </Button>
        </Box>

        {/* Right-aligned logout on desktop */}
        <Box sx={{ ml: 'auto', display: { xs: 'none', md: 'block' } }}>
          <Button color="inherit" component={RouterLink} to="/">
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
            <MenuItem component={RouterLink} to="/welcome" onClick={handleCloseNavMenu}>
              Inicio
            </MenuItem>
            <MenuItem component={RouterLink} to="/items" onClick={handleCloseNavMenu}>
              Items
            </MenuItem>
            <MenuItem component={RouterLink} to="/" onClick={handleCloseNavMenu}>
              Salir
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
