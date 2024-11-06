"use server";

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";

export const handleGetOneProductAction = async (_id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/products/${_id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });
    return res;
  };

export const handleGetAllProductsAction = async () => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/products`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });
    return res;
  };