import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useChangePassword = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/changepassword', { email });
      toast.success(response?.data?.message || "Password change request successful!");
    } catch (error: any) {
      const errorMessage = error?.response?.status === 400
        ? "Email not found. Please check and try again."
        : error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    handleSubmit,
  };
};

export default useChangePassword;
