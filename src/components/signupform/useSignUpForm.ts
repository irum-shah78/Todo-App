import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { inputFields as FIELDS } from '../../constants/inputFields';

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

  const validateName = () => {
    const trimmedName = name.trim();
    if (trimmedName.length < 3) {
      toast.error('Name must be at least 3 characters long.');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      toast.error('Name can only contain letters and spaces.');
      return false;
    }
    return true;
  };

  const signup = async () => {
    if (!validateName()) return;
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
      toast.error(error?.response?.data?.message ?? 'User already exists!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup();
  };

  // Map input fields with state values and setters
  const inputFields = FIELDS.map((field) => ({
    ...field,
    value:
      field?.label === 'Name'
        ? name
        : field?.label === 'Email'
        ? email
        : field?.label === 'Password'
        ? password
        : confirmPassword,
    onChange:
      field?.label === 'Name'
        ? setName
        : field?.label === 'Email'
        ? setEmail
        : field?.label === 'Password'
        ? setPassword
        : setConfirmPassword,
  }));

  return {
    inputFields,
    loading,
    handleSubmit,
  };
};
