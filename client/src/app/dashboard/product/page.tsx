import { auth } from "@/auth";
import AddCategoryButton from "@/components/admin/category/addCategoryButton";
import Category from "@/components/admin/category/Category";
import OrderList from "@/components/admin/OrderList";
import User from "@/components/admin/user/User";
import { sendRequest } from "@/utils/api";
import { Box, Typography } from "@mui/joy";
import React from "react";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const CategoryPage = async (props: Props) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 15;
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/categories`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-categories"] },
    },
  });
  console.log(res);
  return (
    <>
    <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2" component="h1">
              Danh mục
            </Typography>
            <AddCategoryButton />
          </Box>
      <OrderList />
      <Category categories={res?.data?.results ?? []} meta={res?.data?.meta} />
    </>
  );
};

export default CategoryPage;
