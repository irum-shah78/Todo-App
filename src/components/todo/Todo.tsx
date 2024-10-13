'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import useTodosPage from './useTodo';
import Header from '@/components/header/Header';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/loader/Loader';

const TodosPage: React.FC = () => {
  const router = useRouter();
  const { todos, error, status, handleViewTasks, handleDeleteTodo } = useTodosPage();

  if (status === 'loading') return <Loader />;

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center bg-center p-4 sm:p-6">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl text-customText font-footerText">
          Todo Lists<span className="text-customOrange">.</span>
        </h1>
        <div className="w-full max-w-xs sm:max-w-md">
          {Array.isArray(todos) && todos.length > 0 ? (
            todos?.map((todo) => {
              const themeClassPrefix = (todo?.theme as string).toLowerCase().replace(/\s+/g, '-');
              return (
                <div key={todo?.id} className="flex flex-col sm:flex-row justify-between items-center py-2">
                  <span
                    onClick={() => handleViewTasks(todo?.id, todo?.name, todo?.theme)}
                    className="relative text-xl sm:text-2xl font-bold cursor-pointer text-white"
                  >
                    {todo?.name}
                    <span className={`absolute left-0 bottom-0 w-full h-[0.15em] sm:h-[0.2em] bg-${themeClassPrefix}-primary`} />
                  </span>

                  <div className="flex space-x-2 sm:space-x-4 mt-2 sm:mt-0">
                    <button
                      onClick={() => router.push(`/todos/editlist/${todo?.id}`)}
                      className="px-1 py-1 sm:px-2 sm:py-1 mt-2 sm:mt-4 bg-customOrange text-customText font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-lg sm:text-xl"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo?.id)}
                      className="px-1 py-1 sm:px-2 sm:py-1 mt-2 sm:mt-4 bg-red-600 text-white font-semibold border-4 border-red-600 rounded-3xl focus:outline-none focus:ring-1 focus:ring-red-500 text-lg sm:text-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-customText text-base sm:text-lg">
              {error ? error : 'No todos available at the moment.'}
            </p>
          )}
          <div className="flex justify-between items-center py-2">
            <button onClick={() => router.push('/todos/addlist')} className="text-xl sm:text-2xl text-customText">
              + Add List<span className="text-customText text-3xl sm:text-4xl">.</span>
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default TodosPage;
