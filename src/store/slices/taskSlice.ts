import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task } from '@/types/type';

interface TasksState {
  tasks: Task[];
  error: string | null;
  loading: boolean;
}

const initialState: TasksState = {
  tasks: [],
  error: null,
  loading: false,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todoId: string) => {
  const response = await axios.get(`/api/task?todoId=${todoId}`);
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async ({ name, todoId }: { name: string; todoId: string }) => {
  const response = await axios.post('/api/task', { name, todoId });
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, name, completed }: { id: string; name: string; completed: boolean }) => {
  const response = await axios.put('/api/task', { id, name, completed });
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  await axios.delete(`/api/task?id=${id}`);
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action?.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching tasks';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action?.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const updatedTask = action?.payload;
        state.tasks = state?.tasks.map((task) => (task?.id === updatedTask?.id ? updatedTask : task));
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state?.tasks.filter((task) => task?.id !== action?.payload);
      });
  },
});

export default taskSlice.reducer;
