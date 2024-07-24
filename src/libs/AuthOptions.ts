import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../libs/prismadb';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing Credentials!');
        }
      
        try {
          const users = await prisma.user.findMany({
            where: { email: credentials.email },
            take: 1,
          });
      
          const user = users[0];
      
          if (!user || !user.id || !user.password) {
            throw new Error('Invalid Credentials!');
          }
      
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            throw new Error('Invalid Credentials!');
          }
      
          return user;
        } catch (error) {
          console.error('Database query error:', error);
          throw new Error('Error connecting to the database');
        }
      }
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/signin', 
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const email = user.email as string;

        // const existingUser = await prisma.user.findFirst({
        //   where: { email },
        // });

        // if (!existingUser && user.email) {
        //   await prisma.user.create({
        //     data: {
        //       email: user.email,
        //       name: user.name || '', 
        //       image: user.image || '', 
        //     },
        //   });
        // }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url === '/profile') {
        return baseUrl;
      }
      return baseUrl;
    },
  },
  debug: process.env.NODE_ENV !== 'production',
};