import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { headers } from 'next/headers';

export async function POST(req: any) {
  const data = await req.formData();
  const file = data.get('image');

  if (!file) {
    return NextResponse.json({ "message": "No image found", success: false });
  }
  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);
  const filename = `${Date.now()}_${file.name}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

  await writeFile(filePath, buffer);

  const headersList = headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const imageUrl = `${protocol}://${host}/uploads/${filename}`;

  return NextResponse.json({ "message": "Image uploaded", success: true, imageUrl });
}