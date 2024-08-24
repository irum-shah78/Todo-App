// import { writeFile } from "fs/promises";
// import path from "path";
// import { NextResponse, NextRequest } from "next/server";
// import { headers } from 'next/headers';

// // export async function POST(req: NextRequest) {
// //   try {
// //     const data = await req.formData();
// //     const file = data.get('image') as File | null;

// //     if (!file) {
// //       return NextResponse.json({ message: "No image found", success: false });
// //     }

// //     const byteData = await file.arrayBuffer();
// //     const buffer = Buffer.from(byteData);
// //     const filename = `${Date.now()}_${file.name}`;
// //     const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

// //     await writeFile(filePath, buffer);

// //     const headersList = headers();
// //     const host = headersList.get('host');
// //     const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
// //     const imageUrl = `${protocol}://${host}/uploads/${filename}`;


// //     return NextResponse.json({ message: "Image uploaded", success: true, imageUrl });
// //   } catch (error) {
// //     console.error("Error uploading image:", error);
// //     return NextResponse.json({ message: "Failed to upload image", success: false });
// //   }
// // }


// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.formData();
//     const file = data.get('image') as File | null;

//     if (!file) {
//       return NextResponse.json({ message: "No image found", success: false });
//     }

//     const byteData = await file.arrayBuffer();
//     const buffer = Buffer.from(byteData);
//     const filename = `${Date.now()}_${file.name}`;
//     const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

//     await writeFile(filePath, buffer);

//     const headersList = headers();
//     const host = headersList.get('host');
//     const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
//     const baseUrl =
//       process.env.NODE_ENV === 'production'
//         ? 'https://todo-app-irum.vercel.app'
//         : `${protocol}://${host}`;
//     const imageUrl = `${baseUrl}/uploads/${filename}`;

//     return NextResponse.json({ message: "Image uploaded", success: true, imageUrl });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return NextResponse.json({ message: "Failed to upload image", success: false });
//   }
// }


// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../libs/prismadb';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../../libs/AuthOptions';
// import { writeFile } from "fs/promises";
// import path from "path";

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

//     let imageUrl = image; 
//     if (imagePath && imagePath.includes(',')) {
//       try {
//         const imageBuffer = Buffer.from(imagePath.split(',')[1], 'base64');
//         const filename = `${Date.now()}_${userId}.jpg`;
//         const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

//         await writeFile(filePath, imageBuffer);

//         const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
//         const baseUrl =
//           process.env.NODE_ENV === 'production'
//             ? 'https://todo-app-irum.vercel.app'
//             : `${protocol}://${req.headers.get('host')}`;
        
//         imageUrl = `${baseUrl}/uploads/${filename}`;
//       } catch (err) {
//         console.error('Error decoding image:', err);
//         return NextResponse.json({ error: 'Invalid image data' }, { status: 400 });
//       }
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         name,
//         email,
//         image: imageUrl,
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
import { v2 as cloudinaryV2 } from 'cloudinary';

// Configure Cloudinary
cloudinaryV2.config({
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
    const { name, email, image, imagePath } = await req.json();
    const userId = session.user.id;

    console.log('Received data:', { userId, name, email, image, imagePath });

    if (!userId || !name || !email) {
      return NextResponse.json({ error: 'User ID, name, and email are required' }, { status: 400 });
    }

    let imageUrl = image; 

    if (imagePath && imagePath.includes(',')) {
      try {
        // Extract the image data
        const imageBuffer = Buffer.from(imagePath.split(',')[1], 'base64');
        const imageFile = `data:image/jpeg;base64,${imagePath.split(',')[1]}`;

        // Upload the image to Cloudinary
        const uploadResult = await cloudinaryV2.uploader.upload(imageFile, {
          folder: 'todo_app',
          public_id: `${userId}_${Date.now()}`, // Optional: customize the file name in Cloudinary
          resource_type: 'image', // Define the resource type
        });

        // Set the image URL from Cloudinary
        imageUrl = uploadResult.secure_url;
      } catch (err) {
        console.error('Error uploading image to Cloudinary:', err);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        image: imageUrl,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
