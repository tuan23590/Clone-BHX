"use server";

import { sendRequest } from "@/utils/api";

export const handleGetOneProductAction = async (_id: string) => {
    const res = await sendRequest<IBackendRes<any>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/products/${_id}`,
    });
    return res;
  };

export const handleGetAllProductsAction = async () => {
    const res = await sendRequest<IBackendRes<any>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/products`,
    });
    return res;
  };