// import { NextResponse } from "next/server";
// import prismadb from "../../../libs/prismadb";
// import bcrypt from "bcrypt";

// export async function POST(
//   req: Request,
// ) {
//   try {
//     const body = await req.json();
//     const { email, password, name, image } = body;

//     if (!email || !password) {
//       return new NextResponse("Missing Data", { status: 500 });
//     }

//     const userAlreadyExist = await prismadb.user.findFirst({
//       where: {
//         email: email,
//       }
//     });

//     if (userAlreadyExist) {
//       return new NextResponse("User Already Exists!", { status: 500 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 8);
//     const newUser = await prismadb.user.create({
//       data: {
//         email: email,
//         password: hashedPassword,
//         name: name, 
//         image: image, 
//       }
//     });

//     return NextResponse.json(newUser);
//   } catch (error: any) {
//     console.log("REGISTER_ERROR: " + error);
//     return new NextResponse("Server Error", { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import prismadb from "../../../libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, image } = body;

    if (!email || !password) {
      return new NextResponse("Missing Data", { status: 400 });
    }

    const userAlreadyExist = await prismadb.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExist) {
      return new NextResponse("User Already Exists!", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await prismadb.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name ?? '',
        image: image ?? '',
      },
    });

    return NextResponse.json(newUser);
  } catch (error: any) {
    console.error("REGISTER_ERROR:", error?.message ?? "Unknown error occurred");
    return new NextResponse("Server Error", { status: 500 });
  }
}
