// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../libs/prismadb';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../../libs/AuthOptions';

// export async function PUT(req: NextRequest) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.id) {
//     return NextResponse.json({ error: 'Unauthorized or Invalid session' }, { status: 401 });
//   }

//   try {
//     const { name, email, image, imagePath } = await req.json();
//     const userId = session.user.id;

//     console.log('Received data:', { userId, name, email, image, imagePath });

//     if (!userId || !name || !email) {
//       return NextResponse.json({ error: 'User ID, name, and email are required' }, { status: 400 });
//     }

//     let imageBuffer: Buffer | undefined;

//     if (imagePath && imagePath.includes(',')) {
//       try {
//         imageBuffer = Buffer.from(imagePath.split(',')[1], 'base64');
//       } catch (err) {
//         console.error('Error decoding image:', err);
//         return NextResponse.json({ error: 'Invalid image data' }, { status: 400 });
//       }
//     } else if (imagePath) {
//       return NextResponse.json({ error: 'Invalid image path format' }, { status: 400 });
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         name,
//         email,
//         image,
//       },
//     });

//     return NextResponse.json({ user: updatedUser });
//   } catch (error) {
//     console.error('Failed to update user:', error);
//     return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../libs/AuthOptions';
import cloudinary from 'cloudinary';

// Cloudinary configuration
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

    console.log('Received data:', { userId, name, email, imagePath });

    if (!userId || !name || !email) {
      return NextResponse.json({ error: 'User ID, name, and email are required' }, { status: 400 });
    }

    let uploadedImageUrl;

    // Handle image upload to Cloudinary
    if (imagePath && imagePath.includes(',')) {
      try {
        const result = await cloudinary.v2.uploader.upload(imagePath, {
          folder: 'user_profiles',
        });
        uploadedImageUrl = result.secure_url;
      } catch (err) {
        console.error('Error uploading image to Cloudinary:', err);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
      }
    }

    // Update user with the new data
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        image: uploadedImageUrl || undefined, // Save the Cloudinary image URL if available
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
