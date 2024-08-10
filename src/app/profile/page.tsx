'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/appheader/Header';
import toast, { Toaster } from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        body: formData,
      });
  
      if (res.ok) {
        toast.success('Profile updated successfully!');
        router.push('/profile'); // Use a specific URL or current path
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
        <h1 className="text-8xl text-customText font-footerText">Profile Update</h1>
        <div className="mt-8 w-full max-w-md">
          <label className="text-customText text-lg">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border-2 border-customOrange rounded-md mt-2"
          />
          <label className="text-customText text-lg mt-4">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border-2 border-customOrange rounded-md mt-2"
          />
          <label className="text-customText text-lg mt-4">Profile Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border-2 border-customOrange rounded-md mt-2"
          />
          <button
            onClick={handleUpdateProfile}
            className="w-full mt-6 bg-customOrange text-customText font-semibold p-2 rounded-md"
          >
            Update Profile
          </button>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ProfilePage;
