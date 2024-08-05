// 'use client';
// import { useState } from 'react';
// import { useUpdateUser } from '../../hooks/useUpdate';
// import Image from 'next/image';
// import Header from '@/components/settingsheader/SettingsHeader';
// import { Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/navigation'; 
// import { useSession } from 'next-auth/react';
// import editIcon from "../../../public/assets/icons/Edit.svg"

// const ProfileSettings = () => {
//   const { data: session } = useSession();
//   const { updateUser, loading, error, success } = useUpdateUser();
//   const [name, setName] = useState(session?.user?.name || '');
//   const [email, setEmail] = useState(session?.user?.email || '');
//   const [image, setImage] = useState(session?.user?.image || '');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const router = useRouter(); 

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       setImageFile(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     let imageUrl = image;

//     if (imageFile) {
//       const formData = new FormData();
//       formData.append('file', imageFile);
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await response.json();
//       imageUrl = data.url;
//     }

//     await updateUser({ name, email, image: imageUrl });
//   };

//   const handleChangePassword = () => {
//     router.push('/change-password');
//   };

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
//                 <Image
//                   src={image}
//                   alt="Profile"
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-full bg-customText"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-customText rounded-full flex items-center justify-center">
//                 </div>
//               )}
//               <input
//                 type="file"
//                 id="fileInput"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//               <label
//                 htmlFor="fileInput"
//                 className="absolute bottom-0 right-0 cursor-pointer p-1 bg-customOrange rounded-full"
//               >
//                 <Image
//                   src={editIcon}
//                   alt="Edit Icon"
//                   className="rounded-full"
//                 />
//               </label>
//             </div>
//           </div>
//           <form onSubmit={handleSubmit} className="">
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
//               {error && <p className="text-red-500">{error}</p>}
//               {success && <p className="text-green-500">Profile updated successfully!</p>}
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
//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// };

// export default ProfileSettings;


// // ProfileSettings Component
// 'use client';
// import { useState } from 'react';
// import { useUpdateUser } from '../../hooks/useUpdate';
// import Image from 'next/image';
// import Header from '@/components/settingsheader/SettingsHeader';
// import { Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/navigation'; 
// import { useSession } from 'next-auth/react';
// import editIcon from "../../../public/assets/icons/Edit.svg"

// const ProfileSettings = () => {
//   const { data: session } = useSession();
//   const { updateUser, loading, error, success } = useUpdateUser();
//   const [name, setName] = useState(session?.user?.name || '');
//   const [email, setEmail] = useState(session?.user?.email || '');
//   const [image, setImage] = useState(session?.user?.image || '');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const router = useRouter(); 

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       setImageFile(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     let imageUrl = image;

//     if (imageFile) {
//       const formData = new FormData();
//       formData.append('file', imageFile);

//       try {
//         const response = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData,
//         });
//         const data = await response.json();
//         imageUrl = data.url;
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         // Handle the error (e.g., show a notification to the user)
//         return;
//       }
//     }

//     await updateUser({ name, email, image: imageUrl });
//   };

//   const handleChangePassword = () => {
//     router.push('/change-password');
//   };

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
//                 <Image
//                   src={image}
//                   alt="Profile"
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-full bg-customText"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-customText rounded-full flex items-center justify-center">
//                 </div>
//               )}
//               <input
//                 type="file"
//                 id="fileInput"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//               <label
//                 htmlFor="fileInput"
//                 className="absolute bottom-0 right-0 cursor-pointer p-1 bg-customOrange rounded-full"
//               >
//                 <Image
//                   src={editIcon}
//                   alt="Edit Icon"
//                   className="rounded-full"
//                 />
//               </label>
//             </div>
//           </div>
//           <form onSubmit={handleSubmit} className="">
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
//               {error && <p className="text-red-500">{error}</p>}
//               {success && <p className="text-green-500">Profile updated successfully!</p>}
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
//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// };

// export default ProfileSettings;


// 'use client';
// import { useState, useEffect } from 'react';
// import { useUpdateUser } from '../../hooks/useUpdate';
// import Image from 'next/image';
// import Header from '@/components/settingsheader/SettingsHeader';
// import { Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import { useSession, signOut } from 'next-auth/react';
// import editIcon from "../../../public/assets/icons/Edit.svg";

// const ProfileSettings = () => {
//   const { data: session, status } = useSession();
//   const { updateUser, loading, error, success } = useUpdateUser();
//   const [name, setName] = useState(session?.user?.name || '');
//   const [email, setEmail] = useState(session?.user?.email || '');
//   const [image, setImage] = useState(session?.user?.image || '');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (session?.user) {
//       setName(session.user.name || '');
//       setEmail(session.user.email || '');
//       setImage(session.user.image || '');
//     }
//   }, [session]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       setImageFile(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     let imageUrl = image;

//     if (imageFile) {
//       // Upload the image and get the URL
//       const formData = new FormData();
//       formData.append('file', imageFile);

//       try {
//         const response = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData,
//         });
//         const data = await response.json();
//         imageUrl = data.url;
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         return;
//       }
//     }

//     // Update the user data
//     const updatedUser = await updateUser({ name, email, image: imageUrl });

//     // Manually update session data
//     if (updatedUser && session) {
//       const updatedSession = {
//         ...session,
//         user: {
//           ...session.user,
//           name: updatedUser.name,
//           email: updatedUser.email,
//           image: updatedUser.image,
//         },
//       };
      
//       // Sign out and then sign in again to refresh the session
//       await signOut({ redirect: false });
//       window.location.reload(); // Or manually set the updated session to the session state
//     }
//   };

//   const handleChangePassword = () => {
//     router.push('/change-password');
//   };

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
//                 <Image
//                   src={image}
//                   alt="Profile"
//                   layout="fill"
//                   style={{ objectFit: 'cover' }}
//                   className="rounded-full bg-customText"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-customText rounded-full flex items-center justify-center">
//                 </div>
//               )}
//               <input
//                 type="file"
//                 id="fileInput"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//               <label
//                 htmlFor="fileInput"
//                 className="absolute bottom-0 right-0 cursor-pointer p-1 bg-customOrange rounded-full"
//               >
//                 <Image
//                   src={editIcon}
//                   alt="Edit Icon"
//                   className="rounded-full"
//                 />
//               </label>
//             </div>
//           </div>
//           <form onSubmit={handleSubmit} className="">
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
//               {error && <p className="text-red-500">{error}</p>}
//               {success && <p className="text-green-500">Profile updated successfully!</p>}
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
//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// };

// export default ProfileSettings;


'use client';
import { useState, useEffect } from 'react';
import { useUpdateUser } from '../../hooks/useUpdate';
import Image from 'next/image';
import Header from '@/components/settingsheader/SettingsHeader';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import editIcon from "../../../public/assets/icons/Edit.svg";

const ProfileSettings = () => {
  const { data: session } = useSession();
  const { updateUser, loading, error, success } = useUpdateUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
      setImage(session.user.image || '');
    }
  }, [session]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imageUrl = image;

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Image upload failed');
        }
        const data = await response.json();
        imageUrl = data.url;
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    const updatedUser = await updateUser({ name, email, image: imageUrl });

    if (updatedUser && session) {
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          name: updatedUser.name,
          email: updatedUser.email,
          image: updatedUser.image,
        },
      };

      await signOut({ redirect: false });
      window.location.reload();
    }
  };

  const handleChangePassword = () => {
    router.push('/change-password');
  };

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
                <Image
                  src={image}
                  alt="Profile"
                  layout="fill"
                  style={{ objectFit: 'cover' }}
                  className="rounded-full bg-customText"
                />
              ) : (
                <div className="w-full h-full bg-customText rounded-full flex items-center justify-center"></div>
              )}
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className="absolute bottom-0 right-0 cursor-pointer p-1 bg-customOrange rounded-full"
              >
                <Image
                  src={editIcon}
                  alt="Edit Icon"
                  className="rounded-full"
                />
              </label>
            </div>
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
                placeholder="Updated name"
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
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">Profile updated successfully!</p>}
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
        <p className="font-footerText text-customFooter text-7xl lg:text-8xl md:text-3xl sm:text-2xl">
          settings<span className="text-customOrange text-8xl">.</span>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ProfileSettings;
