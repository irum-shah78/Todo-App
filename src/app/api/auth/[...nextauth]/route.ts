import { authOptions } from "@/libs/AuthOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};


// // import { NextApiRequest, NextApiResponse } from 'next';
// // import { authOptions } from "@/libs/AuthOptions";
// // import NextAuth from "next-auth/next";

// // const handler = (req: NextApiRequest, res: NextApiResponse) => {
// //   try {
// //     return NextAuth(authOptions)(req, res);
// //   } catch (error) {
// //     console.error('NextAuth handler error:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };

// // export { handler as GET, handler as POST };

// import { NextRequest, NextResponse } from 'next/server';
// import { authOptions } from '@/libs/AuthOptions';
// import NextAuth from 'next-auth/next';

// const handler = async (req: NextRequest) => {
//   try {
//     return await NextAuth(authOptions)(req);
//   } catch (error) {
//     console.error('NextAuth handler error:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// };

// export { handler as GET, handler as POST };