import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import prisma from '../../../libs/prismadb';

export const config = {
  api: {
    bodyParser: false,
  },
};

const form = new formidable.IncomingForm({
  uploadDir: path.join(process.cwd(), 'public/uploads'),
  keepExtensions: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name ?? '';
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email ?? '';
    let imagePath = session.user.image as string;

    if (files.image) {
      const file = Array.isArray(files.image) ? files.image[0] : files.image as File;
      const filePath = path.join(process.cwd(), 'public/uploads', file.newFilename);
      fs.renameSync(file.filepath, filePath);
      imagePath = `/uploads/${file.newFilename}`;
    }

    try {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { name, email, image: imagePath },
      });

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  });
}
