// import { writeFile } from "fs/promises";
// import path from "path";
// import { NextResponse, NextRequest } from "next/server";
// import { headers } from 'next/headers';

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
//     const host = process.env.NODE_ENV === 'production' ? 'todo-app-irum.vercel.app' : headersList.get('host');
//     const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
//     const imageUrl = `${protocol}://${host}/uploads/${filename}`;

//     await writeFile(filePath, buffer);

//     return NextResponse.json({ message: "Image uploaded", success: true, imageUrl });


//     // const headersList = headers();
//     // const host = headersList.get('host');
//     // const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
//     // const imageUrl = `${protocol}://${host}/uploads/${filename}`;

//     // const protocol = process.env.NODE_ENV === 'production';
//     // const imageUrl = protocol
//     //   ? 'https://todo-app-irum.vercel.app'
//     //   : 'http://localhost:3000';
//     // return NextResponse.json({ message: "Image uploaded", success: true, imageUrl });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return NextResponse.json({ message: "Failed to upload image", success: false });
//   }
// }


import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse, NextRequest } from "next/server";
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ message: "No image found", success: false });
    }

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const filename = `${Date.now()}_${file.name}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

    // Write the file to the server
    await writeFile(filePath, buffer);

    // Construct the correct URL based on the environment
    const headersList = headers();
    const host = process.env.NODE_ENV === 'production' 
      ? 'todo-app-irum.vercel.app' 
      : headersList.get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const imageUrl = `${protocol}://${host}/uploads/${filename}`;

    return NextResponse.json({ message: "Image uploaded", success: true, imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ message: "Failed to upload image", success: false });
  }
}
