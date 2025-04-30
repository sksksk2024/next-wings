// lib/auth.ts
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // <-- Add this for better user tracking
      return session;
    },
  },
};
