import type { NextAuthOptions } from "next-auth";
import { UserPassword } from "./provider/UserPassword";
import type { Account, User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
export const authConfig: NextAuthOptions = {
  providers: [UserPassword],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user:_user, account }: { user: User | AdapterUser; account: Account | null }) {
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.username = token.username as string;
        session.user.token = token.token as string;
      }
      console.log("this is session", session);
      return session;
    },
    async jwt({
      token,
      user,
    }: {
      token: any;
      user?: User | AdapterUser;
    }) {
      if (user) {
        // ต้องตรวจสอบว่า user มี property เพิ่มเติมก่อนใช้
        const anyUser = user as any;
        token.username = anyUser.username;
        token.token = anyUser.token;
      }
      return token;
    },
  },
};
