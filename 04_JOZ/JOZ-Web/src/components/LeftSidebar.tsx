import React, { useMemo, useState } from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse,
  Typography,
} from '@mui/material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import MenuIcon from '@mui/icons-material/Menu'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

const drawerWidth = 220
const collapsedWidth = 56

export default function LeftSidebar() {
  const location = useLocation()
  const [open, setOpen] = useState(true)
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({})

  const menuForPath = useMemo(() => {
    // mapea rutas a secciones con subitems
    // if (location.pathname.startsWith('/welcome')) {
    //   return [
    //     { title: 'Welcome', items: ['submenu1', 'submenu2'] },
    //   ]
    // }
    if (location.pathname.startsWith('/items')) {
      return [
        { title: 'CRUD', items: ['Listar', 'Crear'] },
        { title: 'ADMIN', items: ['Listar', 'Asignar', 'Activar', 'Quitar'] },
      ]
    }
    return []
  }, [location.pathname])

  const toggleOpen = () => setOpen((s) => !s)
  const toggleSection = (title: string) => {
    setExpandedMap((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <Box component="nav" aria-label="sidebar">
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 1 }}>
          <IconButton onClick={toggleOpen} size="small">
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          {open && (
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Menú
            </Typography>
          )}
        </Box>
        <Divider />

        <List>
          {menuForPath.map((section) => {
            const isExpanded = !!expandedMap[section.title]
            return (
              <React.Fragment key={section.title}>
                <ListItemButton onClick={() => toggleSection(section.title)}>
                  <ListItemText primary={open ? section.title : ''} />
                  {open && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {section.items.map((it) => (
                      <ListItemButton
                        key={it}
                        sx={{ pl: 4 }}
                        component={RouterLink}
                        to={`${location.pathname}/${it.toLowerCase()}`}
                      >
                        <ListItemText primary={open ? it : ''} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            )
          })}
        </List>
      </Drawer>
    </Box>
  )
}
