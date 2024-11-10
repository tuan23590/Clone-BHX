import type { Metadata } from "next";
import "../globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import NextAuthWrapper from "@/context/next.auth.wrapper";
import ThemeRegistry from "../ThemeRegistry";
import AppProvider from "@/context/AppProvider";
import HomeHeader from "@/components/home/home.header";
import HomeSidebar from "@/components/home/home.sidebar";
import { Box, Container, Grid } from "@mui/joy";
import { handleGetAllCategoriesAction } from "@/action/categoryAction";
import { handleGetCartAction } from "@/action/cartAction";
export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Trang chủ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await handleGetAllCategoriesAction();
  const carts = await handleGetCartAction();
  return (
    <html lang="en">
      <body>
        <NextAuthWrapper>
          <AppProvider>
            <ThemeRegistry options={{ key: "joy" }}>
              <Box sx={{
                backgroundColor: "#eeeeee",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}>
              <HomeHeader carts={carts} />
              <Container sx={{ padding: "0px 0px !important" }}>
                <Grid container columnSpacing={2}>
                  <Grid sm={3}>
                    <HomeSidebar categories={categories?.data?.results}/>
                  </Grid>
                  <Grid sm={9} pt={2}>
                    {children}
                  </Grid>
                </Grid>
              </Container>
              </Box>
            </ThemeRegistry>
          </AppProvider>
        </NextAuthWrapper>
      </body>
    </html>
  );
}
