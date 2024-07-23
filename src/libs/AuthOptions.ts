// import { AuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import prisma from '../libs/prismadb';
// import bcrypt from 'bcrypt';

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Missing Credentials!');
//         }
//         const user = await prisma.user.findFirst({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.id || !user.password) {
//           throw new Error('Invalid Credentials!');
//         }

//         const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isPasswordValid) {
//           throw new Error('Invalid Credentials!');
//         }

//         return user;
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   pages: {
//     signIn: '/signin', 
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async signIn({ user, account }) {
//       if (account?.provider === 'google') {
//         const email = user.email as string;

//         const existingUser = await prisma.user.findFirst({
//           where: { email },
//         });

//         if (!existingUser && user.email) {
//           await prisma.user.create({
//             data: {
//               email: user.email,
//               name: user.name || '', 
//               image: user.image || '', 
//             },
//           });
//         }
//       }
//       return true;
//     },
//     async redirect({ url, baseUrl }) {
//       if (url === '/profile') {
//         return baseUrl;
//       }
//       return baseUrl;
//     },
//   },
//   debug: process.env.NODE_ENV !== 'production',
// };

import { AuthOptions, Session, DefaultSession} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../libs/prismadb';
import bcrypt from 'bcrypt';

interface CustomUser extends Record<string, any> {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  password?: string | null;
}

interface CustomToken extends Record<string, any> {
  id?: string;
}

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  } & DefaultSession["user"];
}

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
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        }) as CustomUser | null;

        if (!user || !user.id || !user.password) {
          throw new Error('Invalid Credentials!');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid Credentials!');
        }

        return user;
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
    async jwt({ token, user }) {
      const customToken = token as CustomToken;
      const customUser = user as CustomUser;

      if (customUser) {
        customToken.id = customUser.id;
      }
      return customToken;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      const customToken = token as CustomToken;

      if (customToken.id) {
        if (!customSession.user) {
          customSession.user = {} as CustomSession['user'];
        }
        customSession.user.id = customToken.id;
      }
      return {
        ...customSession,
        user: {
          ...customSession.user,
          id: customToken.id!,
        },
      };
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const email = user.email as string;

        const existingUser = await prisma.user.findFirst({
          where: { email },
        });

        if (!existingUser && user.email) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || '',
              image: user.image || '',
            },
          });
        }
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
