// import prisma from '../../../libs/prismadb';
// import bcrypt from 'bcrypt';
// import crypto from 'crypto';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   const { token, password } = await req.json();

//   if (!token || !password) {
//     return NextResponse.json({ message: 'Token and password are required' }, { status: 400 });
//   }

//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

//   try {
//     const user = await prisma.user.findFirst({
//       where: {
//         resetToken: hashedToken,
//         resetTokenExpiry: {
//           gt: new Date(),
//         },
//       },
//     });

//     if (!user) {
//       return NextResponse.json({ message: 'Token is invalid or has expired' }, { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         password: hashedPassword,
//         resetToken: null,
//         resetTokenExpiry: null,
//       },
//     });

//     return NextResponse.json({ message: 'Password has been changed successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating password:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }


import prisma from '../../../libs/prismadb';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token: string | null = body.token ?? null;
    const password: string | null = body.password ?? null;

    if (!token || !password) {
      return NextResponse.json({ message: 'Token and password are required' }, { status: 400 });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user || !user.id) {
      return NextResponse.json({ message: 'Token is invalid or has expired' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({ message: 'Password has been changed successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating password:', error?.message ?? 'Unknown error occurred');
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
