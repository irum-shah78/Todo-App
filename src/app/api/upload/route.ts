// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { File, Files } from 'formidable';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const form = formidable({
//     uploadDir: path.join(process.cwd(), '/public/uploads'),
//     keepExtensions: true,
//   });

//   form.parse(req, (err, fields, files: Files) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     const file = files.file;
//     if (!file) {
//       return res.status(400).json({ error: 'File not found' });
//     }

//     if (Array.isArray(file)) {
//       return res.status(400).json({ error: 'Multiple files are not supported' });
//     }

//     const formidableFile = file as formidable.File;

//     const filePath = formidableFile.filepath;
//     const fileUrl = `/uploads/${path.basename(filePath)}`;
//     return res.status(200).json({ url: fileUrl });
//   });
// }


// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { File, Files } from 'formidable';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const form = formidable({
//     uploadDir: path.join(process.cwd(), '/public/uploads'),
//     keepExtensions: true,
//   });

//   form.parse(req, (err, fields, files: Files) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     const file = files.file;
//     if (!file) {
//       return res.status(400).json({ error: 'File not found' });
//     }

//     if (Array.isArray(file)) {
//       return res.status(400).json({ error: 'Multiple files are not supported' });
//     }

//     const formidableFile = file as formidable.File;

//     const filePath = formidableFile.filepath;
//     const fileUrl = `/uploads/${path.basename(filePath)}`;
//     return res.status(200).json({ url: fileUrl });
//   });
// }




// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { File, Files } from 'formidable';
// import path from 'path';
// import { IncomingMessage } from 'http';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   // Create a custom wrapper for the req object
//   const wrappedReq = new IncomingMessage(req.socket);
//   wrappedReq.headers = req.headers;
//   wrappedReq.url = req.url;
//   wrappedReq.method = req.method;

//   const form = formidable({
//     uploadDir: path.join(process.cwd(), '/public/uploads'),
//     keepExtensions: true,
//   });

//   form.parse(wrappedReq, (err, fields, files: Files) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     const file = files.file;
//     if (!file) {
//       return res.status(400).json({ error: 'File not found' });
//     }

//     if (Array.isArray(file)) {
//       return res.status(400).json({ error: 'Multiple files are not supported' });
//     }

//     const formidableFile = file as formidable.File;

//     const filePath = formidableFile.filepath;
//     const fileUrl = `/uploads/${path.basename(filePath)}`;
//     return res.status(200).json({ url: fileUrl });
//   });
// }




// import { NextRequest, NextResponse } from 'next/server';
// import formidable, { Files } from 'formidable';
// import { join, basename } from 'path';
// import { promises as fs } from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextRequest) {
//   const form = formidable({
//     uploadDir: join(process.cwd(), '/public/uploads'),
//     keepExtensions: true,
//   });

//   try {
//     await fs.mkdir(join(process.cwd(), '/public/uploads'), { recursive: true });

//     const [fields, files] = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files: Files) => {
//         if (err) reject(err);
//         else resolve([fields, files]);
//       });
//     });

//     const file = files.file;
//     if (!file) {
//       return NextResponse.json({ error: 'File not found' }, { status: 400 });
//     }

//     if (Array.isArray(file)) {
//       return NextResponse.json({ error: 'Multiple files are not supported' }, { status: 400 });
//     }

//     const formidableFile = file as formidable.File;
//     const filePath = formidableFile.filepath;
//     const fileUrl = `/uploads/${basename(filePath)}`;

//     return NextResponse.json({ url: fileUrl }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function handler(req: NextRequest) {
//   if (req.method === 'POST') {
//     return POST(req);
//   } else {
//     return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//   }
// }




// import { NextResponse } from 'next/server';
// import { IncomingForm, File } from 'formidable';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false, // Disables Next.js's default body parser
//   },
// };

// export async function POST(req: Request) {
//   try {
//     const form = new IncomingForm({
//       uploadDir: path.join(process.cwd(), 'public', 'uploads'),
//       keepExtensions: true,
//     });

//     // Convert the Next.js request to a readable stream
//     const readable = req.body as unknown as NodeJS.ReadableStream;

//     return new Promise((resolve, reject) => {
//       form.parse(readable as any, (err, fields, files) => {
//         if (err) {
//           console.error(err);
//           return resolve(NextResponse.json({ error: err.message }, { status: 500 }));
//         }

//         const fileArray = files.file;
//         if (!fileArray || Array.isArray(fileArray) && fileArray.length === 0) {
//           return resolve(NextResponse.json({ error: 'File not found' }, { status: 400 }));
//         }

//         const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;
//         const fileUrl = `/uploads/${path.basename(file.filepath)}`;
//         return resolve(NextResponse.json({ url: fileUrl }, { status: 200 }));
//       });
//     });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
//   }
// }





// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { File, Files } from 'formidable-serverless';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const form = new formidable.IncomingForm({
//     uploadDir: path.join(process.cwd(), '/public/uploads'),
//     keepExtensions: true,
//   });

//   form.parse(req, (err: Error | null, fields: formidable.Fields, files: Files) => {
//     if (err) {
//       console.error('Form parse error:', err);
//       return res.status(500).json({ error: 'Error parsing form' });
//     }

//     const file = files.file as formidable.File;
//     if (!file) {
//       return res.status(400).json({ error: 'File not found' });
//     }

//     const filePath = file.filepath;
//     const fileUrl = `/uploads/${path.basename(filePath)}`;
//     return res.status(200).json({ url: fileUrl });
//   });
// }

import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Files, File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req: NextApiRequest) => {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), '/public/uploads'),
    keepExtensions: true,
  });

  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);
    const fileArray = files.file as formidable.File[];

    if (!fileArray || fileArray.length === 0) {
      return res.status(400).json({ error: 'File not found' });
    }

    const file = fileArray[0];
    const filePath = file.newFilename;
    const fileUrl = `/uploads/${filePath}`;
    return res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error('Error parsing form:', error);
    return res.status(500).json({ error: 'Error parsing form' });
  }
}
