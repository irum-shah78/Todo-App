import { useState } from 'react';
import axios from 'axios';

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async (data: { name: string; email: string; image: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.put('/api/user/update', data);
      setSuccess(true);
      return response.data;
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update user');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error, success };
};
