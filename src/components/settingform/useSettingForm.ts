// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export const useProfileSettings = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [name, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [image, setImage] = useState<string>('');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (session?.user) {
//       setName(session.user.name || '');
//       setEmail(session.user.email || '');
//       setImage(session.user.image || '');
//     }
//   }, [session]);

//   const handleImageUpload = async (file: File) => {
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data.imageUrl;
//     } catch (error) {
//       throw new Error('Failed to upload image');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let imageUrl = image;

//       if (imageFile) {
//         imageUrl = await handleImageUpload(imageFile);
//       }

//       const updateResponse = await axios.put('/api/update', {
//         userId: session?.user?.id,
//         name,
//         email,
//         image: imageUrl,
//       });

//       if (updateResponse.status === 200) {
//         toast.success('Profile updated successfully');
//         router.refresh();
//       } else {
//         throw new Error('Profile update failed');
//       }
//     } catch (error: any) {
//       console.error('Error during submission:', error.message);
//       toast.error(`Failed to update profile: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleChangePassword = () => {
//     router.push('/changepassword');
//   };

//   return {
//     name,
//     setName,
//     email,
//     setEmail,
//     image,
//     setImage,
//     loading,
//     status,
//     handleSubmit,
//     handleImageChange,
//     handleChangePassword,
//   };
// };


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
      let imagePath = image; // Default to existing image URL

      // Convert the image to base64 string and upload to Cloudinary
      if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = async () => {
          imagePath = reader.result as string; // Get the base64 encoded image

          const updateResponse = await axios.put('/api/update', {
            name,
            email,
            imagePath, // Pass the base64 encoded image to the API route
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
        // Submit form without uploading a new image
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
      console.error('Error during submission:', error.message);
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
        setImage(reader.result as string); // Update preview image
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
