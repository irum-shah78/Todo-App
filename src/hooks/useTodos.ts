import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../store/TodoSlice';

const useTodo = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todo);

  const getTodos = () => {
    dispatch(fetchTodos());
  };

  const createTodo = (name: string, theme: string) => {
    dispatch(addTodo({ name, theme }));
  };

  const removeTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const editTodo = (id: string, name: string, theme: string) => {
    dispatch(updateTodo({ id, name, theme }));
  };

  return { todos, getTodos, createTodo, removeTodo, editTodo };
};

export default useTodo;
