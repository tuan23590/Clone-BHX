"use server";
import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: email,
      password: password,
      // callbackUrl: "/",
      redirect: false,
    });
    return r;
  } catch (error) {
    console.log("error: ", error);
    if ((error as any).kind === "InvalidEmailPasswordError") {
      return { error: (error as any).type, code: 1 };
    } else if ((error as any).kind === "InActiveUserError") {
      return { error: (error as any).type, code: 2 };
    } else {
      return { error: "Server lỗi", code: 0 };
    }
  }
}
