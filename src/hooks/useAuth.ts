// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store/index';
// import { login, logout } from '../store/AuthSlice';

// const useAuth = () => {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

//   const signIn = async (email: string, password: string) => {
//     dispatch(login({ email, password }));
//   };

//   const signOut = () => {
//     dispatch(logout());
//   };

//   return { user, isAuthenticated, signIn, signOut };
// };

// export default useAuth;