// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/header/Header';
// import useTodo from '../../../hooks/useTodos';
// import { useSession } from 'next-auth/react';

// const TodosPage: React.FC = () => {
//   const { todos, error } = useTodo();
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/auth/signin');
//     }
//   }, [status, router]);

//   const handleAddListClick = () => {
//     router.push('/todos/addlist');
//   };

//   useEffect(() => {
//     console.log('Todos in TodosPage:', todos);
//   }, [todos]);

//   if (status === 'loading') return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//       <Header />
//       <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
//         <h1 className="text-8xl text-customText font-footerText">
//           Todo Lists<span className="text-customOrange">.</span>
//         </h1>
//         <div className="mt-8 w-full max-w-md">
//           {
//             Array.isArray(todos) && todos.length > 0 ? (
//               todos.map((todo) => (
//                 <div key={todo.id} className="flex justify-between items-center py-2">
//                   <span className="text-2xl text-customText">{todo.name}</span>
//                 </div>
//               ))
//             ) : (
//               <p className="text-customText text-lg">{error ? error : 'No todos available'}</p>
//             )
//           }

//           <div className="flex justify-between items-center py-2">
//             <button
//               onClick={handleAddListClick}
//               className="text-2xl text-customText"
//             >
//               + Add List<span className="text-customText text-4xl">.</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TodosPage;



'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/Header';
import useTodo from '../../../hooks/useTodos';
import { useSession } from 'next-auth/react';

const TodosPage: React.FC = () => {
  const { todos, error, getTodos, addTodo } = useTodo();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      getTodos(session.user.email);
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, getTodos, router]);

  const handleAddListClick = async () => {
    if (session?.user?.email) {
      try {
        await addTodo('New List', session.user.id);
      } catch (err) {
        console.error('Failed to add list:', err);
      }
    }
    router.push('/todos/addlist');
  };

  useEffect(() => {
    console.log('Todos in TodosPage:', todos);
  }, [todos]);

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
                <span className="text-2xl text-customText">{todo.name}</span>
              </div>
            ))
          ) : (
            <p className="text-customText text-lg">{error ? error : 'No todos available'}</p>
          )}

          <div className="flex justify-between items-center py-2">
            <button
              onClick={handleAddListClick}
              className="text-2xl text-customText"
            >
              + Add List<span className="text-customText text-4xl">.</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
