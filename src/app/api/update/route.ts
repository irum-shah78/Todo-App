import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../libs/AuthOptions';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized or Invalid session' }, { status: 401 });
  }

  try {
    const { name, email, imagePath } = await req.json();
    const userId = session.user.id;

    if (!userId || !name || !email) {
      return NextResponse.json({ error: 'User ID, name, and email are required' }, { status: 400 });
    }

    let uploadedImageUrl;

    if (imagePath && imagePath.includes(',')) {
      try {
        const result = await cloudinary.v2.uploader.upload(imagePath, {
          folder: 'user_profiles',
        });
        uploadedImageUrl = result.secure_url;
      } catch (err) {
        return NextResponse.json({ error: 'Failed to upload image to Cloudinary' }, { status: 500 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        image: uploadedImageUrl || undefined,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
