'use server';

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { cookies } from "next/headers";

export const handleCreateOrderstAction = async (
  { cartId, shippingAddress }: { cartId: string; shippingAddress: any },
) => {
  const cookieStore = cookies();
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/orders`,
      body: {
        cartId,
        shippingAddress,
      },
    });
    if (res.data)
    cookieStore.delete("cartId");
    return res;
  };

  export const handleGetOrderstAction = async (
    { phone}: { phone: string | undefined },
  ) => {
    if (!phone) return;
    const session = await auth();
      const res = await sendRequest<IBackendRes<any>>({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/orders`,
        queryParams: {
          phone,
        },
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      });
      return res;
    };
    