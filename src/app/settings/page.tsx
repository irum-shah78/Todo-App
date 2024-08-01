// 'use client';
// import { useState } from 'react';
// import { useUpdateUser } from '../../hooks/useUpdate';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Header from '@/components/settingsheader/SettingsHeader';
// import edit from "../../../public/assets/icons/Edit.svg"

// const ProfileSettings = () => {
//   const { data: session } = useSession();
//   const { updateUser, loading, error, success } = useUpdateUser();
//   const [name, setName] = useState(session?.user?.name || '');
//   const [email, setEmail] = useState(session?.user?.email || '');
//   const [image, setImage] = useState(session?.user?.image || '');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await updateUser({ name, email, image });
//   };

//   return (
//     <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//       <Header />
//       <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
//         <h1 className="text-4xl font-bold text-white mb-8 text-center">Settings</h1>
//         <div className="flex justify-center mb-6">
//           <div className="relative">
//             <Image
//               src={image || '/default-profile.png'}
//               alt="Profile"
//               width={96}
//               height={96}
//               className="rounded-full border-4 border-gray-700"
//             />
//             <button className="absolute bottom-0 right-0 bg-orange-600 text-white rounded-full p-1">
//             <Image
//               src={edit}
//               alt="Profile"
//               className="rounded-full border-4 border-gray-700"
//             />
//             </button>
//           </div>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-400">
//               Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="block w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-400">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="block w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//           {error && <p className="text-red-500">{error}</p>}
//           {success && <p className="text-green-500">Profile updated successfully!</p>}
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             disabled={loading}
//           >
//             {loading ? 'Updating...' : 'Save Changes'}
//           </button>
//         </form>
//         <button className="w-full mt-4 py-2 px-4 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
//           Change Password
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileSettings;


'use client';
import { useState } from 'react';
import { useUpdateUser } from '../../hooks/useUpdate';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Header from '@/components/settingsheader/SettingsHeader';
import { Toaster } from 'react-hot-toast';

const ProfileSettings = () => {
  const { data: session } = useSession();
  const { updateUser, loading, error, success } = useUpdateUser();
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [image, setImage] = useState(session?.user?.image || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ name, email, image });
  };

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-center">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Settings</h1>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src={image || '/default-profile.png'}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full border-4 border-gray-700"
              />
              <button className="absolute bottom-0 right-0 bg-orange-600 text-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 11l-4.5 4.5a2.121 2.121 0 102.121 2.121L11 15m4-4l4.5-4.5a2.121 2.121 0 10-2.121-2.121L13 9m-1 4v6a2 2 0 002 2h6m-8-8H7m10 0h2.5m0 0v2.5M15 13v-2m-4 4h6m-6-4H7m4 4h.01"
                  />
                </svg>
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Profile updated successfully!</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
          </form>
          <button className="w-full mt-4 py-2 px-4 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
            Change Password
          </button>
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
