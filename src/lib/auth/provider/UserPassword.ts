import Credentials from "next-auth/providers/credentials";
import userLogIn from "@/lib/userLogin";


export const UserPassword = Credentials({
  name: "credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials) => {
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
});