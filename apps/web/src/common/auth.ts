import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    signIn({ account, profile }) {
      if (account.provider === "google") {
        const isVerified = profile.email_verified as boolean;
        const isBaily = profile.email === "bailytroyer@gmail.com";
        return isVerified && isBaily;
      }
      return true;
    },
  },
};
