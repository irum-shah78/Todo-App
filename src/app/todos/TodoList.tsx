import React, { useState } from 'react';
import  useTodo  from '../../hooks/useTodos';
import CardHeader from '../../components/cards/CardHeader';
import CardBody from '../../components/cards/CardBody';

const TodoList: React.FC = () => {
  const { todos, createTodo, removeTodo, editTodo } = useTodo();
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task) {
      createTodo(task, 'default');
      setTask('');
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={handleAddTask}>Add Task</button>
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

export default TodoList;
