"use server";

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";
import { handleUploadFileAction } from "./fileAction";

export const handleCreateCategoryAction = async ({
  name,
  description,
  fileUpload,
}: {
  name: string;
  description: string;
  fileUpload: FormData;
}) => {
  const session = await auth();

  const fileUploadData = await handleUploadFileAction(fileUpload);

  const res = await sendRequest<IBackendRes<any>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/categories`,
    body: {
      name,
      description,
      image: fileUploadData?.data[0]?.fileName,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-categories");
  return res;
};

export const handleUpdateCategoryAction = async ({
  _id,
  name,
  description,
  fileUpload,
  image,
}: {
  _id: string;
  name: string;
  description: string;
  fileUpload: FormData;
  image: string;
}) => {
  const session = await auth();

  const fileUploadData = await handleUploadFileAction(fileUpload);

  console.log(fileUploadData);

  const res = await sendRequest<IBackendRes<any>>({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/categories`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: {
      _id,
      name,
      description,
      image: fileUploadData ? fileUploadData?.data[0]?.fileName : image,
    },
  });
  revalidateTag("list-categories");
  return res;
};

export const handleDeleteCategoryAction = async (_id: string) => {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/categories/${_id}`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-categories");
  return res;
};

export const handleGetAllCategoriesAction = async () => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/categories`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return res;
};
