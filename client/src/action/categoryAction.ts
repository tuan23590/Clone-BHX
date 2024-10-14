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
