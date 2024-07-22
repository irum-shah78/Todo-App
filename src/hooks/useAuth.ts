import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { login, logout } from '../store/AuthSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const signIn = async (email: string, password: string) => {
    // Perform sign in logic
    dispatch(login({ email, password }));
  };

  const signOut = () => {
    dispatch(logout());
  };

  return { user, isAuthenticated, signIn, signOut };
};

export default useAuth;


// src/hooks/useAuth.ts
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../store/index'; // Ensure these paths are correct
// import { signIn as signInAction, signOut as signOutAction } from '../store/AuthSlice';

// const useAuth = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

//   const signIn = async (email: string, password: string) => {
//     // Sign-in logic here
//     dispatch(signInAction({ email, password }));
//   };

//   const signOut = () => {
//     dispatch(signOutAction());
//   };

//   return {
//     user,
//     isAuthenticated,
//     signIn,
//     signOut,
//   };
// };

// export default useAuth;
