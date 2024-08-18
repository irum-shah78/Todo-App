import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useTodo from '../../../hooks/useTodos';
import toast from 'react-hot-toast';
import themeColors from '@/constants/ThemeColors';
import { ThemeName } from '@/types/type';

const useTodosPage = () => {
  const { todos, error, getTodos, addTodo, deleteTodo } = useTodo();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      getTodos(session.user.email);
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, getTodos, router]);

  const handleViewTasks = (id: string, name: string, theme: string) => {
    router.push(`/todos/tasks/${id}?name=${encodeURIComponent(name)}&theme=${encodeURIComponent(theme)}`);
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      toast.success('List deleted successfully!');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const getUnderlineColor = (theme: string) => {
    const validTheme = theme as ThemeName;
    return themeColors[validTheme]?.primary || '#FFFFFF';
  };

  return {
    todos,
    error,
    status,
    selectedColor,
    setSelectedColor,
    handleViewTasks,
    handleDeleteTodo,
    getUnderlineColor,
  };
};

export default useTodosPage;