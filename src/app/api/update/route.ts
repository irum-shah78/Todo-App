import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../libs/AuthOptions';

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
        image: imageBuffer ? imageBuffer.toString('base64') : null,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}




// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../libs/prismadb';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../../libs/AuthOptions';

// export async function PUT(req: NextRequest) {
//   try {
//     const { userId, name, email, image } = await req.json();

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         name,
//         email,
//         image: image ? image.toString('base64') : null,
//       },
//     });

//     return NextResponse.json({ user: updatedUser });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to update user.' }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../libs/prismadb';

// export async function PUT(req: NextRequest) {
//   try {
//     const { userId, name, email, imagePath } = await req.json();

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         name,
//         email,
//         image: imagePath,
//       },
//     });

//     return NextResponse.json({ user: updatedUser });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to update user.' }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js's body parsing so formidable can handle it
//   },
// };

// const parseForm = async (req: Request) => {
//   const form = formidable({ multiples: false });

//   return new Promise<{ fields: any; files: any }>((resolve, reject) => {
//     form.parse(req as any, (err, fields, files) => { // Casting req to any to bypass type errors
//       if (err) {
//         reject(err);
//       } else {
//         resolve({ fields, files });
//       }
//     });
//   });
// };

// export async function POST(req: Request) {
//   try {
//     const { files } = await parseForm(req);

//     if (files.image) {
//       const image = Array.isArray(files.image) ? files.image[0] : files.image;
//       const uploadDir = path.join(process.cwd(), 'public/uploads');

//       if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//       }

//       const imagePath = `/uploads/${Date.now()}_${image.originalFilename}`;
//       const fullPath = path.join(uploadDir, path.basename(imagePath));

//       fs.copyFileSync(image.filepath, fullPath);

//       return NextResponse.json({ imagePath });
//     } else {
//       return NextResponse.json({ error: 'Image not found' }, { status: 400 });
//     }
//   } catch (error) {
//     console.error('Failed to upload image:', error);
//     return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
//   }
// }