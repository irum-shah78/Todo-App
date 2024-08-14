// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import useTodo from '../../../hooks/useTodos';
// import { useSession } from 'next-auth/react';
// import Header from '@/components/appheader/Header';
// import toast, { Toaster } from 'react-hot-toast';

// const TodosPage: React.FC = () => {
//   const { todos, error, getTodos, addTodo, deleteTodo } = useTodo();
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === 'authenticated' && session?.user?.email) {
//       getTodos(session.user.email);
//     } else if (status === 'unauthenticated') {
//       router.push('/auth/signin');
//     }
//   }, [status, session, getTodos, router]);

//   const handleAddTodo = async (name: string) => {
//     if (session?.user?.email) {
//       await addTodo(name, session.user.email);
//     }
//   };

//   const handleViewTasks = (id: string, name: string) => {
//     router.push(`/todos/tasks/${id}?name=${encodeURIComponent(name)}`);
//   };

//   const handleDeleteTodo = async (id: string) => {
//     try {
//       await deleteTodo(id);
//       toast.success('List deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//     }
//   };

//   if (status === 'loading') return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//       <Header />
//       <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
//         <h1 className="text-8xl text-customText font-footerText">
//           Todo Lists<span className="text-customOrange">.</span>
//         </h1>
//         <div className="mt-8 w-full max-w-md">
//           {Array.isArray(todos) && todos.length > 0 ? (
//             todos.map((todo) => (
//               <div key={todo.id} className="flex justify-between items-center py-2">
//                 <span
//                   onClick={() => handleViewTasks(todo.id, todo.name)}
//                   className="text-2xl text-customText cursor-pointer"
//                 >
//                   {todo.name}
//                 </span>
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => router.push(`/todos/editlist/${todo.id}`)}
//                     className="px-2 py-1 mt-4 bg-customOrange text-customText font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDeleteTodo(todo.id)}
//                     className="px-2 py-1 mt-4 bg-red-600 text-white font-semibold border-4 border-red-600 rounded-3xl focus:outline-none focus:ring-1 focus:ring-red-500 text-xl"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-customText text-lg">{error ? error : 'No todos available'}</p>
//           )}

//           <div className="flex justify-between items-center py-2">
//             <button
//               onClick={() => router.push('/todos/addlist')}
//               className="text-2xl text-customText"
//             >
//               + Add List<span className="text-customText text-4xl">.</span>
//             </button>
//           </div>
//         </div>
//       </div>
//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// };

// export default TodosPage;





// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import useTodo from '../../../hooks/useTodos';
// import { useSession } from 'next-auth/react';
// import Header from '@/components/appheader/Header';
// import toast, { Toaster } from 'react-hot-toast';


// const TodosPage: React.FC = () => {
//   const { todos, error, getTodos, addTodo, deleteTodo } = useTodo();
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === 'authenticated' && session?.user?.email) {
//       getTodos(session.user.email);
//     } else if (status === 'unauthenticated') {
//       router.push('/auth/signin');
//     }
//   }, [status, session, getTodos, router]);

//   const handleAddTodo = async (name: string) => {
//     const specificLine = "Your specific line of text here.";  
//     const taskWithSpecificLine = `${name} - ${specificLine}`;

//     if (session?.user?.email) {
//       await addTodo(taskWithSpecificLine, session.user.email);
//     }
//   };

//   const handleViewTasks = (id: string, name: string) => {
//     router.push(`/todos/tasks/${id}?name=${encodeURIComponent(name)}`);
//   };

//   const handleDeleteTodo = async (id: string) => {
//     try {
//       await deleteTodo(id);
//       toast.success('List deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//     }
//   };

//   if (status === 'loading') return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//       <Header />
//       <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
//         <h1 className="text-8xl text-customText font-footerText">
//           Todo Lists<span className="text-customOrange">.</span>
//         </h1>
//         <div className="mt-8 w-full max-w-md">
//           {Array.isArray(todos) && todos.length > 0 ? (
//             todos.map((todo) => (
//               <div key={todo.id} className="flex justify-between items-center py-2">
//                 <span onClick={() => handleViewTasks(todo.id, todo.name)}
//                   className="relative text-white text-2xl font-bold cursor-pointer">{todo.name}
//                   <span className="absolute left-0 bottom-0 w-full h-[0.2em] bg-vintage-garden-background" style={{ transform: 'translateY(-0.3em)' }}>
//                   </span>
//                 </span>

//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => router.push(`/todos/editlist/${todo.id}`)}
//                     className="px-2 py-1 mt-4 bg-customOrange text-customText font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDeleteTodo(todo.id)}
//                     className="px-2 py-1 mt-4 bg-red-600 text-white font-semibold border-4 border-red-600 rounded-3xl focus:outline-none focus:ring-1 focus:ring-red-500 text-xl"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-customText text-lg">{error ? error : 'No todos available'}</p>
//           )}

//           <div className="flex justify-between items-center py-2">
//             <button
//               onClick={() => router.push('/todos/addlist')}
//               className="text-2xl text-customText"
//             >
//               + Add List<span className="text-customText text-4xl">.</span>
//             </button>
//           </div>
//         </div>
//       </div>
//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// };

// export default TodosPage;




'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useTodo from '../../../hooks/useTodos';
import { useSession } from 'next-auth/react';
import Header from '@/components/appheader/Header';
import toast, { Toaster } from 'react-hot-toast';
import themeColors from '@/constants/ThemeColors';
import { ThemeName } from '@/types/type';


const TodosPage: React.FC = () => {
  const { todos, error, getTodos, addTodo, deleteTodo } = useTodo();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      getTodos(session.user.email);
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, getTodos, router]);

  // const handleAddTodo = async (name: string) => {
  //   const specificLine = "Your specific line of text here.";
  //   const taskWithSpecificLine = `${name} - ${specificLine}`;

  //   if (session?.user?.email) {
  //     await addTodo(taskWithSpecificLine, session.user.email);
  //   }
  // };

  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleAddTodo = async (name: string) => {
    const specificLine = "Your specific line of text here.";
    const taskWithSpecificLine = `${name} - ${specificLine}`;

    if (session?.user?.email && selectedColor) {
      await addTodo(taskWithSpecificLine, session.user.email, selectedColor);
    }
  };


  // const handleViewTasks = (id: string, name: string) => {
  //   router.push(`/todos/tasks/${id}?name=${encodeURIComponent(name)}`);
  // };

  const handleViewTasks = (id: string, name: string, theme: string) => {
    router.push(`/todos/tasks/${id}?name=${encodeURIComponent(name)}&theme=${encodeURIComponent(theme)}`);
  };


  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      toast.success('List deleted successfully!');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // const getUnderlineColor = (theme: string) => {
  //   return themeColors[theme]?.primary || '#FFFFFF'; // Fallback to white if the theme is not found
  // };

  const getUnderlineColor = (theme: string) => {
    const validTheme = theme as ThemeName; // Cast theme as ThemeName
    return themeColors[validTheme]?.primary || '#FFFFFF';
  };


  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
        <h1 className="text-8xl text-customText font-footerText">
          Todo Lists<span className="text-customOrange">.</span>
        </h1>
        <div className="mt-8 w-full max-w-md">
          {Array.isArray(todos) && todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo.id} className="flex justify-between items-center py-2">
                {/* <span onClick={() => handleViewTasks(todo.id, todo.name)}
                  className="relative text-white text-2xl font-bold cursor-pointer">{todo.name}
                  <span className="absolute left-0 bottom-0 w-full h-[0.2em] bg-vintage-garden-background" style={{ transform: 'translateY(-0.3em)' }}>
                  </span>
                </span> */}

                {/* <span
                  onClick={() => handleViewTasks(todo.id, todo.name, todo.theme)}
                  className="relative text-white text-2xl font-bold cursor-pointer"
                  style={{ backgroundColor: getUnderlineColor(todo.theme) }}
                >
                  {todo.name}
                  <span
                    className="absolute left-0 bottom-0 w-full h-[0.2em]"
                    style={{ backgroundColor: `var(--underline-color)` }}
                  ></span>
                </span> */}

                <span
                  onClick={() => handleViewTasks(todo.id, todo.name, todo.theme)}
                  className="relative text-white text-2xl font-bold cursor-pointer"
                  style={{ '--underline-color': getUnderlineColor(todo.theme) } as React.CSSProperties} // Set CSS variable dynamically
                >
                  {todo.name}
                  <span
                    className="absolute left-0 bottom-0 w-full h-[0.2em]"
                    style={{ backgroundColor: 'var(--underline-color)' }} // Use CSS variable for underline
                  ></span>
                </span>

                <div className="flex space-x-4">
                  <button
                    onClick={() => router.push(`/todos/editlist/${todo.id}`)}
                    className="px-2 py-1 mt-4 bg-customOrange text-customText font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="px-2 py-1 mt-4 bg-red-600 text-white font-semibold border-4 border-red-600 rounded-3xl focus:outline-none focus:ring-1 focus:ring-red-500 text-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-customText text-lg">{error ? error : 'No todos available'}</p>
          )}

          <div className="flex justify-between items-center py-2">
            <button
              onClick={() => router.push('/todos/addlist')}
              className="text-2xl text-customText"
            >
              + Add List<span className="text-customText text-4xl">.</span>
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default TodosPage;
