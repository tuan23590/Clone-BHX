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
import { Container, Grid } from "@mui/joy";
import { handleGetAllCategoriesAction } from "@/action/categoryAction";
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
  return (
    <html lang="en">
      <body>
        <NextAuthWrapper>
          <AppProvider>
            <ThemeRegistry options={{ key: "joy" }}>
              <HomeHeader />
              {/* <Container sx={{ padding: "0px 0px !important" }}>
                <Grid container spacing={2}>
                  <Grid sm={3}>
                    <HomeSidebar categories={categories.data.results}/>
                  </Grid>
                  <Grid sm={9}>{children}</Grid>
                </Grid>
              </Container> */}
            </ThemeRegistry>
          </AppProvider>
        </NextAuthWrapper>
      </body>
    </html>
  );
}
