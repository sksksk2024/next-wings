// app/api/debug/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  });
}
