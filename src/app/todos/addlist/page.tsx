// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast, { Toaster } from 'react-hot-toast';
// import useTodo from '../../../hooks/useTodos';
// import Header from '@/components/appheader/Header';

// const AddListPage: React.FC = () => {
//   const { createTodo } = useTodo();
//   const [listName, setListName] = useState('');
//   const [themeName, setThemeName] = useState('defaultTheme'); 
//   const router = useRouter();

//   const handleAddList = async () => {
//     if (listName.trim()) {
//       try {
//         await createTodo(listName, themeName);
//         setListName('');
//         toast.success('List added successfully!');
//         setTimeout(() => {
//           router.push('todo');
//         }, 2000);
//       } catch (error) {
//         console.error('Failed to add list:', error);
//         toast.error('Failed to add list');
//       }
//     } else {
//       toast.error('Please enter the list name');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//       <Header />
//       <div className="flex-grow flex items-center justify-center bg-center">
//         <div className="p-6 w-96">
//           <input
//             type="text"
//             value={listName}
//             onChange={(e) => setListName(e.target.value)}
//             placeholder="list name"
//             className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
//           />
//           <div className="flex justify-center items-center h-full">
//             <button
//               onClick={handleAddList}
//               className="px-6 py-2 mt-4 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
//             >
//               Add List.
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-end mb-4">
//         <p className="font-footerText text-customFooter text-6xl lg:text-5xl md:text-3xl sm:text-2xl">
//           add list<span className="text-customOrange text-6xl">.</span>
//         </p>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default AddListPage;


// src/pages/todos/add.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import useTodo from '../../../hooks/useTodos';
import Header from '@/components/appheader/Header';

const AddListPage: React.FC = () => {
  const { createTodo } = useTodo();
  const [listName, setListName] = useState('');
  const [themeName, setThemeName] = useState('defaultTheme');
  const router = useRouter();

  const handleAddList = async () => {
    if (listName.trim()) {
      try {
        await createTodo(listName, themeName);
        setListName('');
        toast.success('List added successfully!');
        setTimeout(() => {
          router.push('todo');
        }, 2000);
      } catch (error) {
        console.error('Failed to add list:', error);
        toast.error('Failed to add list');
      }
    } else {
      toast.error('Please enter the list name');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-center">
        <div className="p-6 w-96">
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="list name"
            className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
          />
          <div className="flex justify-center items-center h-full">
            <button
              onClick={handleAddList}
              className="px-6 py-2 mt-4 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
            >
              Add List.
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <p className="font-footerText text-customFooter text-6xl lg:text-5xl md:text-3xl sm:text-2xl">
          add list<span className="text-customOrange text-6xl">.</span>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default AddListPage;
