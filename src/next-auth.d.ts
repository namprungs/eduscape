
declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            username: string,
            token: string
        }
    }
}