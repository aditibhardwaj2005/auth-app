import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    return NextResponse.json({
      success: true,
      message: 'User registered successfully! You can now login.'
    });

  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 400 });
    }
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ error: 'Database is not reachable. Please start XAMPP/MySQL and try again.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}