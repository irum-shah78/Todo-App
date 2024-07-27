// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';

// interface Todo {
//   id: string;
//   name: string;
// }

// const useTodo = () => {
//   const { data: session } = useSession();
//   const [todos, setTodos] = useState<Todo[]>([]);

//   const fetchTodos = useCallback(async () => {
//     if (!session?.user?.email) return; 

//     try {
//       console.log('Fetching todos for user:', session.user.email);
//       const response = await axios.get('/', {
//         params: { userEmail: session.user.email } 
//       });
//       console.log('Fetched todos:', response.data);
//       setTodos(response.data);
//     } catch (error) {
//       console.error('Failed to fetch todos:', error);
//     }
//   }, [session]);

//   const createTodo = async ({ listName, userEmail }: { listName: string; userEmail: string }) => {
//     try {
//       console.log('Creating todo with name:', listName, 'for user:', userEmail);
//       await axios.post('/', {
//         name: listName,
//         user: { email: userEmail } 
//       });
//       fetchTodos(); 
//     } catch (error) {
//       console.error('Failed to create todo:', error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, [fetchTodos]);

//   return { todos, createTodo };
// };

// export default useTodo;


import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Todo {
  id: string;
  name: string;
}

interface UseTodoState {
  todos: Todo[];
  createTodo: ({ listName, userEmail }: { listName: string; userEmail: string }) => Promise<void>;
  error: string | null;
}

const useTodo = (): UseTodoState => {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    if (!session?.user?.email) return;

    try {
      const response = await axios.get('todo', {
        params: { userEmail: session.user.email }
      });
      setTodos(response.data);
      setError(null); // Clear error if fetch is successful
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      setError('Failed to fetch todos');
    }
  }, [session]);

  const createTodo = async ({ listName, userEmail }: { listName: string; userEmail: string }) => {
    try {
      await axios.post('todo', {
        name: listName,
        user: { email: userEmail }
      });
      fetchTodos();
      setError(null); // Clear error if creation is successful
    } catch (error) {
      console.error('Failed to create todo:', error);
      setError('Failed to create todo');
      throw error;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return { todos, createTodo, error };
};

export default useTodo;
