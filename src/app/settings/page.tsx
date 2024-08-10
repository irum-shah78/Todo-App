// 'use client';
// import { useState, useEffect } from 'react';
// import { useUpdateUser } from '../../hooks/useUpdate';
// import Image from 'next/image';
// import Header from '@/components/settingsheader/SettingsHeader';
// import { Toaster, toast } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import editIcon from "../../../public/assets/icons/Edit.svg"
// import axios from 'axios';
// import { getSession } from 'next-auth/react';

// const ProfileSettings = () => {
//   const { data: session } = useSession();
//   const { updateUser, loading, error, success } = useUpdateUser();
//   const [name, setName] = useState(session?.user?.name || '');
//   const [email, setEmail] = useState(session?.user?.email || '');
//   const [image, setImage] = useState(session?.user?.image || '');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     let imageBase64 = '';

//     if (imageFile) {
//       const formData = new FormData();
//       formData.append('file', imageFile);

//       try {
//         const response = await fetch('../api/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error('Image upload failed');
//         }

//         const data = await response.json();
//         imageBase64 = data.imageBase64;
//       } catch (error) {
//         toast.error('Failed to upload image');
//         return;
//       }
//     }

//     try {
//       await updateUser({ name, email, image: imageBase64 ? new File([imageBase64], 'profile.jpg') : null });
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       toast.error('Failed to update profile');
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

//   useEffect(() => {
//     if (session?.user) {
//       setName(session.user.name || '');
//       setEmail(session.user.email || '');
//     }
//   }, [session]);

//   const handleChangePassword = () => {
//     router.push('/changepassword');
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
// import { Toaster, toast } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import { useSession, signOut } from 'next-auth/react';
// import editIcon from "../../../public/assets/icons/Edit.svg";
// import axios from 'axios';

// const ProfileSettings = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const { updateUser, loading, error, success } = useUpdateUser();

//   const [name, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [image, setImage] = useState<string>('');
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   useEffect(() => {
//     // Fetch and set user data if session is loaded
//     if (session?.user) {
//       setName(session.user.name || '');
//       setEmail(session.user.email || '');
//       setImage(session.user.image || '');
//     }
//   }, [session]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     let imageBase64 = '';

//     if (imageFile) {
//       const formData = new FormData();
//       formData.append('file', imageFile);

//       try {
//         const response = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error('Image upload failed');
//         }

//         const data = await response.json();
//         imageBase64 = data.imageBase64;
//       } catch (error) {
//         toast.error('Failed to upload image');
//         return;
//       }
//     }

//     try {
//       await updateUser({ name, email, image: imageBase64 ? new File([imageBase64], 'profile.jpg') : null });
//       toast.success('Profile updated successfully');

//       // Manually refresh session to get the latest data
//       await signOut({ redirect: false });
//       router.push('/profile'); // Redirect to profile page or settings page
//     } catch (error) {
//       toast.error('Failed to update profile');
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
// import { Toaster, toast } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import { useSession, signOut } from 'next-auth/react';
// import editIcon from "../../../public/assets/icons/Edit.svg";
// import axios from 'axios';

// const ProfileSettings = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const { updateUser, loading, error, success } = useUpdateUser();

//   const [name, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [image, setImage] = useState<string>('');
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   useEffect(() => {
//     if (session?.user) {
//       setName(session.user.name || '');
//       setEmail(session.user.email || '');
//       setImage(session.user.image || '');
//     }
//   }, [session]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     let imageBase64 = '';

//     if (imageFile) {
//       const formData = new FormData();
//       formData.append('file', imageFile);

//       try {
//         const response = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error('Image upload failed');
//         }

//         const data = await response.json();
//         imageBase64 = data.imageBase64;
//       } catch (error) {
//         toast.error('Failed to upload image');
//         return;
//       }
//     }

//     try {
//       await updateUser({ name, email, image: imageBase64 ? new File([imageBase64], 'profile.jpg') : null });
//       toast.success('Profile updated successfully');
//       router.push('/todos/todo'); // Redirect to profile page or settings page
//     } catch (error) {
//       toast.error('Failed to update profile');
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
// import { Toaster, toast } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import { useSession, signOut } from 'next-auth/react';
// import editIcon from "../../../public/assets/icons/Edit.svg";

// const ProfileSettings = () => {
//   // const { data: session, status } = useSession();
//   // const router = useRouter();

//   // const [name, setName] = useState<string>('');
//   // const [email, setEmail] = useState<string>('');
//   // const [image, setImage] = useState<string>('');
//   // const [imageFile, setImageFile] = useState<File | null>(null);
//   // const [loading, setLoading] = useState(false);

//   // useEffect(() => {
//   //   if (session?.user) {
//   //     setName(session.user.name || '');
//   //     setEmail(session.user.email || '');
//   //     setImage(session.user.image || '');
//   //   }
//   // }, [session]);

//   // const handleImageUpload = async (): Promise<string | undefined> => {
//   //   if (!imageFile) return undefined;

//   //   const formData = new FormData();
//   //   formData.append('image', imageFile);

//   //   try {
//   //     const response = await fetch('/api/upload', {
//   //       method: 'POST',
//   //       body: formData,
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error('Failed to upload image');
//   //     }

//   //     const data = await response.json();
//   //     return data.imagePath;
//   //   } catch (error) {
//   //     toast.error('Failed to upload image');
//   //     return undefined;
//   //   }
//   // };

//   // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   try {
//   //     const imagePath = await handleImageUpload();

//   //     const response = await fetch('/api/update', {
//   //       method: 'PUT',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({
//   //         name,
//   //         email,
//   //         imagePath,
//   //       }),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error('Failed to update profile');
//   //     }

//   //     toast.success('Profile updated successfully');
//   //     router.push('/todos/todo');
//   //   } catch (error) {
//   //     toast.error('Failed to update profile');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = e.target.files?.[0];
//   //   if (file) {
//   //     setImageFile(file);
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setImage(reader.result as string);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };

//   // const handleChangePassword = () => {
//   //   router.push('/changepassword');
//   // };

//   // if (status === 'loading') return <div>Loading...</div>;


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

//   const handleImageUpload = async (): Promise<string | undefined> => {
//     if (!imageFile) return undefined;

//     const formData = new FormData();
//     formData.append('image', imageFile);

//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload image');
//       }

//       const data = await response.json();
//       return data.imagePath;
//     } catch (error) {
//       toast.error('Failed to upload image');
//       return undefined;
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const imagePath = await handleImageUpload();

//       const response = await fetch('/api/update', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name,
//           email,
//           imagePath,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }

//       toast.success('Profile updated successfully');
//       router.push('/todos/todo');
//     } catch (error) {
//       toast.error('Failed to update profile');
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
//                 <Image
//                   src={image.startsWith('/uploads') ? image : `/uploads${image}`}
//                   alt="Profile"
//                   fill
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

  // const handleImageUpload = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append('image', file);

  //   try {
  //     const response = await axios.post('/api/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     return response.data.imagePath;
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //     throw new Error('Failed to upload image');
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    try {
      const imagePath = file ? await handleImageUpload(file) : null;

      const response = await axios.put('/api/update', {
        name: formData.get('name'),
        email: formData.get('email'),
        imagePath,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Update response:', response.data);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.imagePath; // Ensure this path is correct
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Failed to upload image');
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
                <Image
                  src={image}
                  alt="Profile"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-full bg-customText"
                />
              ) : (
                <div className="w-full h-full bg-customText rounded-full flex items-center justify-center">
                </div>
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
        <p className="font-footerText text-customFooter text-7xl lg:text-8xl md:text-3xl sm:text-2xl">
          settings<span className="text-customOrange text-8xl">.</span>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ProfileSettings;
