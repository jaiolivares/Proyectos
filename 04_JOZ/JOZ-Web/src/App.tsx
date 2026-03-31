import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import LoginPage from './pages/LoginPage'
import Welcome from './pages/Welcome'
import ItemsArea from './components/ItemsArea'
import NavBar from './components/NavBar'
import { AuthProvider } from './contexts/AuthContext'
import { useLocation } from 'react-router-dom'

function MainRoutes() {
  const location = useLocation()
  const hideNavOn = ['/', '/login']
  const showNav = !hideNavOn.includes(location.pathname)

  return (
    <>
      {showNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/items" element={<ItemsArea />} />
      </Routes>
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
