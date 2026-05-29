import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import React, { useMemo, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const drawerWidth = 220
const collapsedWidth = 56

type SidebarEntry = {
  label: string
  route: string
}

type SidebarSection = {
  title: SidebarEntry
  items: SidebarEntry[]
}

export default function LeftSidebar() {
  const location = useLocation()
  const [open, setOpen] = useState(true)
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({})

  const menuForPath = useMemo<SidebarSection[]>(() => {
    if (location.pathname.startsWith('/vehiculos')) {
      return [
        { title: { label: 'Mantenciones', route: 'mantenciones' }, items: [] },
        { title: { label: 'Talleres', route: 'talleres' }, items: [] },
        { title: { label: 'Vehículos', route: 'mis-vehiculos' }, items: [] },
        {
          title: { label: 'Marcas', route: 'marcas' },
          items: [{ label: 'Asociar Marca-Modelo', route: 'asociar-marca-modelo' }],
        },
        { title: { label: 'Modelos', route: 'modelos' }, items: [] },
      ]
    }
    return []
  }, [location.pathname])

  const toggleOpen = () => setOpen((s) => !s)
  const toggleSection = (title: string) => {
    setExpandedMap((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const segments = location.pathname.split('/').filter(Boolean)
  const baseSegment = segments[0] ?? ''
  const basePath = baseSegment ? `/${baseSegment}` : '/'

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
            const titleLabel = section.title.label
            const titleRoute = section.title.route
            const sectionKey = titleRoute
            const isExpanded = !!expandedMap[sectionKey]
            const hasChildren = section.items && section.items.length > 0
            return (
              <React.Fragment key={sectionKey}>
                {hasChildren ? (
                  <>
                    <ListItemButton onClick={() => toggleSection(sectionKey)}>
                      <ListItemText primary={open ? titleLabel : ''} />
                      {open && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {section.items.map((it) => {
                          const label = it.label
                          const route = it.route
                          return (
                            <ListItemButton
                              key={route}
                              sx={{ pl: 4 }}
                              component={RouterLink}
                              to={`${basePath}/${route}`}
                            >
                              <ListItemText primary={open ? label : ''} />
                            </ListItemButton>
                          )
                        })}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  (() => {
                    const target = titleRoute === baseSegment ? basePath : `${basePath}/${titleRoute}`
                    return (
                      <ListItemButton component={RouterLink} to={target}>
                        <ListItemText primary={open ? titleLabel : ''} />
                      </ListItemButton>
                    )
                  })()
                )}
              </React.Fragment>
            )
          })}
        </List>
      </Drawer>
    </Box>
  )
}
