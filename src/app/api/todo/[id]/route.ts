import prisma from '../../../../libs/prismadb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }
    await prisma.task.deleteMany({
      where: { todoId: id },
    });

    await prisma.todo.delete({
      where: { id: String(id) },
    });

    return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Error deleting todo' }, { status: 500 });
  }
}
