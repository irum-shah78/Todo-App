// // src/app/todos/todo/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/header/Header';
// import useTodo from '../../../hooks/useTodos';
// import { useSession } from 'next-auth/react';

// interface Todo {
//   id: string;
//   name: string;
// }

// const TodosPage: React.FC = () => {
//   const { todos } = useTodo();
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/auth/signin');
//     }
//   }, [status, router]);

//   const handleAddListClick = () => {
//     router.push('/todos/addlist'); // Ensure correct path
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
//           {Array.isArray(todos) && todos.length > 0 ? (
//             todos.map((todo: Todo) => (
//               <div key={todo.id} className="flex justify-between items-center py-2">
//                 <span className="text-2xl text-customText">{todo.name}</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-customText text-lg">Loading or no todos available</p>
//           )}
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

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/Header';
import useTodo from '../../../hooks/useTodos';
import { useSession } from 'next-auth/react';

interface Todo {
  id: string;
  name: string;
}

const TodosPage: React.FC = () => {
  const { todos, error } = useTodo(); 
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleAddListClick = () => {
    router.push('/todos/addlist');
  };

  useEffect(() => {
    console.log('Todos in TodosPage:', todos);
    if (error) {
      console.error('Error fetching todos:', error);
    }
  }, [todos, error]);

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
            todos.map((todo: Todo) => (
              <div key={todo.id} className="flex justify-between items-center py-2">
                <span className="text-2xl text-customText">{todo.name}</span>
              </div>
            ))
          ) : (
            <p className="text-customText text-lg">Loading or no todos available</p>
          )}
          <div className="flex justify-between items-center py-2">
            <button
              onClick={handleAddListClick}
              className="text-2xl text-customText bg-customOrange p-2 rounded">
              Add Todo List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosPage;





















// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/header/Header';
// import useTodo from '../../../hooks/useTodos';
// import { useSession } from 'next-auth/react';

// interface Todo {
//   id: string;
//   name: string;
// }

// const TodosPage: React.FC = () => {
//   const { todos } = useTodo();
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/auth/signin');
//     }
//   }, [status, router]);

//   const handleAddListClick = () => {
//     router.push('addlist');
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
//           {Array.isArray(todos) && todos.length > 0 ? (
//             todos.map((todo: Todo) => (
//               <div key={todo.id} className="flex justify-between items-center py-2">
//                 <span className="text-2xl text-customText">{todo.name}</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-customText text-lg">Loading or no todos available</p>
//           )}
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