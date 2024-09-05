import axiosInstance from '@/libs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo, TodoState } from '@/types/type';

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (email: string) => {
  const response = await axiosInstance.get(`/?email=${email}`);
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async ({ name, email }: { name: string, email: string }) => {
  const response = await axiosInstance.post('/', { name, email });
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  await axiosInstance.delete(`/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo: Todo) => {
  const response = await axiosInstance.put(`/${todo?.id}`, todo);
  return response.data;
});

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action?.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error?.message || 'Failed to fetch todos';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action?.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state?.todos?.filter((todo) => todo?.id !== action?.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state?.todos?.findIndex((todo) => todo?.id === action?.payload?.id);
        if (index !== -1) {
          state.todos[index] = action?.payload;
        }
      });
  },
});

export default todoSlice.reducer;