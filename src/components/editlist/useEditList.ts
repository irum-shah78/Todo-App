import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useTodo from '../../hooks/useTodos';
import toast from 'react-hot-toast';

const useEditList = () => {
  const params = useParams() as { id?: string };
  const router = useRouter();
  const { data: session, status } = useSession();
  const { todos, getTodos, updateExistingTodo, error } = useTodo();
  const [todoName, setTodoName] = useState<string>('');
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [localError, setLocalError] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  const id = params.id || '';

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      getTodos(session.user.email);
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, getTodos, router]);

  useEffect(() => {
    if (todos.length > 0 && initialLoad && id) {
      const todo = todos.find((todo) => todo?.id === id);
      if (todo) {
        setTodoName(todo?.name);
        setSelectedTheme(todo?.theme);
        setInitialLoad(false);
      }
    }
  }, [todos, id, initialLoad]);

  const handleUpdateTodo = async () => {
    if (session?.user?.email && todoName.trim() && id) {
      try {
        await updateExistingTodo(id, todoName, selectedTheme);
        toast.success("List updated syccessfully!");
        router.push('/todos/todo');
      } catch (error) {
        setLocalError('Failed to update todo');
      }
    }
  }; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
  };

  return {
    todoName,
    selectedTheme,
    error,
    localError,
    status,
    handleChange,
    handleUpdateTodo,
    handleThemeChange,
  };
};

export default useEditList;