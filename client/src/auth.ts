import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InvalidEmailPasswordError } from "./utils/errors";
import { sendRequest } from "./utils/api";

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
        console.log("credentials", credentials);
        try {
          user = await sendRequest({
            method: "POST",
            url: "http://localhost:4000/api/v1/auth/login",
            body: {
              username: credentials.username,
              password: credentials.password,
            },
          });
        } catch (error) {
          console.error("Error: ", error);
        }
       
        console.log("user: ",user);

        if (!user) {
          throw new InvalidEmailPasswordError();
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});
