import { useState } from 'react';
import axios from 'axios';

interface Task {
  id: string;
  name: string;
  completed: boolean;
  todoId: string;
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getTasks = async (todoId: string) => {
    try {
      const response = await axios.get(`/api/task?todoId=${todoId}`);
      console.log("Fetched tasks:", response.data);
      setTasks(response.data);
    } catch (err) {
      setError('Error fetching tasks');
      console.error(err);
    }
  };


  const addTask = async (name: string, todoId: string) => {
    try {
      const response = await axios.post('/api/task', { name, todoId });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (err) {
      setError('Error adding task');
      console.error(err);
    }
  };

  const updateTask = async (id: string, name: string, completed: boolean) => {
    try {
      const response = await axios.put('/api/task', { id, name, completed });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, name: response.data.name, completed: response.data.completed } : task))
      );
    } catch (err) {
      setError('Error updating task');
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await axios.delete(`/api/task?id=${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      return response.data;
    } catch (err) {
      setError('Error deleting task');
      console.error(err);
    }
  };


  return {
    tasks,
    error,
    getTasks,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
