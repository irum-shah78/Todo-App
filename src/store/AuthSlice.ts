import { createSlice } from '@reduxjs/toolkit';

interface UserProfile {
  name: string;
  email: string;
  image: string;
}

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


// // src/store/slices/authSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { RootState } from '../store';

// interface AuthState {
//   user: any | null;
//   isAuthenticated: boolean;
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false,
//   status: 'idle',
//   error: null,
// };

// // Async actions for signIn and signOut
// export const signIn = createAsyncThunk(
//   'auth/signIn',
//   async (credentials: { email: string; password: string }) => {
//     // Your sign-in logic here
//     // Return user data after successful sign-in
//   }
// );

// export const signOut = createAsyncThunk('auth/signOut', async () => {
//   // Your sign-out logic here
//   // Perform necessary sign-out actions
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(signIn.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signIn.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//         state.isAuthenticated = true;
//       })
//       .addCase(signIn.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Failed to sign in';
//       })
//       .addCase(signOut.fulfilled, (state) => {
//         state.status = 'succeeded';
//         state.user = null;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export default authSlice.reducer;
