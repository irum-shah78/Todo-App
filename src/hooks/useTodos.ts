// import { useState } from 'react';
// import axiosInstance from '../libs/axios';

// const useTodo = () => {
//   const [todos, setTodos] = useState<any[]>([]);
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
//       setTodos([...todos, response.data]);
//     } catch (err) {
//       setError('Error adding todo');
//       console.error(err);
//     }
//   };

//   return {
//     todos,
//     error,
//     getTodos,
//     addTodo,
//   };
// };

// export default useTodo;


// import { useState } from 'react';
// import axiosInstance from '../libs/axios';

// const useTodo = () => {
//   const [todos, setTodos] = useState<any[]>([]);
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

//   return {
//     todos,
//     error,
//     getTodos,
//     addTodo,
//   };
// };

// export default useTodo;

import { useState } from 'react';
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

  const addTodo = async (name: string, email: string) => {
    try {
      const response = await axiosInstance.post('/', { name, email });
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (err) {
      setError('Error adding todo');
      console.error(err);
    }
  };

  const updateTodo = async (id: string, name: string, email: string) => {
    try {
      const response = await axiosInstance.put('/', { id, name, email });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, name: response.data.name } : todo))
      );
    } catch (err) {
      setError('Error updating todo');
      console.error(err);
    }
  };

  return {
    todos,
    error,
    getTodos,
    addTodo,
    updateTodo,
  };
};

export default useTodo;
