'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import useTodosPage from './useTodo';
import Header from '@/components/header/Header';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/loader/Loader';

const TodosPage: React.FC = () => {
  const router = useRouter();
  const {todos,error,status,selectedColor,setSelectedColor,handleViewTasks,handleDeleteTodo,getUnderlineColor,} = useTodosPage();

  if (status === 'loading') return <div><Loader /></div>;

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
        <h1 className="text-8xl text-customText font-footerText">
          Todo Lists<span className="text-customOrange">.</span>
        </h1>
        <div className="w-full max-w-md">
          {Array.isArray(todos) && todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo.id} className="flex justify-between items-center py-2">
                <span onClick={() => handleViewTasks(todo.id, todo.name, todo.theme)} className="relative text-white text-2xl font-bold cursor-pointer" style={{ '--underline-color': getUnderlineColor(todo.theme) } as React.CSSProperties} >
                  {todo.name}
                  <span className="absolute left-0 bottom-0 w-full h-[0.2em]" style={{ backgroundColor: 'var(--underline-color)' }} >
                  </span>
                </span>

                <div className="flex space-x-4">
                  <button onClick={() => router.push(`/todos/editlist/${todo.id}`)} className="px-2 py-1 mt-4 bg-customOrange text-customText font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl">
                    Update
                  </button>
                  <button onClick={() => handleDeleteTodo(todo.id)} className="px-2 py-1 mt-4 bg-red-600 text-white font-semibold border-4 border-red-600 rounded-3xl focus:outline-none focus:ring-1 focus:ring-red-500 text-xl">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-customText text-lg">{error ? error : 'No todos available'}</p>
          )}

          <div className="flex justify-between items-center py-2">
            <button onClick={() => router.push('/todos/addlist')} className="text-2xl text-customText">
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