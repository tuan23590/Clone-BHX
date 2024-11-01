'use server';
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const handleAddCartAction = async (
  productId: string,
  quantity: number
) => {
  const cookieStore = cookies();
  const cookiesData = cookieStore.get("cartId");

  const res = await sendRequest<IBackendRes<any>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/shopping-cart`,
    body: {
      productId,
      quantity,
      _id: cookiesData?.value,
    },
  });
  if (res.data) {
    cookieStore.set("cartId", res.data._id);
  }
  revalidateTag("carts");
  return res;
};

export const handleGetCartAction = async () => {
  const cookieStore = cookies();
  const cookiesData = cookieStore.get("cartId");
  if (!cookiesData) {
    return null;
  }
  const res = await sendRequest<IBackendRes<any>>({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/shopping-cart/${cookiesData.value}`,
    nextOption: {
      next: { tags: ["carts"] },
    },
  });
  return res;
};
