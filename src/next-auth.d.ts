import { DefaultJWT } from "next-auth/jwt";
declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            username: string,
            token: string
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
      id: string;
      email: string;
      role: Role;
      type: string;
      image: string;
    }
  }