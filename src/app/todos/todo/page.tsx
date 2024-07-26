// // src/pages/todos/index.tsx
// 'use client';

// import React from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/appheader/Header';

// const todos = [
//   { name: 'Home', themeName: 'theme1' },
//   { name: 'Work', themeName: 'theme2' },
//   { name: 'Home', themeName: 'theme3' },
//   { name: 'Work', themeName: 'theme4' },
//   { name: 'Home', themeName: 'theme5' },
//   { name: 'Work', themeName: 'theme6' },
// ];

// const TodosPage: React.FC = () => {
//   const router = useRouter();

//   const handleAddListClick = () => {
//     router.push('addlist');
//   };

//   return (
//     <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//       <Header />
//       <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
//         <h1 className="text-8xl text-customText font-footerText">Todo Lists<span className="text-customOrange">.</span></h1>
//         <div className="mt-8 w-full max-w-md">
//           {todos.map((todo, index) => (
//             <div key={index} className="flex justify-between items-center py-2">
//               <span className={`text-4xl text-customText`}>{todo.name}</span>
//               <span className={`h-1 bg-${todo.themeName} w-full ml-4`} />
//             </div>
//           ))}
//           <div className="flex justify-between items-center py-2">
//             <button
//               onClick={handleAddListClick}
//               className="text-4xl text-customText"
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


// src/pages/todos/index.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/appheader/Header';
import useTodo from '../../../hooks/useTodos';

// Define the Todo type
interface Todo {
  name: string;
  themeName: string;
}

const TodosPage: React.FC = () => {
  const { todos } = useTodo();
  const router = useRouter();

  const handleAddListClick = () => {
    router.push('addlist');
  };

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
        <h1 className="text-8xl text-customText font-footerText">Todo Lists<span className="text-customOrange">.</span></h1>
        <div className="mt-8 w-full max-w-md">
          {todos.map((todo: Todo, index: number) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className={`text-2xl text-customText`}>{todo.name}</span>
              <span className={`h-1 bg-${todo.themeName} w-full ml-4`} />
            </div>
          ))}
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
