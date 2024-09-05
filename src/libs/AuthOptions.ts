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
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });

          if (!user || !user.password) {
            throw new Error('Invalid Credentials!');
          }

          const isPasswordValid = await bcrypt.compare(credentials?.password, user?.password);
          if (!isPasswordValid) {
            throw new Error('Invalid Credentials!');
          }

          return user;
        } catch (error) {
          console.error('Authorize error:', error);
          throw new Error('Authentication failed, please try again.');
        }
      },
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
    async jwt({ token, user, session, trigger }) {
      console.log("session in jwt callback", session);
      if (user) {
        return {
          ...token,
          id: user?.id,
          email: user?.email,
          image: user?.image,
          name: user?.name,
        };
      }
      if (trigger === 'update' && session) {
        try {
          const updatedUser = await prisma.user.findUnique({
            where: { id: token.id as string },
          });

          if (updatedUser) {
            token.name = updatedUser?.name;
            token.email = updatedUser?.email;
            token.image = updatedUser?.image;
          }
        } catch (error) {
          console.error('Error fetching updated user:', error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token?.id as string;
        session.user.email = token?.email as string;
        session.user.image = token?.image as string;
        session.user.name = token?.name as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const googleUser = await prisma.user.findUnique({
          where: { email: user?.email as string },
        });

        if (!googleUser) {
          await prisma.user.create({
            data: {
              email: user?.email as string,
              name: user?.name || '',
              image: user?.image || '',
            },
          });
        }
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  debug: process.env.NODE_ENV !== 'production',
};
