import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prismadb';  // Adjust import as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { email } = req.query;

  if (method === 'POST') {
    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ error: 'Name and userId are required' });
    }

    try {
      const todo = await prisma.todo.create({
        data: {
          name,
          user: { connect: { id: userId } },
        },
      });
      res.status(200).json(todo);
    } catch (error) {
      console.error('Failed to create todo:', error);
      res.status(500).json({ error: 'Failed to create todo' });
    }
  } else if (method === 'GET') {
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const todos = await prisma.todo.findMany({
        where: { userId: user.id }
      });
      res.status(200).json(todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
