// import { useState } from 'react';
// import axiosInstance from '../libs/axios';

// interface Todo {
//   id: string;
//   name: string;
// }

// const useTodo = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const getTodos = async (email: string) => {
//     try {
//       const response = await axiosInstance.get(`/?email=${email}`);
//       console.log("Fetched todos:", response.data);
//       setTodos(response.data);
//     } catch (err) {
//       setError('Error fetching todos');
//       console.error(err);
//     }
//   };

//   const addTodo = async (name: string, email: string) => {
//     try {
//       const response = await axiosInstance.post('/', { name, email });
//       setTodos((prevTodos) => [...prevTodos, response.data]);
//     } catch (err) {
//       setError('Error adding todo');
//       console.error(err);
//     }
//   };

//   const updateTodo = async (id: string, name: string, email: string) => {
//     try {
//       const response = await axiosInstance.put('/', { id, name, email });
//       setTodos((prevTodos) =>
//         prevTodos.map((todo) => (todo.id === id ? { ...todo, name: response.data.name } : todo))
//       );
//     } catch (err) {
//       setError('Error updating todo');
//       console.error(err);
//     }
//   };

//   const deleteTodo = async (id: string) => {
//     try {
//       const response = await axiosInstance.delete(`/${id}`);
//       setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//       return response.data;
//     } catch (err) {
//       setError('Error deleting todo');
//       console.error(err);
//     }
//   };

//   return {
//     todos,
//     error,
//     getTodos,
//     addTodo,
//     updateTodo,
//     deleteTodo,
//   };
// };

// export default useTodo;


// hooks/useTodo.ts
import { useState } from 'react';
import axiosInstance from '../libs/axios';

interface Todo {
  id: string;
  name: string;
}

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getTodos = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/?userId=${userId}`);
      console.log("Fetched todos:", response.data);
      setTodos(response.data);
    } catch (err) {
      setError('Error fetching todos');
      console.error(err);
    }
  };

  const addTodo = async (name: string, userId: string) => {
    try {
      const response = await axiosInstance.post('/', { name, userId });
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (err) {
      setError('Error adding todo');
      console.error(err);
    }
  };

  const updateTodo = async (id: string, name: string, userId: string) => {
    try {
      const response = await axiosInstance.put('/', { id, name, userId });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, name: response.data.name } : todo))
      );
    } catch (err) {
      setError('Error updating todo');
      console.error(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      return response.data;
    } catch (err) {
      setError('Error deleting todo');
      console.error(err);
    }
  };

  return {
    todos,
    error,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};

export default useTodo;




// import { useState } from 'react';
// import axiosInstance from '../libs/axios';
// import axios from 'axios';

// interface Todo {
//   id: string;
//   name: string;
// }

// interface Task {
//   id: string;
//   name: string;
//   completed: boolean;
// }

// const useTodo = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const getTodos = async (email: string) => {
//     try {
//       const response = await axiosInstance.get(`/?email=${email}`);
//       setTodos(response.data);
//     } catch (err) {
//       setError('Error fetching todos');
//       console.error(err);
//     }
//   };

//   const addTodo = async (name: string, email: string) => {
//     try {
//       const response = await axiosInstance.post('/', { name, email });
//       setTodos((prevTodos) => [...prevTodos, response.data]);
//     } catch (err) {
//       setError('Error adding todo');
//       console.error(err);
//     }
//   };

//   const updateTodo = async (id: string, name: string, email: string) => {
//     try {
//       const response = await axiosInstance.put('/', { id, name, email });
//       setTodos((prevTodos) =>
//         prevTodos.map((todo) => (todo.id === id ? { ...todo, name: response.data.name } : todo))
//       );
//     } catch (err) {
//       setError('Error updating todo');
//       console.error(err);
//     }
//   };

//   const deleteTodo = async (id: string) => {
//     try {
//       const response = await axiosInstance.delete(`/${id}`);
//       setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//       return response.data;
//     } catch (err) {
//       setError('Error deleting todo');
//       console.error(err);
//     }
//   };

//   const getTasks = async (todoId: string) => {
//     try {
//       const response = await axios.get(`api/tasks/?todoId=${todoId}`);
//       setTasks(response.data);
//     } catch (err) {
//       setError('Error fetching tasks');
//       console.error(err);
//     }
//   };

//   const addTask = async (name: string, todoId: string) => {
//     try {
//       const response = await axios.post('api/tasks', { name, todoId });
//       setTasks((prevTasks) => [...prevTasks, response.data]);
//     } catch (err) {
//       setError('Error adding task');
//       console.error(err);
//     }
//   };

//   return {
//     todos,
//     tasks,
//     error,
//     getTodos,
//     addTodo,
//     updateTodo,
//     deleteTodo,
//     getTasks,
//     addTask,
//   };
// };

// export default useTodo;
