"use server";

import { auth } from "@/auth";
import { sendRequest, sendRequestFile } from "@/utils/api";

export const handleUploadFileAction = async (
    formData?: FormData
    ) => {
    if (formData?.get("files") === null) {
        return;
    }
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

  export const handleDeleteFileAction = async (
    fileName: string
    ) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/files/${fileName}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });
    console.log(res);
  };