import Box from "@mui/material/Box";
import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import PageLoader from "./components/feedback/PageLoader";
import PageBreadcrumbs from "./components/navigation/PageBreadcrumbs";
import { ROUTE_PATHS } from "./config/routes";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import PaginaNoExiste from "./pages/PaginaNoExiste";

const LeftSidebar = React.lazy(() => import("./components/menus/LeftSidebar"));
const NavBar = React.lazy(() => import("./components/menus/NavBar"));
const Home = React.lazy(() => import("./pages/Home"));
const LoginPage = React.lazy(() => import("./pages/logins/LoginPage"));
const Marcas = React.lazy(() => import("./pages/vehiculos/Marcas"));
const Modelos = React.lazy(() => import("./pages/vehiculos/Modelos"));
const AsociarMarcaModelo = React.lazy(() => import("./pages/vehiculos/AsociarMarcaModelo"));
const MantencionDetalles = React.lazy(() => import("./pages/vehiculos/MantencionDetalles"));
const Mantenciones = React.lazy(() => import("./pages/vehiculos/Mantenciones"));
const MisVehiculos = React.lazy(() => import("./pages/vehiculos/MisVehiculos"));
const Talleres = React.lazy(() => import("./pages/vehiculos/Talleres"));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

function MainRoutes() {
  const { user } = useAuthContext();
  const location = useLocation();
  const hideNavOn: string[] = [ROUTE_PATHS.root, ROUTE_PATHS.login];
  const showNav = Boolean(user) && !hideNavOn.includes(location.pathname);
  const showSidebar = showNav && location.pathname !== ROUTE_PATHS.home;
  const rootElement = user ? <Navigate to={ROUTE_PATHS.home} replace /> : <Navigate to={ROUTE_PATHS.login} replace />;

  const routes = (
    <Suspense fallback={<PageLoader label="Cargando página..." />}>
      <Routes>
        <Route path={ROUTE_PATHS.root} element={rootElement} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <PaginaNoExiste />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTE_PATHS.login} element={<LoginPage />} />
        <Route
          path={ROUTE_PATHS.home}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.vehiculos}
          element={
            <ProtectedRoute>
              <Navigate to={ROUTE_PATHS.vehiculosTalleres} replace />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.vehiculosMantenciones}
          element={
            <ProtectedRoute>
              <Mantenciones />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.vehiculosDetalleMantenciones}
          element={
            <ProtectedRoute>
              <MantencionDetalles />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.vehiculosMisVehiculos}
          element={
            <ProtectedRoute>
              <MisVehiculos />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.vehiculosMarcas}
          element={
            <ProtectedRoute>
              <Marcas />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.vehiculosModelos}
          element={
            <ProtectedRoute>
              <Modelos />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.vehiculosAsociarMarcaModelo}
          element={
            <ProtectedRoute>
              <AsociarMarcaModelo />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.vehiculosTalleres}
          element={
            <ProtectedRoute>
              <Talleres />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );

  return (
    <>
      {showNav && (
        <Suspense fallback={null}>
          <NavBar />
        </Suspense>
      )}
      {showNav ? (
        <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
          {showSidebar && (
            <Suspense fallback={null}>
              <LeftSidebar />
            </Suspense>
          )}
          <Box sx={{ flex: 1, px: 3, py: 3 }}>
            <PageBreadcrumbs />
            {routes}
          </Box>
        </div>
      ) : (
        routes
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
