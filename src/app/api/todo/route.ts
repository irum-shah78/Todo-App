// "use server";
// import prisma from '../../../libs/prismadb';
// import { NextResponse } from 'next/server';

// export const GET = async (req: Request) => {
//   try {
//     const url = new URL(req.url);
//     const email = url.searchParams.get('email');
//     if (!email) {
//       return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { email: String(email) },
//     });

//     if (user) {
//       const todos = await prisma.todo.findMany({
//         where: { userId: user.id },
//       });
//       return NextResponse.json(todos, { status: 200 });
//     } else {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//     return NextResponse.json({ error: 'Error fetching todos' }, { status: 500 });
//   }
// };

// export const POST = async (req: Request) => {
//   try {
//     const { name, userId } = await req.json();
//     const newTodo = await prisma.todo.create({
//       data: {
//         name,
//         userId,
//       },
//     });
//     return NextResponse.json({ todo: newTodo }, { status: 200 });
//   } catch (error) {
//     console.error('Error adding todo:', error);
//     return NextResponse.json({ error: 'Error adding todo' }, { status: 500 });
//   }
// };

// export default async function handler(req: Request) {
//   const { method } = req;
//   if (method === 'GET') {
//     return GET(req);
//   } else if (method === 'POST') {
//     return POST(req);
//   } else {
//     return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//   }
// };



// "use server";
// import prisma from '../../../libs/prismadb';
// import { NextResponse } from 'next/server';

// export const GET = async (req: Request) => {
//   try {
//     const url = new URL(req.url);
//     const email = url.searchParams.get('email');
//     if (!email) {
//       return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { email: String(email) },
//     });

//     if (user) {
//       const todos = await prisma.todo.findMany({
//         where: { userId: user.id },
//       });
//       return NextResponse.json(todos, { status: 200 });
//     } else {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//     return NextResponse.json({ error: 'Error fetching todos' }, { status: 500 });
//   }
// };

// export const POST = async (req: Request) => {
//   try {
//     const { name, email } = await req.json();

//     const user = await prisma.user.findUnique({
//       where: { email: String(email) },
//     });

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     const newTodo = await prisma.todo.create({
//       data: {
//         name,
//         userId: user.id,
//       },
//     });
//     return NextResponse.json(newTodo, { status: 200 });
//   } catch (error) {
//     console.error('Error adding todo:', error);
//     return NextResponse.json({ error: 'Error adding todo' }, { status: 500 });
//   }
// };

// export default async function handler(req: Request) {
//   const { method } = req;
//   if (method === 'GET') {
//     return GET(req);
//   } else if (method === 'POST') {
//     return POST(req);
//   } else {
//     return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//   }
// }


"use server";
import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    if (!email) {
      return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: String(email) },
    });

    if (user) {
      const todos = await prisma.todo.findMany({
        where: { userId: user.id },
      });
      return NextResponse.json(todos, { status: 200 });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Error fetching todos' }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: String(email) },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newTodo = await prisma.todo.create({
      data: {
        name,
        userId: user.id,
      },
    });
    return NextResponse.json(newTodo, { status: 200 });
  } catch (error) {
    console.error('Error adding todo:', error);
    return NextResponse.json({ error: 'Error adding todo' }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { id, name, email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: String(email) },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: String(id) },
      data: { name },
    });
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Error updating todo' }, { status: 500 });
  }
};

export default async function handler(req: Request) {
  const { method } = req;
  if (method === 'GET') {
    return GET(req);
  } else if (method === 'POST') {
    return POST(req);
  } else if (method === 'PUT') {
    return PUT(req);
  } else {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
}
