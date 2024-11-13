"use server";

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const handleCreateUserAction = async ({
  email,
  password,
  rePassword,
  name,
  phone,
}: {
  email: string;
  password: string;
  rePassword: string;
  name: string;
  phone: string;
}) => {
  const res = await sendRequest<IBackendRes<any>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/auth/register`,
    body: {
      email: email.trim(),
      password: password.trim(),
      rePassword: rePassword.trim(),
      name: name.trim(),
      phone: phone.trim(),
    },
  });
  revalidateTag("list-users");
  return res;
};

export const handleUpdateUserAction = async ({
  data,
}: {
  data: {
    _id: string;
    email: string;
    name: string;
    address: string;
    phone: string;
  };
}) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/users/`,
    body: {
      _id: data._id,
      email: data.email,
      name: data.name,
      address: data.address,
      phone: data.phone,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-users");
  return res;
};

export const handleDeleteUserAction = async (_id: string) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/users/${_id}`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-users");
  return res?.statusCode === 200 ? true : false;
};
