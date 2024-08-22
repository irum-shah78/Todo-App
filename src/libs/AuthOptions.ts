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
//           const user = await prisma.user.findUnique({
//             where: { email: credentials.email },
//           });

//           if (!user || !user.password) {
//             throw new Error('Invalid Credentials!');
//           }

//           const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
//           if (!isPasswordValid) {
//             throw new Error('Invalid Credentials!');
//           }

//           return user;
//         } catch (error) {
//           console.error('Authorize error:', error);
//           throw new Error('Authentication failed, please try again.');
//         }
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
//       return url.startsWith(baseUrl) ? url : baseUrl;
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
          throw new Error('Inavlid email or password.');
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

  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.email = user.email; 
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (session.user) {
  //       session.user.id = token.id as string;
  //       session.user.email = token.email as string;
  //     }
  //     return session;
  //   },
  //   async signIn({ user, account }) {
  //     if (account?.provider === 'google') {
  //       const email = user.email as string;
  //     }
  //     return true;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     if (url === '/profile') {
  //       return baseUrl;
  //     }
  //     return baseUrl;
  //   },
  // },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email; // Make sure to include the email from Google login
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string; // Ensure the session carries the email
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const email = user.email as string;

        // Ensure user is saved to the database (if needed) and associated todos can be fetched.
        const existingUser = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: email,
              name: user.name || 'Unknown User',
              // Add other fields if needed
            },
          });
        }
      }
      return true;
    },
  },

  debug: process.env.NODE_ENV !== 'production',
};