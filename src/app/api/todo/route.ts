import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: String(email) },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const todos = await prisma.todo.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching todos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, theme } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

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
        theme: theme || 'DefaultColor',
      },
    });

    return NextResponse.json(newTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error adding todo' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, email, theme } = await req.json();

    if (!id || !name || !email) {
      return NextResponse.json({ error: 'ID, name, and email are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: String(email) },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: String(id) },
      data: { name, theme },
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating todo' }, { status: 500 });
  }
}