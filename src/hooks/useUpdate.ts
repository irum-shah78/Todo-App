// import { useState } from 'react';
// import axios from 'axios';

// export const useUpdateUser = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   const updateUser = async (data: { name: string; email: string; image: File | null }) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('email', data.email);

//     if (data.image) {
//       const reader = new FileReader();
//       reader.readAsDataURL(data.image);
//       reader.onloadend = async () => {
//         const base64Image = reader.result?.toString().split(',')[1]; 
//         formData.append('image', base64Image || '');

//         try {
//           const response = await axios.post('/api/upload', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
//           const imagePath = response.data.imagePath;
//           const updateResponse = await axios.put('/api/update', {
//             name: data.name,
//             email: data.email,
//             imagePath,
//           }, {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });

//           setSuccess(true);
//           return updateResponse.data;
//         } catch (err) {
//           setError('Failed to update user');
//         } finally {
//           setLoading(false);
//         }
//       };
//     }
//   };

//   return { updateUser, loading, error, success };
// };
