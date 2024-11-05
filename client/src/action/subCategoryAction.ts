"use server";

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";

export const handleGetSubCategoriesAction = async (_id: string) => {
    const session = await auth();
  
    const res = await sendRequest<IBackendRes<any>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/sub-categories/${_id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });
    return res;
  };
export const handleGetAllSubCategoriesAction = async () => {
    const session = await auth();
  
    const res = await sendRequest<IBackendRes<any>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/sub-categories`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    }); 
    return res;
  }