import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const todoId = url.searchParams.get('todoId');

    if (!todoId) {
      return NextResponse.json({ error: 'Todo ID query parameter is required' }, { status: 400 });
    }

    const tasks = await prisma.task.findMany({
      where: { todoId: String(todoId) },
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, todoId } = await req.json();

    const todo = await prisma.todo.findUnique({
      where: { id: String(todoId) },
    });

    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    const newTask = await prisma.task.create({
      data: {
        name,
        todoId: todo.id,
      },
    });
    return NextResponse.json(newTask, { status: 200 });
  } catch (error) {
    console.error('Error adding task:', error);
    return NextResponse.json({ error: 'Error adding task' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name } = await req.json();

    const task = await prisma.task.findUnique({
      where: { id: String(id) },
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: String(id) },
      data: { name },
    });
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID query parameter is required' }, { status: 400 });
    }

    const task = await prisma.task.findUnique({
      where: { id: String(id) },
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    await prisma.task.delete({
      where: { id: String(id) },
    });

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
  }
}