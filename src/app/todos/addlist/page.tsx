'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import useTodo from '../../../hooks/useTodos';
import Header from '@/components/header/Header';
import { useSession } from 'next-auth/react';

const AddListPage: React.FC = () => {
  const { addTodo } = useTodo();
  const { data: session } = useSession();
  const [listName, setListName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const router = useRouter();

  const handleAddList = async () => {
    if (listName.trim()) {
      const userEmail = session?.user?.email;
      if (userEmail) {
        try {
          await addTodo(listName, userEmail, selectedTheme);
          setListName('');
          toast.success('List added successfully!');
          setTimeout(() => {
            router.push('/todos/todo');
          }, 2000);
        } catch (error) {
          console.error('Failed to add list:', error);
          toast.error('Failed to add list');
        }
      } else {
        toast.error('User not found');
      }
    } else {
      toast.error('Please enter the list name');
    }
  };


  const themes = [
    { name: 'Vintage Garden', background: 'bg-vintage-garden-background', primary: 'text-vintage-garden-primary', border: 'border-vintage-garden-accent' },
    { name: 'Cosmic Symphony', background: 'bg-cosmic-symphony-background', primary: 'text-cosmic-symphony-primary', border: 'border-cosmic-symphony-accent' },
    { name: 'Rustic Charm', background: 'bg-rustic-charm-background', primary: 'text-rustic-charm-primary', border: 'border-customBlue' },
    { name: 'Sunset Serenade', background: 'bg-sunset-serenade-background', primary: 'text-sunset-serenade-primary', border: 'border-sunset-serenade-accent' },
    { name: 'Industrial Chic', background: 'bg-rustic-charm-primary', primary: 'text-industrial-chic-background', border: 'border-industrial-chic-accent' },
    { name: 'Blackout Neutrals', background: 'bg-blackout-neutrals-primary', primary: 'text-blackout-neutrals-background', border: 'border-blackout-neutrals-accent' },
    { name: 'Vibrant Spectrum', background: 'bg-vibrant-spectrum-background', primary: 'text-vibrant-spectrum-primary', border: 'border-vibrant-spectrum-accent' },
    { name: 'Coastal Sunrise', background: 'bg-coastal-sunrise-background', primary: 'text-coastal-sunrise-accent', border: 'border-coastal-sunrise-primary' },
    { name: 'Oceanic Serenity', background: 'bg-oceanic-serenity-background', primary: 'text-oceanic-serenity-primary', border: 'border-oceanic-serenity-accent' },
  ];



  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-center">
        <div className="p-6 w-2/4">
          <div className='flex items-center justify-center'>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="List name"
              className="w-80 p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
            />
          </div>

          {/* <div className='flex items-center justify-center mt-6 gap-3'>
            <button className={`bg-vintage-garden-background text-vintage-garden-primary text-lg border-4 border-vintage-garden-accent rounded-3xl px-4 py-1 ${selectedTheme === 'Vintage Garden' && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme(' Vintage Garden')}>
              Vintage Garden
            </button>
            <button className={`bg-cosmic-symphony-background text-cosmic-symphony-primary text-lg border-4 border-cosmic-symphony-accent rounded-3xl px-4 py-1 ${selectedTheme === 'Cosmic Symphony' && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme('Cosmic Symphony')}>
              Cosmic Symphony
            </button>
            <button className={`bg-rustic-charm-background text-rustic-charm-primary text-lg border-4 border-customBlue rounded-3xl px-4 py-1 ${selectedTheme === ' Rustic Charm' && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme(' Rustic Charm')}>
              Rustic Charm
            </button>
          </div>
          <div className='flex items-center justify-center mt-6 gap-3'>
            <button className={`bg-sunset-serenade-background text-sunset-serenade-primary text-lg border-4 border-sunset-serenade-accent rounded-3xl px-4 py-1 ${selectedTheme === 'Sunset Serenade' && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme('Sunset Serenade')}>
              Sunset Serenade
            </button>
            <button className={`bg-rustic-charm-primary text-industrial-chic-background text-lg border-4 border-industrial-chic-accent rounded-3xl px-4 py-1 ${selectedTheme === 'Industrial Chic' && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme('Industrial Chic')}>
              Industrial Chic
            </button>
            <button className={`bg-blackout-neutrals-primary text-blackout-neutrals-background text-lg border-4 border-blackout-neutrals-accent rounded-3xl px-4 py-1 ${selectedTheme === 'Blackout Neutrals' && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme('Blackout Neutrals')}>
              Blackout Neutrals
            </button>
          </div>
          <div className='flex items-center justify-center mt-6 gap-3'>
            <button className={`bg-vibrant-spectrum-background text-vibrant-spectrum-primary text-lg border-4 border-vibrant-spectrum-accent rounded-3xl px-4 py-1  ${selectedTheme === 'Vibrant Spectrum' && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme('Vibrant Spectrum')}>
              Vibrant Spectrum
            </button>
            <button className={`bg-coastal-sunrise-background text-coastal-sunrise-accent text-lg border-4 border-coastal-sunrise-primary rounded-3xl px-4 py-1 ${selectedTheme === 'Coastal Sunrise' && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme('Coastal Sunrise')}>
            Coastal Sunrise
            </button>
            <button className={`bg-oceanic-serenity-background text-oceanic-serenity-primary text-lg border-4 border-oceanic-serenity-accent rounded-3xl px-4 py-1 ${selectedTheme === 'Oceanic Serenity' && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme('Oceanic Serenity')}>
              Oceanic Serenity
            </button>
          </div> */}

          <div className='flex items-center justify-center mt-6 gap-3'>
            {themes.slice(0, 3).map((theme) => (
              <button
                key={theme.name}
                className={`${theme.background} ${theme.primary} text-lg border-4 ${theme.border} rounded-3xl px-4 py-1 ${selectedTheme === theme.name && 'ring-4 ring-customOrange'}`}
                onClick={() => setSelectedTheme(theme.name)}
              >
                {theme.name}
              </button>
            ))}
          </div>
          <div className='flex items-center justify-center mt-6 gap-3'>
            {themes.slice(3, 6).map((theme) => (
              <button
                key={theme.name}
                className={`${theme.background} ${theme.primary} text-lg border-4 ${theme.border} rounded-3xl px-4 py-1 ${selectedTheme === theme.name && 'ring-4 ring-customOrange'}`}
                onClick={() => setSelectedTheme(theme.name)}
              >
                {theme.name}
              </button>
            ))}
          </div>
          <div className='flex items-center justify-center mt-6 gap-3'>
            {themes.slice(6, 9).map((theme) => (
              <button
                key={theme.name}
                className={`${theme.background} ${theme.primary} text-lg border-4 ${theme.border} rounded-3xl px-4 py-1 ${selectedTheme === theme.name && 'ring-4 ring-customOrange'}`}
                onClick={() => setSelectedTheme(theme.name)}
              >
                {theme.name}
              </button>
            ))}
          </div>


          <div className="flex justify-center items-center h-full mt-4">
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
        <p className="font-footerText text-customFooter text-7xl lg:text-8xl md:text-3xl sm:text-2xl">
          add list<span className="text-customOrange text-8xl">.</span>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
export default AddListPage;