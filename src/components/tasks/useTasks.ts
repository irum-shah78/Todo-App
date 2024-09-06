import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '@/store/slices/taskSlice';
import { RootState, AppDispatch } from '../../store/store';
import themeColors from '@/constants/ThemeColors';
import { ThemeName } from '@/types/type';

const useTasksPage = () => {
  const router = useRouter();
  const params = useParams() as { id?: string };
  const searchParams = useSearchParams();
  const todoId = params.id || '';
  const todoName = searchParams?.get('name') || '';
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, error, loading } = useSelector((state: RootState) => state.tasks);
  const [taskName, setTaskName] = useState<string>('');
  const themeName = searchParams?.get('theme') as ThemeName || 'Vintage Garden';
  const theme = themeColors[themeName] || themeColors['Vintage Garden'];

  const handleToggleComplete = async (taskId: string) => {
    const taskToUpdate = tasks.find((task) => task?.id === taskId);

    if (taskToUpdate) {
      try {
        const newCompletedStatus = !taskToUpdate.completed;
        await dispatch(updateTask({ id: taskId, name: taskToUpdate.name, completed: newCompletedStatus }));
        toast.success(newCompletedStatus ? 'Task marked as complete' : 'Task marked as incomplete');
      } catch (error) {
        toast.error('Failed to update task');
      }
    } else {
      toast.error('Task not found');
    }
  };

  const handleAddTask = async () => {
    if (taskName.trim() && todoId) {
      try {
        await dispatch(addTask({ name: taskName, todoId }));
        setTaskName('');
        toast.success('Task added successfully!');
      } catch (error) {
        toast.error('Failed to add task');
      }
    } else {
      toast.error('Please enter a task name');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await dispatch(deleteTask(taskId));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      dispatch(fetchTasks(todoId));
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, router, todoId, dispatch]);

  return {
    taskName,
    setTaskName,
    todoName,
    theme,
    tasks,
    error,
    status,
    loading,
    handleToggleComplete,
    handleAddTask,
    handleDeleteTask,
  };
};

export default useTasksPage;
