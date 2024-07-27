import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
};

export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
  const response = await axios.get('todo');
  return response.data;
});

export const addTodo = createAsyncThunk('/addTodo', async (todo) => {
  const response = await axios.post('todo', todo);
  return response.data;
});

// export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
//   await axios.delete(`todo/${id}`);
//   return id;
// });

// export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
//   const response = await axios.put(`todo/${todo.id}`, todo);
//   return response.data;
// });

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      // .addCase(addTodo.fulfilled, (state, action) => {
      //   state.todos.push(action.payload);
      // })
      // .addCase(deleteTodo.fulfilled, (state, action) => {
      //   state.todos = state.todos.filter(todo => todo.id !== action.payload);
      // })
      // .addCase(updateTodo.fulfilled, (state, action) => {
      //   const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      //   state.todos[index] = action.payload;
      // });
  },
});

export default todoSlice.reducer;


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
//   const response = await axios.get('/api/todos');
//   return response.data;
// });

// export const addTodo = createAsyncThunk('todos/addTodo', async (todo: Omit<Todo, 'id'>) => {
//   const response = await axios.post('/api/todos', todo);
//   return response.data;
// });

// export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
//   await axios.delete(`/api/todos/${id}`);
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


// // src/state/todoSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Todo {
//   id: string;
//   name: string;
// }

// interface TodoState {
//   todos: Todo[];
// }

// const initialState: TodoState = {
//   todos: [],
// };

// const todoSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     addTodo: (state, action: PayloadAction<{ name: string; themeName: string }>) => {
//       const newTodo = {
//         id: Date.now().toString(),
//         ...action.payload,
//       };
//       state.todos.push(newTodo);
//     },
//   },
// });

// export const { addTodo } = todoSlice.actions;
// export default todoSlice.reducer;
