// import { AuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import prisma from './prismadb';
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
      
//         try {
//           const users = await prisma.user.findMany({
//             where: { email: credentials.email },
//             take: 1,
//           });
      
//           const user = users[0];
      
//           if (!user || !user.id || !user.password) {
//             throw new Error('Invalid Credentials!');
//           }
      
//           const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
//           if (!isPasswordValid) {
//             throw new Error('Invalid Credentials!');
//           }
      
//           return user;
//         } catch (error) {
//           console.error('Database query error:', error);
//           throw new Error('Invalid email or password.');
//         }
//       }
      
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
//         token.email = user.email; 
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.email = token.email as string;
//       }
//       return session;
//     },
//     async signIn({ user, account }) {
//       if (account?.provider === 'google') {
//         if (!user || !user.email) {
//           throw new Error('Invalid user or email!');
//         }
//         const email = user.email as string;
//         // Use the email variable here
//       }
//       return true;
//     },
//     async redirect({ url, baseUrl }) {
//       if (url === '/profile') {
//         return baseUrl;
//       }
//       return url;
//     },
//   },
//   debug: process.env.NODE_ENV !== 'production',
// };



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
      
//         try {
//           const users = await prisma.user.findMany({
//             where: { email: credentials.email },
//             take: 1,
//           });
      
//           const user = users[0];
      
//           if (!user || !user.id || !user.password) {
//             throw new Error('Invalid Credentials!');
//           }
      
//           const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
//           if (!isPasswordValid) {
//             throw new Error('Invalid Credentials!');
//           }
      
//           return user;
//         } catch (error) {
//           console.error('Database query error:', error);
//           throw new Error('Inavlid email or password.');
//         }
//       }
      
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
//         token.email = user.email; 
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.email = token.email as string;
//       }
//       return session;
//     },
//     async signIn({ user, account }) {
//       if (account?.provider === 'google') {
//         const email = user.email as string;
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
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            throw new Error('Invalid Credentials!');
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const email = user.email as string;
        // Add logic here if needed, e.g., create a new user in the database if not already exists
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  debug: process.env.NODE_ENV !== 'production',
};
