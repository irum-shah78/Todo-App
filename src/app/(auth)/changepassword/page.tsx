// import React, { useState } from 'react';
// import axios from 'axios';

// const ChangePassword: React.FC = () => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await axios.put('/api/auth/changepassword', { oldPassword, newPassword });
//   };

//   return (
//     <div>
//       <h1>Change Password</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//           placeholder="Old Password"
//         />
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           placeholder="New Password"
//         />
//         <button type="submit">Change Password</button>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;



// "use client";
// import React, { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const ChangePassword: React.FC = () => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.put('app/(auth)/changepassword', { oldPassword, newPassword });
//       toast.success("Password changed successfully!");
//     } catch (error) {
//       toast.error("Failed to change password.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Change Password</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
//             Old Password
//           </label>
//           <input
//             id="oldPassword"
//             type="password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             placeholder="Old Password"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
//             New Password
//           </label>
//           <input
//             id="newPassword"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             placeholder="New Password"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             disabled={loading}
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             disabled={loading}
//           >
//             {loading ? "Changing..." : "Change Password"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;


// src/app/(auth)/changepassword/page.tsx
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put('/api/auth/changepassword', { oldPassword, newPassword });
      toast.success("Password changed successfully!");
    } catch (error) {
      toast.error("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={loading}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
