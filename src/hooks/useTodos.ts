import { useState } from 'react';
import axiosInstance from '../libs/axios';
import { Todo } from '@/types/type';

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getTodos = async (email: string) => {
    if (!email) {
      setError('Email is required');
      return;
    }
    try {
      const response = await axiosInstance.get(`/?email=${email}`);
      setTodos(response.data);
    } catch (err) {
      setError('Error fetching todos');
    }
  };

  const addTodo = async (name: string, email: string, underlineColor: string) => {
    if (!name || !email || !underlineColor) {
      setError('Name, email, and underlineColor are required');
      return;
    }
    try {
      const response = await axiosInstance.post('/', { name, email, theme: underlineColor });
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (err) {
      setError('Error adding todo');
    }
  };

  const updateTodo = async (id: string, name: string, email: string, theme: string) => {
    if (!id || !name || !email || !theme) {
      setError('ID, name, email, and theme are required');
      return;
    }
    try {
      const response = await axiosInstance.put('/', { id, name, email, theme });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, name: response.data.name, theme: response.data.theme } : todo))
      );
    } catch (err) {
      setError('Error updating todo');
    }
  };

  const deleteTodo = async (id: string) => {
    if (!id) {
      setError('ID is required');
      return;
    }
    try {
      const response = await axiosInstance.delete(`/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      return response.data;
    } catch (err) {
      setError('Error deleting todo');
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