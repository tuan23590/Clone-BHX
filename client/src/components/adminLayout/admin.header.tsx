'use client'
import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'
import React from 'react'

const AdminHeader = (props : any) => {
  const { session } = props
  return (
    <>
    <div>AdminHeader, hello 
      {session?.user?.email || 'unknown'}!
    </div>
    <Button variant='contained' onClick={() => signOut()}>Sign Out</Button>
    </>
  )
}

export default AdminHeader