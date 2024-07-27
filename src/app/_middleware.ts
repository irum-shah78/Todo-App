// // src/app/_middleware.ts
// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req:any) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   const { pathname } = req.nextUrl;

//   if (!token && pathname.startsWith('/todos')) {
//     return NextResponse.redirect('/auth/signin');
//   }

//   if (token && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
//     return NextResponse.redirect('/todos/todo');
//   }

//   return NextResponse.next();
// }


// src/app/_middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Redirect unauthenticated users away from protected routes
  if (!token && pathname.startsWith('/todos')) {
    return NextResponse.redirect('/auth/signin');
  }

  // Redirect authenticated users away from auth pages
  if (token && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
    return NextResponse.redirect('/todos/todo');
  }

  return NextResponse.next();
}
