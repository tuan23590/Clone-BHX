import React from "react";
import AdminFooter from '@/components/adminLayout/admin.footer'
import AdminHeader from '@/components/adminLayout/admin.header'
import AdminSidebar from '@/components/adminLayout/admin.sidebar'
import { Grid2 } from '@mui/material'

const AdminLayout = ({
  children,
}: Readonly<{ children?: React.ReactNode }>) => {
  return <Grid2 container sx={{
    height: '100vh',
    width: '100vw',
  }}>
    <Grid2 size={12} border={1}>
      <AdminHeader />
    </Grid2>
    <Grid2 size={3} border={1}>
      <AdminSidebar />
    </Grid2>
    <Grid2 size={9} border={1}>
      {children}
    </Grid2>
    <Grid2 size={12} border={1}>
      <AdminFooter />
    </Grid2>
  </Grid2>;
};

export default AdminLayout;
