import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../libs/authOptions';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized or Invalid session' }, { status: 401 });
  }

  try {
    const { name, email, image, imagePath } = await req.json();
    const userId = session.user.id;

    console.log('Received data:', { userId, name, email, image, imagePath });

    if (!userId || !name || !email) {
      return NextResponse.json({ error: 'User ID, name, and email are required' }, { status: 400 });
    }

    let imageBuffer: Buffer | undefined;

    if (imagePath && imagePath.includes(',')) {
      try {
        imageBuffer = Buffer.from(imagePath.split(',')[1], 'base64');
      } catch (err) {
        console.error('Error decoding image:', err);
        return NextResponse.json({ error: 'Invalid image data' }, { status: 400 });
      }
    } else if (imagePath) {
      return NextResponse.json({ error: 'Invalid image path format' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        image,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}