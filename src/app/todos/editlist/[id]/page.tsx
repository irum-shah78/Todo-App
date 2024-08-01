'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/appheader/Header';
import useTodo from '../../../../hooks/useTodos';
import toast, { Toaster } from 'react-hot-toast';

interface ParamsType {
  id: string;
}

const EditListPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { todos, getTodos, updateTodo, error } = useTodo();
  const [todoName, setTodoName] = useState<string>('');
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [localError, setLocalError] = useState<string | null>(null);
  const { id } = params as unknown as ParamsType;

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      getTodos(session.user.email);
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, getTodos, router]);

  useEffect(() => {
    if (todos.length > 0 && initialLoad) { 
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        setTodoName(todo.name);
        setInitialLoad(false); 
      }
    }
  }, [todos, id, initialLoad]); 

  const handleUpdateTodo = async () => {
    if (session?.user?.email && todoName.trim()) {
      try {
        await updateTodo(id, todoName, session.user.email);
        toast.success('List updated successfully!');
        router.push('/todos/todo');
      } catch (error) {
        setLocalError('Failed to update todo');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-center">
        <div className="p-6 w-2/4">
          <div className='flex items-center justify-center'>
            {error && <p className="text-red-500">{error}</p>}
            {localError && <p className="text-red-500">{localError}</p>}
            <input
              type="text"
              value={todoName}
              onChange={handleChange}
              placeholder="[list]"
              className="w-80 p-2 bg-customBackground text-customText border-4 border-customOrange rounded-xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
            />
          </div>

          <div className='flex items-center justify-center mt-6 gap-3'>
            <button className='bg-vintage-garden-background text-vintage-garden-primary text-lg border-4 border-vintage-garden-accent rounded-3xl px-4 py-1'>
              Vintage Garden
            </button>
            <button className='bg-cosmic-symphony-background text-cosmic-symphony-primary text-lg border-4 border-cosmic-symphony-accent rounded-3xl px-4 py-1'>
              Cosmic Symphony
            </button>
            <button className='bg-rustic-charm-background text-rustic-charm-primary text-lg border-4 border-customBlue rounded-3xl px-4 py-1'>
              Rustic Charm
            </button>
          </div>

          <div className='flex items-center justify-center mt-6 gap-3'>
            <button className='bg-sunset-serenade-background text-sunset-serenade-primary text-lg border-4 border-sunset-serenade-accent rounded-3xl px-4 py-1'>
              Sunset Serenade
            </button>
            <button className='bg-rustic-charm-primary text-industrial-chic-background text-lg border-4 border-industrial-chic-accent rounded-3xl px-4 py-1'>
              Industrial Chic
            </button>
            <button className='bg-blackout-neutrals-primary text-blackout-neutrals-background text-lg border-4 border-blackout-neutrals-accent rounded-3xl px-4 py-1'>
              Blackout Neutrals
            </button>
          </div>

          <div className='flex items-center justify-center mt-6 gap-3'>
            <button className='bg-vibrant-spectrum-background text-vibrant-spectrum-primary text-lg border-4 border-vibrant-spectrum-accent rounded-3xl px-4 py-1'>
              Vibrant Spectrum
            </button>
            <button className='bg-coastal-sunrise-background text-coastal-sunrise-accent text-lg border-4 border-coastal-sunrise-primary rounded-3xl px-4 py-1'>
              Costal Sunrise
            </button>
            <button className='bg-oceanic-serenity-background text-oceanic-serenity-primary text-lg border-4 border-oceanic-serenity-accent rounded-3xl px-4 py-1'>
              Oceanic Serenity
            </button>
          </div>

          <div className="flex justify-center items-center h-full mt-4">
            <button
              onClick={handleUpdateTodo}
              className="px-6 py-2 mt-4 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
            >
              Edit List.
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <p className="font-footerText text-customFooter text-7xl lg:text-8xl md:text-3xl sm:text-2xl">
          edit list<span className="text-customOrange text-8xl">.</span>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default EditListPage;
