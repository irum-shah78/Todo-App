// import prisma from '../../../libs/prismadb';
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../../../libs/AuthOptions';

// export async function PUT(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const user = session.user;

//     if (!user || !user.email) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const { name, email, image } = await req.json();

//     const updatedUser = await prisma.user.update({
//       where: { email: String(user.email) },
//       data: { name, email, image },
//     });

//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return NextResponse.json({ message: 'Failed to update user', error }, { status: 500 });
//   }
// }


import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../libs/AuthOptions';

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user;

    if (!user || !user.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, email, image } = await req.json();

    // Update user in the database
    const updatedUser = await prisma.user.update({
      where: { email: String(user.email) },
      data: { name, email, image },
    });

    // Optionally return the updated user data
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Failed to update user', error }, { status: 500 });
  }
}
