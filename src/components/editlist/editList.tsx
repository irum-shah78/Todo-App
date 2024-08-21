'use client';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/header/Header';
import Loader from '@/components/loader/Loader';
import { themes } from '@/constants/themeButtons';
import useEditList from './useEditList';

const EditListPage: React.FC = () => {
  const { todoName, selectedTheme, error, localError, status, handleChange, handleUpdateTodo, handleThemeChange } = useEditList();
  if (status === 'loading') return <div><Loader /></div>;

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-center">
        <div className="p-6 w-full sm:w-3/4 md:w-2/4">
          <div className='flex items-center justify-center'>
            {error && <p className="text-red-500">{error}</p>}
            {localError && <p className="text-red-500">{localError}</p>}
            <input
              type="text"
              value={todoName}
              onChange={handleChange}
              placeholder="[list]"
              className="w-full sm:w-80 p-2 bg-customBackground text-customText border-4 border-customOrange rounded-xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
            />
          </div>
          <div className='flex flex-wrap justify-center mt-6 gap-3'>
            {themes.slice(0, 3).map((theme) => (
              <button
                key={theme.name}
                className={`${theme.background} ${theme.primary} text-base sm:text-lg border-4 ${theme.border} rounded-3xl px-4 py-1 ${selectedTheme === theme.name && 'ring-4 ring-customOrange'}`}
                onClick={() => handleThemeChange(theme.name)}
              >
                {theme.name}
              </button>
            ))}
          </div>
          <div className='flex flex-wrap justify-center mt-6 gap-3'>
            {themes.slice(3, 6).map((theme) => (
              <button
                key={theme.name}
                className={`${theme.background} ${theme.primary} text-base sm:text-lg border-4 ${theme.border} rounded-3xl px-4 py-1 ${selectedTheme === theme.name && 'ring-4 ring-customOrange'}`}
                onClick={() => handleThemeChange(theme.name)}
              >
                {theme.name}
              </button>
            ))}
          </div>
          <div className='flex flex-wrap justify-center mt-6 gap-3'>
            {themes.slice(6, 9).map((theme) => (
              <button
                key={theme.name}
                className={`${theme.background} ${theme.primary} text-base sm:text-lg border-4 ${theme.border} rounded-3xl px-4 py-1 ${selectedTheme === theme.name && 'ring-4 ring-customOrange'}`}
                onClick={() => handleThemeChange(theme.name)}
              >
                {theme.name}
              </button>
            ))}
          </div>

          <div className="flex justify-center items-center h-full mt-4">
            <button
              onClick={handleUpdateTodo}
              className="px-6 py-2 mt-4 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-lg sm:text-xl"
            >
              Edit List.
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <p className="font-footerText text-customFooter text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
          edit list<span className="text-customOrange text-4xl sm:text-6xl md:text-8xl lg:text-8xl">.</span>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>

  );
};

export default EditListPage;
