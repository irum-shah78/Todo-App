// // src/hooks/useTodos.ts
// import { useRouter } from 'next/navigation';

// const useTodo = () => {
//   const router = useRouter();

//   const createTodo = async (name: string, themeName: string) => {
//     try {
//       const response = await fetch('/api/todos', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, themeName }),
//       });
//       if (!response.ok) throw new Error('Failed to create todo');
//       await response.json();
//       router.push('/todos');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return { createTodo };
// };

// export default useTodo;


// src/hooks/useTodos.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  name: string;
  themeName: string;
}

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos'); // Adjust the API endpoint as needed
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const createTodo = async (listName: string, themeName: string) => {
    try {
      const response = await axios.post('/api/todos', { name: listName, themeName }); // Adjust the API endpoint as needed
      console.log('Response from createTodo:', response); // Add logging for the response
      fetchTodos(); // Refresh the list of todos after adding a new one
    } catch (error) {
      console.error('Failed to create todo:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, createTodo };
};

export default useTodo;
