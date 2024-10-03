'use client'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const RegisterPageClient = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const handleRegister = () => {
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      alignItems: 'center'
    }}>
      <Typography variant='h4' mb={2}>Register Page</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 300
      }}>
        <TextField fullWidth label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField fullWidth label='Re-Password' value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
        <Button variant='contained' color='primary' onClick={handleRegister}>Register</Button>
      </Box>
    </Box>
  )
}

export default RegisterPageClient