import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  try {
    // ✅ Use the exact same cookie name as in login API

    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    if (!token) {
      console.log("No token found in middleware, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Verify token using jose (Edge compatible)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "supersecretkey123456");
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error) {
    // Invalid or expired token
    console.log("Invalid or expired token", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard"],   // Only protect dashboard
};