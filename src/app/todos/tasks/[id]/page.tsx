// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation'; // Updated import to include useParams
// import { useSession } from 'next-auth/react';
// import useTasks from '../../../../hooks/useTasks'; // Updated import
// import Header from '@/components/appheader/Header';
// import toast, { Toaster } from 'react-hot-toast';

// const TasksPage: React.FC = () => {
//   const { tasks, error, getTasks, addTask } = useTasks(); // Updated hook usage
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const params = useParams(); // Use useParams to access dynamic route parameters
//   const todoId = params?.id as string; // Access id from params
//   const [taskName, setTaskName] = useState('');

//   useEffect(() => {
//     if (status === 'authenticated' && session?.user?.email) {
//       getTasks(todoId);
//     } else if (status === 'unauthenticated') {
//       router.push('/auth/signin');
//     }
//   }, [status, session, getTasks, router, todoId]);

//   const handleAddTask = async () => {
//     if (taskName.trim() && todoId) {
//       await addTask(taskName, todoId);
//       setTaskName('');
//     }
//   };

//   if (status === 'loading') return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//       <Header />
//       <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
//         <h1 className="text-8xl text-customText font-footerText">
//           Tasks<span className="text-customOrange">.</span>
//         </h1>
//         <div className="mt-8 w-full max-w-md">
//           <div className="mb-4">
//             <input
//               type="text"
//               value={taskName}
//               onChange={(e) => setTaskName(e.target.value)}
//               placeholder="Add a new task"
//               className="px-4 py-2 w-full text-lg border border-gray-300 rounded-md"
//             />
//             <button
//               onClick={handleAddTask}
//               className="px-4 py-2 mt-2 bg-customOrange text-customText font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
//             >
//               Add Task
//             </button>
//           </div>
//           {Array.isArray(tasks) && tasks.length > 0 ? (
//             tasks.map((task) => (
//               <div key={task.id} className="flex justify-between items-center py-2">
//                 <span className="text-2xl text-customText cursor-pointer">
//                   {task.name}
//                 </span>
//               </div>
//             ))
//           ) : (
//             <p className="text-customText text-lg">{error ? error : 'No tasks available'}</p>
//           )}
//         </div>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default TasksPage;


'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { useSession } from 'next-auth/react';
import useTasks from '../../../../hooks/useTasks';
import Header from '@/components/appheader/Header';
import toast, { Toaster } from 'react-hot-toast';

const TasksPage: React.FC = () => {
  const { tasks, error, getTasks, addTask } = useTasks();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const todoId = searchParams.get('id') as string;
  const todoName = searchParams.get('name') as string; // Get todoName from query params
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      getTasks(todoId);
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, getTasks, router, todoId]);

  const handleAddTask = async () => {
    if (taskName.trim() && todoId) {
      await addTask(taskName, todoId);
      setTaskName('');
      toast.success('Task added successfully!');
    }
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
        <h1 className="text-8xl text-customText font-footerText">
          {todoName}
        </h1>
        <div className="mt-8 w-full max-w-md">
          <div className="mb-4">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Add a new task"
              className="px-4 py-2 w-full text-lg border border-gray-300 rounded-md"
            />
            <button
              onClick={handleAddTask}
              className="px-4 py-2 mt-2 bg-customOrange text-customText font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
            >
              Add Task
            </button>
          </div>
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="flex justify-between items-center py-2">
                <span className="text-2xl text-customText cursor-pointer">
                  {task.name}
                </span>
              </div>
            ))
          ) : (
            <p className="text-customText text-lg">{error ? error : 'No tasks available'}</p>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default TasksPage;
