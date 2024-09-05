import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useProfileSettings = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
    imageFile: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData((prevData) => ({
        ...prevData,
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        image: session?.user?.image || '',
      }));
    }
  }, [session]);

  const updateProfile = async (name: string, email: string, imagePath: string) => {
    try {
      const updateResponse = await axios.put('/api/update', {
        name,
        email,
        imagePath,
      });

      if (updateResponse.status === 200) {
        toast.success('Profile updated successfully');
        await update({ user: { ...session?.user, name, email, image: updateResponse.data.user.image } });

        router.refresh();
      } else {
        throw new Error('Profile update failed');
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagePath = formData?.image;

      if (formData?.imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(formData?.imageFile);
        reader.onloadend = async () => {
          imagePath = reader.result as string;
          await updateProfile(formData?.name, formData?.email, imagePath);
          setLoading(false);
        };
      } else {
        await updateProfile(formData?.name, formData?.email, imagePath);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(`Failed to update profile: ${error?.message}`);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files?.[0]) {
      const file = files[0];
      setFormData((prevData) => ({ ...prevData, imageFile: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleChangePassword = () => {
    router.push('/changepassword');
  };

  return {
    formData,
    setFormData,
    loading,
    status,
    handleSubmit,
    handleInputChange,
    handleChangePassword,
  };
};
