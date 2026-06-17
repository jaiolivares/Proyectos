import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useMemo, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const drawerWidth = 220;
const collapsedWidth = 56;

type SidebarEntry = {
  label: string;
  route: string;
};

type SidebarSection = {
  title: SidebarEntry;
  items: SidebarEntry[];
};

interface Props {
  variant?: "permanent" | "temporary";
  open?: boolean;
  onClose?: () => void;
}

export default function LeftSidebar({ variant = "permanent", open: mobileOpen = false, onClose }: Props) {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});
  const isTemporary = variant === "temporary";
  const clickable = open || isTemporary;

  const menuForPath = useMemo<SidebarSection[]>(() => {
    if (location.pathname.startsWith("/vehiculos")) {
      return [
        { title: { label: "Mantenciones", route: "mantenciones" }, items: [{ label: "Detalle mantenciones", route: "detalle-mantenciones" }] },
        { title: { label: "Talleres", route: "talleres" }, items: [] },
        { title: { label: "Vehículos", route: "mis-vehiculos" }, items: [] },
        {
          title: { label: "Marcas", route: "marcas" },
          items: [{ label: "Asociar Marca-Modelo", route: "asociar-marca-modelo" }],
        },
        { title: { label: "Modelos", route: "modelos" }, items: [] },
      ];
    }
    return [];
  }, [location.pathname]);

  const toggleOpen = () => setOpen((s) => !s);
  const toggleSection = (title: string) => {
    setExpandedMap((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleNavigate = () => {
    if (isTemporary) {
      onClose?.();
    }
  };

  const segments = location.pathname.split("/").filter(Boolean);
  const baseSegment = segments[0] ?? "";
  const basePath = baseSegment ? `/${baseSegment}` : "/";
  const drawerDisplayWidth = isTemporary ? drawerWidth : open ? drawerWidth : collapsedWidth;

  const isActivePath = (path: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <Box component="nav" aria-label="sidebar">
      <Drawer
        variant={variant}
        open={isTemporary ? mobileOpen : open}
        onClose={onClose}
        ModalProps={isTemporary ? { keepMounted: true } : undefined}
        sx={{
          width: drawerDisplayWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerDisplayWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", px: 1, py: 1 }}>
          <IconButton onClick={isTemporary ? onClose : toggleOpen} size="small">
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          {(open || isTemporary) && (
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Menú
            </Typography>
          )}
        </Box>
        <Divider />

        <List>
          {menuForPath.map((section) => {
            const titleLabel = section.title.label;
            const titleRoute = section.title.route;
            const sectionKey = titleRoute;
            const isExpanded = !!expandedMap[sectionKey];
            const hasChildren = section.items && section.items.length > 0;
            return (
              <React.Fragment key={sectionKey}>
                {hasChildren ? (
                  <>
                    {(() => {
                      const titleTarget = titleRoute === baseSegment ? basePath : `${basePath}/${titleRoute}`;
                      return (
                        <ListItemButton
                          onClick={() => toggleSection(sectionKey)}
                          selected={isActivePath(titleTarget)}
                          sx={{
                            bgcolor: isActivePath(titleTarget) ? "rgba(0,0,0,0.08)" : "transparent",
                          }}
                        >
                          <ListItemText primary={open || isTemporary ? titleLabel : ""} />
                          {(open || isTemporary) && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
                        </ListItemButton>
                      );
                    })()}
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {section.items.map((it) => {
                          const label = it.label;
                          const route = it.route;
                          const itemTarget = `${basePath}/${route}`;
                          return (
                            <ListItemButton key={route} sx={{ pl: 4 }} component={clickable ? RouterLink : undefined} to={clickable ? itemTarget : undefined} onClick={clickable ? handleNavigate : undefined} selected={isActivePath(itemTarget)}>
                              <ListItemText primary={open || isTemporary ? label : ""} />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  (() => {
                    const target = titleRoute === baseSegment ? basePath : `${basePath}/${titleRoute}`;
                    return (
                      <ListItemButton
                        component={clickable ? RouterLink : undefined}
                        to={clickable ? target : undefined}
                        onClick={clickable ? handleNavigate : undefined}
                        selected={isActivePath(target)}
                        sx={{
                          bgcolor: isActivePath(target) ? "rgba(0,0,0,0.08)" : "transparent",
                        }}
                      >
                        <ListItemText primary={open || isTemporary ? titleLabel : ""} />
                      </ListItemButton>
                    );
                  })()
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
