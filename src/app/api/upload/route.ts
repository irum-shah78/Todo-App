// import { NextRequest, NextResponse } from 'next/server';
// import formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../../libs/AuthOptions';

// // Ensure that the API route does not use built-in body parser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const parseForm = (req: NextRequest) => {
//   return new Promise<{ fields: any; files: any }>((resolve, reject) => {
//     const form = new formidable.IncomingForm({ multiples: false });

//     form.parse(req as any, (err, fields, files) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve({ fields, files });
//       }
//     });
//   });
// };

// export async function POST(req: NextRequest) {
//   try {
//     const { files } = await parseForm(req);

//     if (files.image) {
//       const image = Array.isArray(files.image) ? files.image[0] : files.image;
//       const imagePath = `/uploads/${path.basename(image.filepath)}`;

//       // Save image to a directory
//       fs.copyFileSync(image.filepath, path.join(process.cwd(), 'public', 'uploads', path.basename(image.filepath)));

//       return NextResponse.json({ imagePath });
//     } else {
//       return NextResponse.json({ error: 'Image not found' }, { status: 400 });
//     }
//   } catch (error) {
//     console.error('Failed to upload image:', error);
//     return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../libs/AuthOptions';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req: NextRequest) => {
  return new Promise<{ fields: any; files: any }>((resolve, reject) => {
    const form = new formidable.IncomingForm({ multiples: false });

    form.parse(req as any, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    const { files } = await parseForm(req);

    if (files.image) {
      const image = Array.isArray(files.image) ? files.image[0] : files.image;
      const imagePath = `/uploads/${path.basename(image.filepath)}`;

      // Ensure uploads directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Save image to the uploads directory
      fs.copyFileSync(image.filepath, path.join(uploadDir, path.basename(image.filepath)));

      return NextResponse.json({ imagePath });
    } else {
      return NextResponse.json({ error: 'Image not found' }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to upload image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
