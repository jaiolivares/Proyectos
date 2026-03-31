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
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          JOZ
        </Typography>

        {/* Mobile menu button */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
              Bienvenida
            </MenuItem>
            <MenuItem component={RouterLink} to="/items" onClick={handleCloseNavMenu}>
              Items
            </MenuItem>
            <MenuItem component={RouterLink} to="/" onClick={handleCloseNavMenu}>
              Salir
            </MenuItem>
          </Menu>
        </Box>

        {/* Desktop buttons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={RouterLink} to="/welcome">
            Bienvenida
          </Button>
          <Button color="inherit" component={RouterLink} to="/items">
            Items
          </Button>
          <Button color="inherit" component={RouterLink} to="/">
            Salir
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
