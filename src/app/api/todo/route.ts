// "use server";
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../libs/prismadb';

// export default async function handler (req: NextApiRequest, res: NextApiResponse){
//   if (req.method === 'GET') {
//     try {
//       const { email } = req.query;
//       const user = await prisma.user.findUnique({
//         where: { email: String(email) },
//       });
//       if (user) {
//         const todos = await prisma.todo.findMany({
//           where: { userId: user.id },
//         });
//         res.status(200).json(todos);
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//       res.status(500).json({ error: 'Error fetching todos' });
//     }
//   } else if (req.method === 'POST') {
//     const { name, userId } = req.body;
//     try {
//       const newTodo = await prisma.todo.create({
//         data: {
//           name,
//           userId,
//         },
//       });
//       res.status(200).json({ todo: newTodo });
//     } catch (error) {
//       console.error('Error adding todo:', error);
//       res.status(500).json({ error: 'Error adding todo' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// };


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


import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prismadb'; // Adjust the import based on your file structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get all todos
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      try {
        const todos = await prisma.todo.findMany({
          where: { user: { email: String(email) } },
        });
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
      }
      break;

    case 'POST':
      // Create a new todo
      const { name, userId } = req.body;
      if (!name || !userId) {
        return res.status(400).json({ error: 'Name and userId are required' });
      }
      try {
        const todo = await prisma.todo.create({
          data: {
            name,
            userId,
          },
        });
        res.status(201).json({ todo });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
