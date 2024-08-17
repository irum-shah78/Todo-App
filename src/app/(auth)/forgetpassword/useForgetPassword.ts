import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/api/forgetpassword', { email });
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error("Email not found. Please check and try again.");
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      }
    }
    setLoading(false);
  };

  return {
    email,
    setEmail,
    loading,
    handleSubmit,
  };
};
