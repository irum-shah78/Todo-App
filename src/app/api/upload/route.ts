// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false, // Disabling the default body parser
//   },
// };

// // Function to parse form data
// const parseForm = (req: NextApiRequest) => {
//   const form = formidable({ multiples: false });

//   return new Promise<{ fields: any; files: any }>((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve({ fields, files });
//       }
//     });
//   });
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const { files } = await parseForm(req);

//       if (files.image) {
//         const image = Array.isArray(files.image) ? files.image[0] : files.image;
//         const uploadDir = path.join(process.cwd(), 'public/uploads');

//         if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir, { recursive: true });
//         }

//         const imagePath = `/uploads/${Date.now()}_${image.originalFilename}`;
//         const fullPath = path.join(uploadDir, path.basename(imagePath));

//         fs.copyFileSync(image.filepath, fullPath);

//         res.status(200).json({ imagePath });
//       } else {
//         res.status(400).json({ error: 'Image not found' });
//       }
//     } catch (error) {
//       console.error('Failed to upload image:', error);
//       res.status(500).json({ error: 'Failed to upload image' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// import { NextApiRequest, NextApiResponse } from 'next';
// import multiparty from 'multiparty';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parser
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const form = new multiparty.Form();

//     form.parse(req, (err: Error | null, fields: multiparty.Fields, files: multiparty.Files) => {
//       if (err) {
//         console.error('Error parsing form:', err);
//         return res.status(500).json({ error: 'Failed to parse form data' });
//       }

//       if (files.image) {
//         const image = Array.isArray(files.image) ? files.image[0] : files.image;
//         const uploadDir = path.join(process.cwd(), 'public/uploads');

//         if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir, { recursive: true });
//         }

//         const imagePath = `/uploads/${Date.now()}_${image.originalFilename}`;
//         const fullPath = path.join(uploadDir, path.basename(imagePath));

//         fs.copyFileSync(image.path, fullPath);

//         return res.status(200).json({ imagePath });
//       } else {
//         return res.status(400).json({ error: 'Image not found' });
//       }
//     });
//   } catch (error: any) {
//     console.error('Unexpected error:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// }

// export function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader('Allow', ['POST']);
//   res.status(200).end();
// }


// import { NextApiRequest, NextApiResponse } from 'next';
// import multiparty from 'multiparty';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parser
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const form = new multiparty.Form();

//     form.parse(req, (err: Error | null, fields: multiparty.Fields, files: multiparty.Files) => {
//       if (err) {
//         console.error('Error parsing form:', err);
//         return res.status(500).json({ error: 'Failed to parse form data' });
//       }

//       if (files.image) {
//         const image = Array.isArray(files.image) ? files.image[0] : files.image;
//         const uploadDir = path.join(process.cwd(), 'public/uploads');

//         if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir, { recursive: true });
//         }

//         const imagePath = `/uploads/${Date.now()}_${image.originalFilename}`;
//         const fullPath = path.join(uploadDir, path.basename(imagePath));

//         fs.copyFileSync(image.path, fullPath);

//         return res.status(200).json({ imagePath });
//       } else {
//         return res.status(400).json({ error: 'Image not found' });
//       }
//     });
//   } catch (error: any) {
//     console.error('Unexpected error:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// }

// export function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader('Allow', ['POST']);
//   res.status(200).end();
// }


// import { NextApiRequest, NextApiResponse } from 'next';
// import multiparty from 'multiparty';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parser
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const form = new multiparty.Form();

//   form.parse(req, (err: Error | null, fields: multiparty.Fields, files: multiparty.Files) => {
//     if (err) {
//       console.error('Error parsing form:', err);
//       return res.status(500).json({ error: 'Failed to parse form data' });
//     }

//     if (files.image) {
//       const image = Array.isArray(files.image) ? files.image[0] : files.image;
//       const uploadDir = path.join(process.cwd(), 'public/uploads');

//       if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//       }

//       const imagePath = `/uploads/${Date.now()}_${image.originalFilename}`;
//       const fullPath = path.join(uploadDir, path.basename(imagePath));

//       fs.copyFileSync(image.path, fullPath);

//       console.log('Image path:', imagePath); // Log image path
//       return res.status(200).json({ imagePath });
//     } else {
//       return res.status(400).json({ error: 'Image not found' });
//     }
//   });
// }

// export function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader('Allow', ['POST']);
//   res.status(200).end();
// }


import { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

// Handle POST requests for image uploads
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const form = new multiparty.Form();

  form.parse(req, (err: Error | null, fields: multiparty.Fields, files: multiparty.Files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Failed to parse form data' });
    }

    if (files.image) {
      const image = Array.isArray(files.image) ? files.image[0] : files.image;
      const uploadDir = path.join(process.cwd(), 'public/uploads');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const imagePath = `/uploads/${Date.now()}_${image.originalFilename}`;
      const fullPath = path.join(uploadDir, path.basename(imagePath));

      fs.copyFileSync(image.path, fullPath);

      console.log('Image path:', imagePath); // Log image path
      return res.status(200).json({ imagePath });
    } else {
      return res.status(400).json({ error: 'Image not found' });
    }
  });
}

// Handle OPTIONS requests for CORS preflight checks
export async function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Allow', ['POST']);
  res.status(200).end();
}
