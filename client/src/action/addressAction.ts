import { sendRequest } from "@/utils/api";

export const handleGetAddressAction = async (type: string, code: string | null = null) => {
  const res = await sendRequest<IBackendRes<any>>({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/address`,
    queryParams: {
      type: type,
      code: code,
    },
  });
  return res;
};
