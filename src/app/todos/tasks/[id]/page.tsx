// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter, useParams, useSearchParams } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import useTasks from '../../../../hooks/useTasks';
// import Header from '@/components/appheader/Header';
// import toast, { Toaster } from 'react-hot-toast';

// type Task = {
//   id: string;
//   name: string;
//   completed: boolean;
//   // Add other properties if needed
// };

// const TasksPage: React.FC = () => {
//   const router = useRouter();
//   const params = useParams() as { id: string };
//   const { id: todoId } = params;
//   const searchParams = useSearchParams();
//   const todoName = searchParams?.get('name') || '';
//   const { data: session, status } = useSession();
//   const [taskName, setTaskName] = useState('');

//   const { tasks, error, getTasks, addTask, updateTask, deleteTask } = useTasks();

//   useEffect(() => {
//     if (status === 'authenticated' && session?.user?.email) {
//       getTasks(todoId);
//     } else if (status === 'unauthenticated') {
//       router.push('/auth/signin');
//     }
//   }, [status, session, getTasks, router, todoId]);

//   const handleToggleComplete = async (taskId: string, completed: boolean) => {
//     const taskToUpdate = tasks.find((task: Task) => task.id === taskId);

//     if (taskToUpdate) {
//       try {
//         const newCompletedStatus = !taskToUpdate.completed;
//         await updateTask(taskId, taskToUpdate.name, newCompletedStatus);
//         toast.success(newCompletedStatus ? 'Task marked as complete' : 'Task marked as incomplete');
//       } catch (error) {
//         console.error('Failed to update task:', error);
//         toast.error('Failed to update task');
//       }
//     } else {
//       console.error('Task not found:', taskId);
//       toast.error('Task not found');
//     }
//   };


//   const handleAddTask = async () => {
//     if (taskName.trim() && todoId) {
//       try {
//         await addTask(taskName, todoId);
//         setTaskName('');
//         toast.success('Task added successfully!');
//       } catch (error) {
//         console.error('Failed to add task:', error);
//         toast.error('Failed to add task');
//       }
//     } else {
//       toast.error('Please enter a task name');
//     }
//   };

//   const handleDeleteTask = async (taskId: string) => {
//     try {
//       await deleteTask(taskId);
//       toast.success('Task deleted successfully!');
//     } catch (error) {
//       console.error('Failed to delete task:', error);
//       toast.error('Failed to delete task');
//     }
//   };

//   if (status === 'loading') return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//       <Header />
//       <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
//         <h1 className="text-8xl text-customText font-footerText">
//           {todoName}<span className="text-customOrange">.</span>
//         </h1>
//         <div className="mt-8 w-full max-w-md">
//           <div className="mb-4 flex items-center gap-3">
//             <input
//               type="text"
//               value={taskName}
//               onChange={(e) => setTaskName(e.target.value)}
//               placeholder="[task]"
//               className="w-2/3 p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-4"
//             />
//             <button
//               onClick={handleAddTask}
//               className="px-2 py-1 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
//             >
//               Add Task
//             </button>
//           </div>
//           {Array.isArray(tasks) && tasks.length > 0 ? (
//             tasks.map((task: Task) => (
//               <div key={task.id} className="flex justify-between items-center py-2">
//                 <div className="flex items-center gap-2">
//                   {/* <input
//                     type="checkbox"
//                     checked={task.completed}
//                     onChange={() => handleToggleComplete(task.id, task.completed)}
//                     className="form-checkbox h-5 w-5 border-customOrange bg-customBackground checked:bg-customOrange text-customText focus:ring-0"
//                   /> */}
//                   <input
//                     type="checkbox"
//                     checked={task.completed}
//                     onChange={() => handleToggleComplete(task.id, task.completed)}
//                     className="appearance-none h-5 w-5 border-2 border-customOrange bg-customBackground checked:bg-customOrange checked:border-customOrange focus:outline-none"
//                   />


//                   <span
//                     className={`text-2xl ${task.completed ? 'line-through' : ''} text-customText cursor-pointer`}
//                     onClick={() => handleToggleComplete(task.id, task.completed)}
//                   >
//                     {task.name}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => handleDeleteTask(task.id)}
//                   className="px-2 py-1 bg-red-600 text-white rounded-3xl"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-customText text-lg">{error ? error : 'No tasks available'}</p>
//           )}
//         </div>
//       </div>
//       <div className="flex justify-end mb-4">
//         <p className="font-footerText text-customFooter text-7xl lg:text-8xl md:text-3xl sm:text-2xl">
//           tasks<span className="text-customOrange text-8xl">.</span>
//         </p>
//       </div>
//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// };

// export default TasksPage;


'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useTasks from '../../../../hooks/useTasks';
import Header from '@/components/appheader/Header';
import toast, { Toaster } from 'react-hot-toast';

type Task = {
  id: string;
  name: string;
  completed: boolean;
};

const TasksPage: React.FC = () => {
  const router = useRouter();
  const params = useParams() as { id: string };
  const { id: todoId } = params;
  const searchParams = useSearchParams();
  const todoName = searchParams?.get('name') || '';
  const { data: session, status } = useSession();
  const [taskName, setTaskName] = useState('');

  const { tasks, error, getTasks, addTask, updateTask, deleteTask } = useTasks();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      getTasks(todoId);
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, getTasks, router, todoId]);

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    const taskToUpdate = tasks.find((task: Task) => task.id === taskId);

    if (taskToUpdate) {
      try {
        const newCompletedStatus = !taskToUpdate.completed;
        await updateTask(taskId, taskToUpdate.name, newCompletedStatus);
        toast.success(newCompletedStatus ? 'Task marked as complete' : 'Task marked as incomplete');
        getTasks(todoId); // Fetch tasks again to update the state
      } catch (error) {
        console.error('Failed to update task:', error);
        toast.error('Failed to update task');
      }
    } else {
      console.error('Task not found:', taskId);
      toast.error('Task not found');
    }
  };

  const handleAddTask = async () => {
    if (taskName.trim() && todoId) {
      try {
        await addTask(taskName, todoId);
        setTaskName('');
        toast.success('Task added successfully!');
        getTasks(todoId); // Fetch tasks again to update the state
      } catch (error) {
        console.error('Failed to add task:', error);
        toast.error('Failed to add task');
      }
    } else {
      toast.error('Please enter a task name');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast.success('Task deleted successfully!');
      getTasks(todoId); // Fetch tasks again to update the state
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    }
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
        <h1 className="text-8xl text-customText font-footerText">
          {todoName}<span className="text-customOrange">.</span>
        </h1>
        <div className="mt-8 w-full max-w-md">
          <div className="mb-4 flex items-center gap-3">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="[task]"
              className="w-2/3 p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-4"
            />
            <button
              onClick={handleAddTask}
              className="px-2 py-1 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
            >
              Add Task
            </button>
          </div>
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task: Task) => (
              <div key={task.id} className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id, task.completed)}
                    // className="appearance-none h-5 w-5 border-2 border-customOrange bg-customBackground checked:bg-customOrange checked:border-customOrange focus:outline-none"
                  />
                  <span
                    className={`text-2xl text-customText cursor-pointer`}
                    onClick={() => handleToggleComplete(task.id, task.completed)}
                  >
                    {task.name}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded-3xl"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-customText text-lg">{error ? error : 'No tasks available'}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <p className="font-footerText text-customFooter text-7xl lg:text-8xl md:text-3xl sm:text-2xl">
          tasks<span className="text-customOrange text-8xl">.</span>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default TasksPage;
