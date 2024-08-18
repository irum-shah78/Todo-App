import { createSlice } from '@reduxjs/toolkit';
import { UserProfile } from '@/types/type';

const initialState = {
  user: null as UserProfile | null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.image = action.payload.image;
      }
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;

export default authSlice.reducer;