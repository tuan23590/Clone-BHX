'use client'
import { sendRequest } from '@/utils/api'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RegisterPageClient = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const route = useRouter()
  const handleRegister = async () => {
    
    const res= await sendRequest<IBackendRes<any>>({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/auth/register`,
      body: {
        email,
        password,
        rePassword
      }
    })
    if (res?.data) {
      console.log(res?.data)
      alert('Register success')
      route.push(`/verify/${res?.data?.data._id}`)
    } else {
      alert(res?.message)
    }
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