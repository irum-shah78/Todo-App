import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useProfileSettings = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
      setImage(session.user.image || '');
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagePath = image;
      if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = async () => {
          imagePath = reader.result as string; 

          const updateResponse = await axios.put('/api/update', {
            name,
            email,
            imagePath, 
          });

          if (updateResponse.status === 200) {
            toast.success('Profile updated successfully');
            router.refresh();
          } else {
            throw new Error('Profile update failed');
          }

          setLoading(false);
        };
      } else {
        const updateResponse = await axios.put('/api/update', {
          name,
          email,
        });

        if (updateResponse.status === 200) {
          toast.success('Profile updated successfully');
          router.refresh();
        } else {
          throw new Error('Profile update failed');
        }

        setLoading(false);
      }
    } catch (error: any) {
      toast.error(`Failed to update profile: ${error.message}`);
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = () => {
    router.push('/changepassword');
  };

  return {
    name,
    setName,
    email,
    setEmail,
    image,
    setImage,
    loading,
    status,
    handleSubmit,
    handleImageChange,
    handleChangePassword,
  };
};
