import { API_ENDPOINTS } from "@/config/api";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        documentoFederal: {
          label: "documento",
          type: "text ",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const response = await fetch(API_ENDPOINTS.LOGIN, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            documentoFederal: credentials?.documentoFederal,
            password: credentials?.password,
          }),
        });

        const user = await response.json();

        if (user && response.ok) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "./",
  },
};
