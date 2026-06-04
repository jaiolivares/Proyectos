export const ROUTE_PATHS = {
  root: "/",
  login: "/login",
  home: "/home",
  vehiculos: "/vehiculos",
  vehiculosTalleres: "/vehiculos/talleres",
  vehiculosMantenciones: "/vehiculos/mantenciones",
  vehiculosDetalleMantenciones: "/vehiculos/detalle-mantenciones",
  vehiculosMisVehiculos: "/vehiculos/mis-vehiculos",
  vehiculosMarcas: "/vehiculos/marcas",
  vehiculosModelos: "/vehiculos/modelos",
  vehiculosAsociarMarcaModelo: "/vehiculos/asociar-marca-modelo",
} as const;

type AppRoute = {
  path: string;
  label: string;
  breadcrumbClickable?: boolean;
};

export const APP_ROUTES: Record<string, AppRoute> = {
  root: {
    path: ROUTE_PATHS.root,
    label: "Inicio",
    breadcrumbClickable: false,
  },
  login: {
    path: ROUTE_PATHS.login,
    label: "Login",
    breadcrumbClickable: false,
  },
  home: {
    path: ROUTE_PATHS.home,
    label: "Inicio",
    breadcrumbClickable: true,
  },
  vehiculos: {
    path: ROUTE_PATHS.vehiculos,
    label: "Vehículos",
    breadcrumbClickable: false,
  },
  vehiculosTalleres: {
    path: ROUTE_PATHS.vehiculosTalleres,
    label: "Talleres",
    breadcrumbClickable: true,
  },
  vehiculosMantenciones: {
    path: ROUTE_PATHS.vehiculosMantenciones,
    label: "Mantenciones",
    breadcrumbClickable: true,
  },
  vehiculosDetalleMantenciones: {
    path: ROUTE_PATHS.vehiculosDetalleMantenciones,
    label: "Detalle mantenciones",
    breadcrumbClickable: true,
  },
  vehiculosMisVehiculos: {
    path: ROUTE_PATHS.vehiculosMisVehiculos,
    label: "Vehículos",
    breadcrumbClickable: true,
  },
  vehiculosMarcas: {
    path: ROUTE_PATHS.vehiculosMarcas,
    label: "Marcas",
    breadcrumbClickable: true,
  },
  vehiculosModelos: {
    path: ROUTE_PATHS.vehiculosModelos,
    label: "Modelos",
    breadcrumbClickable: true,
  },
  vehiculosAsociarMarcaModelo: {
    path: ROUTE_PATHS.vehiculosAsociarMarcaModelo,
    label: "Asociar Marca-Modelo",
    breadcrumbClickable: true,
  },
} as const;

type BreadcrumbItem = {
  label: string;
  to: string;
  clickable: boolean;
};

export function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  if (pathname === ROUTE_PATHS.home || pathname === ROUTE_PATHS.root) {
    return [];
  }

  const segments = pathname.split("/").filter(Boolean);

  return segments.map((_, index) => {
    const to = `/${segments.slice(0, index + 1).join("/")}`;
    const route = Object.values(APP_ROUTES).find((entry) => entry.path === to);
    const fallbackLabel = segments[index].charAt(0).toUpperCase() + segments[index].slice(1).replace(/-/g, " ");

    return {
      label: route?.label ?? fallbackLabel,
      to,
      clickable: route?.breadcrumbClickable ?? false,
    };
  });
}
