"use server";
import { sendRequest } from "@/utils/api";

export const handleGetSubCategoriesAction = async (_id: string) => {
    const res = await sendRequest<IBackendRes<any>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/sub-categories/${_id}`,
    });
    return res;
  };
  
export const handleGetAllSubCategoriesAction = async () => {
    const res = await sendRequest<IBackendRes<any>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/sub-categories`,
      nextOption: {
        cache: 'no-store',
      },
    },
  ); 
  console.log(res);
    return res;
  }