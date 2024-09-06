import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import todoReducer from './slices/todoSlice';
import taskReducer from './slices/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;