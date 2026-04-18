import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';

export async function POST(request) {
  console.log("🔥 Login API called");   // ← You will see this in terminal

  try {
    const { email, password } = await request.json();

    console.log("Trying login with:", email);

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Check user in database
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    console.log("User found?", !!user);

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match?", isMatch);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'supersecretkey123456',
      { expiresIn: '1d' }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    console.log("✅ Login successful!");
    return NextResponse.json({ success: true, message: 'Login successful' });

  } catch (error) {
    console.error("🚨 Login error:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}