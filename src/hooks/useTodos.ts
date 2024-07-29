// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';

// interface Todo {
//   id: string;
//   name: string;
// }

// interface UseTodoState {
//   todos: Todo[];
//   createTodo: ({ listName, userEmail }: { listName: string; userEmail: string }) => Promise<void>;
//   error: string | null;
// }

// const useTodo = (): UseTodoState => {
//   const { data: session } = useSession();
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTodos = useCallback(async () => {
//     if (!session?.user?.email) return;

//     try {
//       const response = await axios.get('todo', {
//         params: { userEmail: session.user.email }
//       });
//       setTodos(response.data);
//       setError(null); 
//     } catch (error) {
//       console.error('Failed to fetch todos:', error);
//       setError('Failed to fetch todos');
//     }
//   }, [session]);

//   const createTodo = async ({ listName, userEmail }: { listName: string; userEmail: string }) => {
//     try {
//       console.log(`List name of ' ${listName} ' for user ' ${userEmail} '`);
//       await axios.post('todo', {
//         name: listName,
//         user: { email: userEmail }
//       });
//       fetchTodos();
//       setError(null); 
//     } catch (error) {
//       console.error('Failed to create todo:', error);
//       setError('Failed to create todo');
//       throw error;
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, [fetchTodos]);

//   return { todos, createTodo, error };
// };

// export default useTodo;


// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';

// interface Todo {
//   id: string;
//   name: string;
// }

// interface UseTodoState {
//   todos: Todo[];
//   createTodo: ({ listName, userEmail }: { listName: string; userEmail: string }) => Promise<void>;
//   error: string | null;
// }

// const useTodo = (): UseTodoState => {
//   const { data: session } = useSession();
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTodos = useCallback(async () => {
//     if (!session?.user?.email) return;

//     try {
//       const response = await axios.get('/api/todo', {
//         params: { userEmail: session.user.email },
//       });
//       setTodos(response.data);
//       setError(null);
//     } catch (error) {
//       console.error('Failed to fetch todos:', error);
//       setError('Failed to fetch todos');
//     }
//   }, [session]);

//   const createTodo = async ({ listName, userEmail }: { listName: string; userEmail: string }) => {
//     try {
//       console.log(`List name: '${listName}' for user: '${userEmail}'`);
//       await axios.post('/api/todo', {
//         name: listName,
//         user: { email: userEmail },
//       });
//       fetchTodos();
//       setError(null);
//     } catch (error) {
//       console.error('Failed to create todo:', error);
//       setError('Failed to create todo');
//       throw error;
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, [fetchTodos]);

//   return { todos, createTodo, error };
// };

// export default useTodo;


// src/hooks/useTodos.ts
import { useState, useEffect } from 'react';
import axiosInstance from '../libs/axios';

const useTodo = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getTodos = async (email: string) => {
    try {
      const response = await axiosInstance.get(`/?email=${email}`);
      setTodos(response.data);
    } catch (err) {
      setError('Error fetching todos');
      console.error(err);
    }
  };

  const addTodo = async (name: string, userId: string) => {
    try {
      const response = await axiosInstance.post('/', { name, userId });
      setTodos([...todos, response.data.todo]);
    } catch (err) {
      setError('Error adding todo');
      console.error(err);
    }
  };

  return {
    todos,
    error,
    getTodos,
    addTodo,
  };
};

export default useTodo;
