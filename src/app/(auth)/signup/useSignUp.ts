// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { signOut } from 'next-auth/react';

// export const useSignUp = () => {
//   const router = useRouter();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     signOut({
//       redirect: false,
//     });
//   }, []);

//   const signup = async () => {
//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match!');
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post('/api/register', {
//         name, email, password, confirmPassword
//       });

//       toast.success('Successfully Registered!');
//       router.push('/signin');
//     } catch (error: any) {
//       console.log(error);
//       toast.error(error?.response?.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     signup();
//   };

//   return {
//     name,
//     setName,
//     email,
//     setEmail,
//     password,
//     setPassword,
//     confirmPassword,
//     setConfirmPassword,
//     loading,
//     handleSubmit,
//   };
// };


import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';

export const useSignUp = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const signup = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/register', {
        name,
        email,
        password,
        confirmPassword,
      });

      toast.success('Successfully Registered!');
      router.push('/signin');
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup();
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleSubmit,
  };
};
