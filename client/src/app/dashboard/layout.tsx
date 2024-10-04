import React from "react";
import AdminFooter from '@/components/adminLayout/admin.footer'
import AdminHeader from '@/components/adminLayout/admin.header'
import AdminSidebar from '@/components/adminLayout/admin.sidebar'
import { Grid2 } from '@mui/material'
import { auth } from "@/auth";

const AdminLayout = async ({
  children,
}: Readonly<{ children?: React.ReactNode }>) => {

  const session = await auth();
  
  return <Grid2 container sx={{
    height: '100vh',
    width: '100vw',
  }}>
    <Grid2 size={12} border={1}>
      <AdminHeader session={session} />
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
