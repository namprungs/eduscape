import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
// import { Account } from "next-auth";
import { CustomUser, Session } from "@/types/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ account}) {
      switch (account?.provider) {
        case "credentials":
          return true;
        default:
          return false;
      }
    },
    async jwt({ token, user }: { token: CustomUser; user?: CustomUser }) {
      if (user) {
        // เมื่อมี user, เราจะเก็บข้อมูล token และ user ลงใน token
        token.token = user.token;
        token.username = user.username;
      }

      console.log("this is token", token);
      return token;
    },

    async session({ session, token }: { session: Session; token: CustomUser }) {
      if (token && session) {
        // เมื่อ session ถูกเรียกใช้ เราจะเอาข้อมูลจาก token ไปตั้งค่าให้ session
        session.user = {
          username: token.username,
          token: token.token, // เพิ่ม token ไปใน session
        };
      }

      console.log("this is session", session);
      return session;
    },
  },
});
