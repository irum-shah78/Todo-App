import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../store/slices/todoSlice';
import { Todo } from '@/types/type';
import { SerializedError } from '@reduxjs/toolkit';

const useTodo = () => {
  const dispatch = useAppDispatch();
  const { todos, status, error } = useAppSelector((state) => state?.todo);

  const getTodos = (email: string) => {
    if (!email) {
      return;
    }
    dispatch(fetchTodos(email));
  };

  const addNewTodo = (name: string, email: string, theme: string) => {
    if (!name || !email || !theme) {
      return;
    }
    dispatch(addTodo({ name, email, theme }));
  };

  const updateExistingTodo = (id: string, name: string, email: string, theme: string) => {
    if (!id || !name || !email || !theme) {
      return;
    }
    const updatedTodo: Todo = { id, name, email, theme };
    dispatch(updateTodo(updatedTodo));
  };

  const removeTodo = (id: string) => {
    if (!id) {
      return;
    }
    dispatch(deleteTodo(id));
  };

  useEffect(() => {
    if (status === 'failed' && error) {
      console.error((error as SerializedError).message);
    }
  }, [status, error]);

  return {
    todos,
    status,
    error,
    getTodos,
    addNewTodo,
    updateExistingTodo,
    removeTodo,
  };
};

export default useTodo;