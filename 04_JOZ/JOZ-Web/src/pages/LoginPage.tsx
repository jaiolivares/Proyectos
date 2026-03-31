import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useAuthContext } from '../contexts/AuthContext'
import { Box } from '@mui/material'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuthContext()

  const handleSubmit = async (payload: any) => {
    try {
      await login(payload)
      navigate('/welcome')
    } catch (err) {
      // login hook already sets error
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
    </Box>
  )
}
