// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// interface Todo {
//   id: string;
//   name: string;
//   theme: string;
// }

// interface TodoState {
//   todos: Todo[];
// }

// const initialState: TodoState = {
//   todos: [],
// };

// export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
//   const response = await axios.get('/api/todo');
//   return response.data;
// });

// export const addTodo = createAsyncThunk('todos/addTodo', async (todo: Omit<Todo, 'id'>) => {
//   const response = await axios.post('/api/todo', todo);
//   return response.data;
// });

// export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
//   await axios.delete(`/api/todo/${id}`);
//   return id;
// });

// export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo: Todo) => {
//   const response = await axios.put(`/api/todos/${todo.id}`, todo);
//   return response.data;
// });

// const todoSlice = createSlice({
//   name: 'todo',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchTodos.fulfilled, (state, action) => {
//       state.todos = action.payload;
//     });
//     builder.addCase(addTodo.fulfilled, (state, action) => {
//       state.todos.push(action.payload);
//     });
//     builder.addCase(deleteTodo.fulfilled, (state, action) => {
//       state.todos = state.todos.filter((todo) => todo.id !== action.payload);
//     });
//     builder.addCase(updateTodo.fulfilled, (state, action) => {
//       const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
//       if (index !== -1) {
//         state.todos[index] = action.payload;
//       }
//     });
//   },
// });

// export default todoSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Todo {
  id: string;
  name: string;
  theme: string;
}

interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
};

// Async Thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('/api/todo');
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo: Omit<Todo, 'id'>) => {
  const response = await axios.post('/api/todo', todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  await axios.delete(`/api/todo/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo: Todo) => {
  const response = await axios.put(`/api/todo/${todo.id}`, todo);
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
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export default todoSlice.reducer;
