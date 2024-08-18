'use client';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/header/Header';
import { themes } from '@/constants/themeButtons';
import useAddList from './useAddList';

const AddListPage: React.FC = () => {
  const { listName, selectedTheme, setListName, setSelectedTheme, handleAddList } = useAddList();

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-center">
        <div className="p-6 w-2/4">
          <div className='flex items-center justify-center'>
            <input type="text" value={listName} onChange={(e) => setListName(e.target.value)} placeholder="List name"
              className="w-80 p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" />
          </div>
          <div className='flex items-center justify-center mt-6 gap-3'>
            {themes.slice(0, 3).map((theme) => (
              <button key={theme.name} className={`${theme.background} ${theme.primary} text-lg border-4 ${theme.border} rounded-3xl px-4 py-1 ${selectedTheme === theme.name && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme(theme.name)}>
                {theme.name}
              </button>
            ))}
          </div>
          <div className='flex items-center justify-center mt-6 gap-3'>
            {themes.slice(3, 6).map((theme) => (
              <button key={theme.name} className={`${theme.background} ${theme.primary} text-lg border-4 ${theme.border} rounded-3xl px-4 py-1 ${selectedTheme === theme.name && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme(theme.name)}>
                {theme.name}
              </button>
            ))}
          </div>
          <div className='flex items-center justify-center mt-6 gap-3'>
            {themes.slice(6, 9).map((theme) => (
              <button key={theme.name} className={`${theme.background} ${theme.primary} text-lg border-4 ${theme.border} rounded-3xl px-4 py-1 ${selectedTheme === theme.name && 'ring-4 ring-customOrange'}`} onClick={() => setSelectedTheme(theme.name)}>
                {theme.name}
              </button>
            ))}
          </div>
          <div className="flex justify-center items-center h-full mt-4">
            <button onClick={handleAddList} className="px-6 py-2 mt-4 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl">
              Add List
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