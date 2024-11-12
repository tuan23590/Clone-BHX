'use server';

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
    cookieStore.delete("cartId");
    return res;
  };
  