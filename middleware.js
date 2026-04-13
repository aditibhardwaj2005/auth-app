import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  try {
    // ✅ Use the exact same cookie name as in login API
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET || "supersecretkey123456");

    return NextResponse.next();
  } catch (error) {
    // Invalid or expired token
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard"],   // Only protect dashboard
};