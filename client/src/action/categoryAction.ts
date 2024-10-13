"use server";

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const handleCreateCategoryAction = async ({
  name,
  description,
  filePath,
}: {
  name: string;
  description: string;
  filePath: string;
}) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/categories`,
    body: {
        name,
        description,
        image : filePath,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-categories");
  return res;
};
