// import { authOptions } from "@/auth/authOptions";
import NextAuth from "next-auth/next";
import userLogIn from "@/lib/userLogin";
import { Session } from "@/types/user";
import { User } from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser extends User {
  username: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        try {
          const { username, password } = credentials;
          console.log("before login ja", username, password);
          const response = await userLogIn(username, password); // รับ response ที่ประกอบไปด้วย user และ token
          console.log("after login ja", username, password);

          if (response?.token && response?.user) {
            return {
              ...response.user, // ส่งกลับข้อมูล user
              token: response.token, // ส่งกลับ token
            };
          } else {
            return null;
          }
        } catch (error) {
          console.log("error is " + error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
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
  pages: {
    signIn: "/login", // หน้า login ของเรา
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
