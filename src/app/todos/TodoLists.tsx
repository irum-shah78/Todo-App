import React, { useEffect } from 'react';
import  useTodo  from '../../hooks/useTodos';
import CardHeader from '../../components/cards/CardHeader';
import CardBody from '../../components/cards/CardBody';

const TodoLists: React.FC = () => {
  const { todos, getTodos, createTodo, removeTodo, editTodo } = useTodo();

  useEffect(() => {
    getTodos();
  }, []);

  const handleAddTodo = () => {
    const name = prompt('Enter todo list name');
    const theme = prompt('Enter theme');
    if (name && theme) {
      createTodo(name, theme);
    }
  };

  return (
    <div>
      <h1>Todo Lists</h1>
      <button onClick={handleAddTodo}>Add Todo List</button>
      {todos.map((todo) => (
        <div key={todo.id} className="todo-card">
          <CardHeader>{todo.name}</CardHeader>
          <CardBody>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
            <button onClick={() => editTodo(todo.id, 'New Name', 'New Theme')}>Edit</button>
          </CardBody>
        </div>
      ))}
    </div>
  );
};

export default TodoLists;
