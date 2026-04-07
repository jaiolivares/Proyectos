import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import LoginPage from './pages/LoginPage'
import Welcome from './pages/Welcome'
import ItemsArea from './components/ItemsArea'
import NavBar from './components/NavBar'
import LeftSidebar from './components/LeftSidebar'
import { AuthProvider } from './contexts/AuthContext'
import { useLocation } from 'react-router-dom'

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
