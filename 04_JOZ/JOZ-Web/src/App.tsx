import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuthContext } from './contexts/AuthContext'
const LeftSidebar = React.lazy(() => import('./components/menus/LeftSidebar'))
const NavBar = React.lazy(() => import('./components/menus/NavBar'))

const Home = React.lazy(() => import('./pages/Home'))
const LoginPage = React.lazy(() => import('./pages/logins/LoginPage'))
const Talleres = React.lazy(() => import('./pages/vehiculos/Talleres'))

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}

function MainRoutes() {
  const { user } = useAuthContext()
  const location = useLocation()
  const hideNavOn = ['/', '/login']
  const showNav = Boolean(user) && !hideNavOn.includes(location.pathname)
  const showSidebar = showNav && location.pathname !== '/home'

  const routes = (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to={user ? '/home' : '/'} replace />} />
        <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/home" element={<Home />} /> */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehiculos"
        element={
          <ProtectedRoute>
            <Navigate to="/vehiculos/talleres" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehiculos/talleres"
        element={
          <ProtectedRoute>
            <Talleres />
          </ProtectedRoute>
        }
      />
    </Routes>
    </Suspense>
  )

  return (
    <>
      {showNav && (
        <Suspense fallback={null}>
          <NavBar />
        </Suspense>
      )}
      {showNav ? (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
          {showSidebar && (
            <Suspense fallback={null}>
              <LeftSidebar />
            </Suspense>
          )}
          <div style={{ flex: 1 }}>
            {routes}
          </div>
        </div>
      ) : (
        routes
      )}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
