// import { NextApiRequest, NextApiResponse } from 'next';
// import multiparty from 'multiparty';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parser
//   },
// };

// // Handle POST requests for image uploads
// export async function POST(req: NextApiRequest, res: NextApiResponse) {
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

// // Handle OPTIONS requests for CORS preflight checks
// export async function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader('Allow', ['POST']);
//   res.status(200).end();
// }




import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req:any){
  const data = await req.formData();
  const file = data.get('file');
  if(!file){
    return NextResponse.json({"message": "no image found", success: false});
  }

  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);
  const filePath = `public/uploads/${Date.now()}_${file.name}`
  await writeFile(filePath,buffer );
  return NextResponse.json({"message": "image uploaded", success: true});
}