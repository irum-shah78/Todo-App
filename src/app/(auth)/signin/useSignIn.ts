import { useState, useEffect } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loadingCredentials, setLoadingCredentials] = useState<boolean>(false);
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);

  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const signin = async () => {
    setLoadingCredentials(true);
    try {
      const signinResponse = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/todos/todo',
      });

      if (signinResponse?.ok) {
        toast.success('Successfully Logged in!');
        setTimeout(() => {
          router.push('/todos/todo');
        }, 2000);
      } else if (signinResponse?.error) {
        toast.error(signinResponse.error ?? 'An error occurred during sign-in.');
      }
    } catch (error: any) {
      toast.error(error?.message ?? 'Something went wrong during sign-in.');
    } finally {
      setLoadingCredentials(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);
    try {
      const googleSigninResponse = await signIn('google', {
        redirect: false,
        callbackUrl: '/todos/todo',
      });

      if (googleSigninResponse?.ok) {
        toast.success('Successfully Logged in with Google!');
        setTimeout(() => {
          router.push('/todos/todo');
        }, 2000);
      } else if (googleSigninResponse?.error) {
        toast.error(googleSigninResponse.error ?? 'An error occurred during Google sign-in.');
      }
    } catch (error: any) {
      toast.error(error?.message ?? 'Something went wrong during Google sign-in.');
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and password are required!');
      return;
    }
    await signin();
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loadingCredentials,
    loadingGoogle,
    handleSubmit,
    handleGoogleSignIn,
  };
};
