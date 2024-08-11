import { useState } from 'react';
import axiosInstance from '../libs/axios';

interface Todo {
  id: string;
  name: string;
}

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getTodos = async (email: string) => {
    try {
      const response = await axiosInstance.get(`/?email=${email}`);
      console.log("Fetched todos:", response.data);
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