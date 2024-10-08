import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InActiveUserError, InvalidEmailPasswordError } from "./utils/errors";
import { sendRequest } from "./utils/api";
import { IUser } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/auth/login`,
          body: {
            username: credentials.username,
            password: credentials.password,
          },
        });
        if (res.statusCode===201) {
          return {
            _id: res.data?.user._id,
            username: res.data?.user.email,
            email: res.data?.user.email,
            accessToken: res.data?.access_token,
          };
        } else if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+res.statusCode === 400) {
          throw new InActiveUserError();
        } else {
          throw new Error("Something went wrong");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.user = user as IUser;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      return!!auth;
    },
  },
});
