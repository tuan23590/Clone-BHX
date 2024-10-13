"use server";

import { auth } from "@/auth";
import { sendRequestFile } from "@/utils/api";

export const handleUploadFileAction = async (
    formData: FormData
    ) => {
    const session = await auth();
    const res = await sendRequestFile<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/files/upload`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        body: formData,
    });
    return res;
  };