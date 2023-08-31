import { NextResponse } from 'next/server';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const user = { id: '1', nqame: 'hyunwoo', email: 'hyunwoo@example.com', role: 'User' }

        if (user) {
          return user
        } else {
          return null
        }

      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      console.log('token', token)
      console.log('user', user)
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token;
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }