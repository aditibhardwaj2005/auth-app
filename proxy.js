import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req) {
  try {
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    jwt.verify(token, process.env.JWT_SECRET || "supersecretkey123456");

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard"],
};
