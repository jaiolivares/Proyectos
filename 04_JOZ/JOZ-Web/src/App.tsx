import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ItemsArea from './components/ItemsArea'
import LeftSidebar from './components/LeftSidebar'
import NavBar from './components/NavBar'
import { AuthProvider } from './contexts/AuthContext'
import Landing from './pages/Landing'
import LoginPage from './pages/LoginPage'
import Talleres from './pages/Talleres'
import Welcome from './pages/Welcome'

function MainRoutes() {
  const location = useLocation()
  const hideNavOn = ['/', '/login']
  const showNav = !hideNavOn.includes(location.pathname)
  const showSidebar = showNav && location.pathname !== '/welcome'

  return (
    <>
      {showNav && <NavBar />}
      {showNav ? (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
          {showSidebar && <LeftSidebar />}
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/items" element={<ItemsArea />} />
              <Route path="/vehiculos" element={<Navigate to="/vehiculos" replace />} />
              <Route path="/vehiculos/talleres" element={<Talleres />} />
              {/* <Route path="/vehiculos" element={<Vehiculos />} /> */}
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
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
