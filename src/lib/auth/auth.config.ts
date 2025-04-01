import type { NextAuthConfig } from "next-auth";
import { UserPassword } from "./provider/UserPassword";
export const authConfig: NextAuthConfig = {
  providers: [UserPassword],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};
