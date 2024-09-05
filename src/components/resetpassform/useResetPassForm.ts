import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useResetPassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ password: string; confirmPassword: string }>({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      toast.error("Invalid or missing token!");
      router.push("/signin");
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData?.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/api/resetpassword', { token, password: formData?.password });
      toast.success(response?.data?.message ?? "Password reset successful.");
      router.push("/signin");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Something went wrong!");
    }
    setLoading(false);
  };

  return {
    formData,
    handleInputChange,
    loading,
    handleSubmit,
  };
};
