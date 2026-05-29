import { APP_ROUTES, ROUTE_PATHS, getBreadcrumbItems } from "../../src/config/routes";

describe("routes config", () => {
  it("devuelve breadcrumbs vacios para root y home", () => {
    expect(getBreadcrumbItems(ROUTE_PATHS.root)).toEqual([]);
    expect(getBreadcrumbItems(ROUTE_PATHS.home)).toEqual([]);
  });

  it("resuelve labels y clickabilidad conocidos", () => {
    expect(getBreadcrumbItems(ROUTE_PATHS.vehiculosTalleres)).toEqual([
      {
        label: APP_ROUTES.vehiculos.label,
        to: ROUTE_PATHS.vehiculos,
        clickable: false,
      },
      {
        label: APP_ROUTES.vehiculosTalleres.label,
        to: ROUTE_PATHS.vehiculosTalleres,
        clickable: true,
      },
    ]);
  });

  it("genera fallback legible para rutas no registradas", () => {
    expect(getBreadcrumbItems("/vehiculos/ordenes-pendientes")).toEqual([
      {
        label: APP_ROUTES.vehiculos.label,
        to: ROUTE_PATHS.vehiculos,
        clickable: false,
      },
      {
        label: "Ordenes pendientes",
        to: "/vehiculos/ordenes-pendientes",
        clickable: false,
      },
    ]);
  });
});
