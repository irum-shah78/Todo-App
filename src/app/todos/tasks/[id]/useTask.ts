// import { useEffect, useState } from 'react';
// import { useRouter, useParams, useSearchParams } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import themeColors from '@/constants/ThemeColors';
// import { ThemeName, Task } from '@/types/type';

// const useTasksPage = () => {
//   const router = useRouter();
//   const params = useParams() as { id: string };
//   const { id: todoId } = params;
//   const searchParams = useSearchParams();
//   const todoName = searchParams?.get('name') || '';
//   const themeName = searchParams?.get('theme') as ThemeName || '';
//   const { data: session, status } = useSession();

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [taskName, setTaskName] = useState('');
//   const [error, setError] = useState<string | null>(null);

//   const currentTheme = themeColors[themeName] || themeColors["Vintage Garden"];
//   const getTasks = async (todoId: string) => {
//     try {
//       const response = await axios.get(`/api/task?todoId=${todoId}`);
//       setTasks(response.data);
//     } catch (err) {
//       setError('Error fetching tasks');
//       console.error(err);
//     }
//   };
//   const addTask = async (name: string, todoId: string) => {
//     try {
//       const response = await axios.post('/api/task', { name, todoId });
//       setTasks((prevTasks) => [...prevTasks, response.data]);
//     } catch (err) {
//       setError('Error adding task');
//       console.error(err);
//     }
//   };
//   const updateTask = async (id: string, name: string, completed: boolean) => {
//     try {
//       const response = await axios.put('/api/task', { id, name, completed });
//       setTasks((prevTasks) =>
//         prevTasks.map((task) => (task.id === id ? { ...task, name: response.data.name, completed: response.data.completed } : task))
//       );
//     } catch (err) {
//       setError('Error updating task');
//       console.error(err);
//     }
//   };
//   const deleteTask = async (id: string) => {
//     try {
//       await axios.delete(`/api/task?id=${id}`);
//       setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
//       toast.success('Task deleted successfully!');
//     } catch (err) {
//       setError('Error deleting task');
//       console.error(err);
//     }
//   };
//   const handleToggleComplete = async (taskId: string) => {
//     const taskToUpdate = tasks.find((task) => task.id === taskId);

//     if (taskToUpdate) {
//       try {
//         const newCompletedStatus = !taskToUpdate.completed;
//         await updateTask(taskId, taskToUpdate.name, newCompletedStatus);
//         toast.success(newCompletedStatus ? 'Task marked as complete' : 'Task marked as incomplete');
//         getTasks(todoId);
//       } catch (error) {
//         console.error('Failed to update task:', error);
//         toast.error('Failed to update task');
//       }
//     } else {
//       toast.error('Task not found');
//     }
//   };
//   const handleAddTask = async () => {
//     if (taskName.trim() && todoId) {
//       try {
//         await addTask(taskName, todoId);
//         setTaskName('');
//         toast.success('Task added successfully!');
//         getTasks(todoId);
//       } catch (error) {
//         console.error('Failed to add task:', error);
//         toast.error('Failed to add task');
//       }
//     } else {
//       toast.error('Please enter a task name');
//     }
//   };
//   const handleDeleteTask = async (taskId: string) => {
//     try {
//       await deleteTask(taskId);
//       toast.success('Task deleted successfully!');
//       getTasks(todoId);
//     } catch (error) {
//       console.error('Failed to delete task:', error);
//       toast.error('Failed to delete task');
//     }
//   };

//   useEffect(() => {
//     if (status === 'authenticated' && session?.user?.email) {
//       getTasks(todoId);
//     } else if (status === 'unauthenticated') {
//       router.push('/auth/signin');
//     }
//   }, [status, session, router, todoId]);

//   return {
//     taskName,
//     setTaskName,
//     todoName,
//     currentTheme,
//     tasks,
//     error,
//     status,
//     handleToggleComplete,
//     handleAddTask,
//     handleDeleteTask,
//   };
// };

// export default useTasksPage;


import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import themeColors from '@/constants/ThemeColors';
import { ThemeName, Task } from '@/types/type';

const useTasksPage = () => {
  const router = useRouter();
  const params = useParams() as { id?: string }; 
  const searchParams = useSearchParams();
  const todoId = params.id || '';
  const todoName = searchParams?.get('name') || '';
  const themeName = searchParams?.get('theme') as ThemeName || 'Vintage Garden';
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const currentTheme = themeColors[themeName] || themeColors["Vintage Garden"];

  const getTasks = async (todoId: string) => {
    try {
      const response = await axios.get(`/api/task?todoId=${todoId}`);
      setTasks(response.data);
    } catch (err) {
      setError('Error fetching tasks');
      console.error(err);
    }
  };

  const addTask = async (name: string, todoId: string) => {
    try {
      const response = await axios.post('/api/task', { name, todoId });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (err) {
      setError('Error adding task');
      console.error(err);
    }
  };

  const updateTask = async (id: string, name: string, completed: boolean) => {
    try {
      const response = await axios.put('/api/task', { id, name, completed });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, name: response.data.name, completed: response.data.completed } : task))
      );
    } catch (err) {
      setError('Error updating task');
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/api/task?id=${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (err) {
      setError('Error deleting task');
      console.error(err);
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (taskToUpdate) {
      try {
        const newCompletedStatus = !taskToUpdate.completed;
        await updateTask(taskId, taskToUpdate.name, newCompletedStatus);
        toast.success(newCompletedStatus ? 'Task marked as complete' : 'Task marked as incomplete');
        getTasks(todoId);
      } catch (error) {
        console.error('Failed to update task:', error);
        toast.error('Failed to update task');
      }
    } else {
      toast.error('Task not found');
    }
  };

  const handleAddTask = async () => {
    if (taskName.trim() && todoId) {
      try {
        await addTask(taskName, todoId);
        setTaskName('');
        toast.success('Task added successfully!');
        getTasks(todoId);
      } catch (error) {
        console.error('Failed to add task:', error);
        toast.error('Failed to add task');
      }
    } else {
      toast.error('Please enter a task name');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast.success('Task deleted successfully!');
      getTasks(todoId);
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      getTasks(todoId);
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, router, todoId]);

  return {
    taskName,
    setTaskName,
    todoName,
    currentTheme,
    tasks,
    error,
    status,
    handleToggleComplete,
    handleAddTask,
    handleDeleteTask,
  };
};

export default useTasksPage;