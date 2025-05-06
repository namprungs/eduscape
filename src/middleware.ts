import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // ถ้าไม่มี token (ยังไม่ได้ login)
  if (!token) {
    const loginUrl = new URL("/register", req.url)
    return NextResponse.redirect(loginUrl)
  }

  // ถ้ามี session แล้ว → ไปต่อได้
  return NextResponse.next()
}

// กำหนดเฉพาะ path ที่ต้องการป้องกัน
export const config = {
  matcher: ["/games", "/stats"],
}
