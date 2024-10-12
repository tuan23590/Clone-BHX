import { auth } from "@/auth";
import OrderList from "@/components/admin/OrderList";
import User from "@/components/admin/User";
import { sendRequest } from "@/utils/api";
import React from "react";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const UserPage = async (props: Props) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/users`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-users"] },
    },
  });
  return (
    <>
      <OrderList />
      <User users={res?.data?.results ?? []} meta={res?.data?.meta} />
    </>
  );
};

export default UserPage;
