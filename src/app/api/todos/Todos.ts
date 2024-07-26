// // src/pages/api/todos.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { name, themeName } = req.body;
//     try {
//       const newTodo = await prisma.todo.create({
//         data: {
//           name,
//           themeName,
//         },
//       });
//       res.status(201).json(newTodo);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create todo' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// src/pages/api/todos.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, themeName } = req.body;
    try {
      const newTodo = await prisma.todo.create({
        data: {
          name,
          themeName,
        },
      });
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
