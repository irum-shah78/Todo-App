// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { toast, Toaster } from 'react-hot-toast';
// import Header from '@/components/settingsheader/SettingsHeader';
// import editIcon from "../../../public/assets/icons/Edit.svg";
// import axios from 'axios';

// const ProfileSettings = () => {
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
//       return response.data.imagePath;
//     } catch (error) {
//       console.error('Upload error:', error);
//       throw new Error('Failed to upload image');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let imagePath = image;
//       if (imageFile) {
//         // const formData = new FormData();
//         // formData.append('image', imageFile);

//         // const response = await axios.post('api/upload', formData, {
//         //   headers: {
//         //     'Content-Type': 'multipart/form-data',
//         //   },
//         // });

//         // if (response.status === 200 && response.data.imagePath) {
//         //   imagePath = response.data.imagePath;
//         // } else {
//         //   throw new Error('Image upload failed');
//         // }
//         const formData = new FormData();
//         formData.append('image', imageFile); // Assuming `file` is a file input
      
//         try {
//           const response = await axios.post('/api/upload', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' },
//           });
//           console.log('File uploaded successfully:', response.data);
//         } catch (error) {
//           console.error('Error during submission:', error);
//         }
//       };
      
//       const updateResponse = await axios.put('/api/update', {
//         userId: session?.user?.id,
//         name,
//         email,
//         image: imagePath,
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

//   if (status === 'loading') return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//       <Header />
//       <div className="flex-grow flex items-center justify-center bg-center">
//         <div className="p-6 w-96">
//           <h1 className="text-8xl text-customText font-footerText text-center">
//             Settings<span className="text-customOrange">.</span>
//           </h1>
//           <div className="relative flex flex-col items-center">
//             <div className="relative w-24 h-24">
//               {image ? (
//                 <Image src={image} alt="Profile" fill style={{ objectFit: 'cover' }} className="rounded-full bg-customText"/>
//               ) : (
//                 <div className="w-full h-full bg-customText rounded-full flex items-center justify-center"></div>
//               )}
//               <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange} className="hidden"/>
//               <label htmlFor="fileInput"
//                 className="absolute bottom-0 right-0 cursor-pointer p-1 bg-customOrange rounded-full"
//               >
//                 <Image src={editIcon} alt="Edit Icon" className="rounded-full"/>
//               </label>
//             </div>
//             <p className=' text-customText text-xl text-center'>Profile Photo</p>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-2">
//               <label htmlFor="name" className="block text-customText text-xl ml-6">Name</label>
//               <input
//                 id="name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
//                 placeholder='Updated name'
//               />
//             </div>
//             <div className="space-y-2 mt-2">
//               <label htmlFor="email" className="block text-customText text-xl ml-6">Email</label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
//               />
//             </div>
//             <div className="flex justify-center items-center h-full mt-4">
//               <button
//                 type="button"
//                 onClick={handleChangePassword}
//                 className="px-6 py-1 mt-4 text-customOrange font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
//               >
//                 Change Password
//               </button>
//             </div>
//             <div className="flex justify-center items-center h-full mt-4">
//               <button
//                 type="submit"
//                 className="px-8 py-1 mt-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
//                 disabled={loading}
//               >
//                 {loading ? 'Updating...' : 'Save Changes'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <div className="flex justify-end mb-4">
//         <p className="font-footerText text-customFooter text-7xl lg:text-8xl md:text-3xl sm:text-2xl">
//           settings<span className="text-customOrange text-8xl">.</span>
//         </p>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default ProfileSettings;


'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast, Toaster } from 'react-hot-toast';
import Header from '@/components/settingsheader/SettingsHeader';
import editIcon from "../../../public/assets/icons/Edit.svg";
import axios from 'axios';

const ProfileSettings = () => {
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

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.imagePath;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Failed to upload image');
    }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     let imagePath = image;
  //     if (imageFile) {
  //       imagePath = await handleImageUpload(imageFile);
  //     }

  //     const updateResponse = await axios.put('/api/update', {
  //       userId: session?.user?.id,
  //       name,
  //       email,
  //       image: imagePath,
  //     });

  //     if (updateResponse.status === 200) {
  //       toast.success('Profile updated successfully');
  //       router.refresh();
  //     } else {
  //       throw new Error('Profile update failed');
  //     }
  //   } catch (error: any) {
  //     console.error('Error during submission:', error.message);
  //     toast.error(`Failed to update profile: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      let imagePath = image;
      if (imageFile) {
        imagePath = await handleImageUpload(imageFile);
      }
  
      const updateResponse = await axios.put('/api/update', {
        userId: session?.user?.id,
        name,
        email,
        image: imagePath,
      });
  
      if (updateResponse.status === 200) {
        toast.success('Profile updated successfully');
        router.refresh();
      } else {
        throw new Error('Profile update failed');
      }
    } catch (error: any) {
      console.error('Error during submission:', error.message);
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
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

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-center">
        <div className="p-6 w-96">
          <h1 className="text-8xl text-customText font-footerText text-center">
            Settings<span className="text-customOrange">.</span>
          </h1>
          <div className="relative flex flex-col items-center">
            <div className="relative w-24 h-24">
              {image ? (
                <Image src={image} alt="Profile" fill style={{ objectFit: 'cover' }} className="rounded-full bg-customText"/>
              ) : (
                <div className="w-full h-full bg-customText rounded-full flex items-center justify-center"></div>
              )}
              <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange} className="hidden"/>
              <label htmlFor="fileInput"
                className="absolute bottom-0 right-0 cursor-pointer p-1 bg-customOrange rounded-full"
              >
                <Image src={editIcon} alt="Edit Icon" className="rounded-full"/>
              </label>
            </div>
            <p className=' text-customText text-xl text-center'>Profile Photo</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-customText text-xl ml-6">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
                placeholder='Updated name'
              />
            </div>
            <div className="space-y-2 mt-2">
              <label htmlFor="email" className="block text-customText text-xl ml-6">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
              />
            </div>
            <div className="flex justify-center items-center h-full mt-4">
              <button
                type="button"
                onClick={handleChangePassword}
                className="px-6 py-1 mt-4 text-customOrange font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
              >
                Change Password
              </button>
            </div>
            <div className="flex justify-center items-center h-full mt-4">
              <button
                type="submit"
                className="px-8 py-1 mt-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <p className="font-footerText text-customFooter text-7xl lg:text-8xl md:text-3xl">Next<span className="text-customOrange">.</span></p>
      </div>
      <Toaster />
    </div>
  );
};

export default ProfileSettings;
