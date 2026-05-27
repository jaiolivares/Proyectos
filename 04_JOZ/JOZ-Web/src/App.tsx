import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LeftSidebar from './components/menus/LeftSidebar'
import NavBar from './components/menus/NavBar'
import { AuthProvider, useAuthContext } from './contexts/AuthContext'
// import Home from './pages/Home'
import Home from './pages/Home'
import LoginPage from './pages/logins/LoginPage'
import Talleres from './pages/vehiculos/Talleres'

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
  )

  return (
    <>
      {showNav && <NavBar />}
      {showNav ? (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
          {showSidebar && <LeftSidebar />}
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
