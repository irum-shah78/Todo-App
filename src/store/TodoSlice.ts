import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('/api/todos');
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await axios.post('/api/todos', todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`/api/todos/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const response = await axios.put(`/api/todos/${todo.id}`, todo);
  return response.data;
});

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        state.todos[index] = action.payload;
      });
  },
});

export default todoSlice.reducer;
