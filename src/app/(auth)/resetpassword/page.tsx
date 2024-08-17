"use client";
import React from 'react';
import Header from '@/components/header/Header';
import { useResetPassword } from './useResetPassword';

export default function ResetPassword() {
  const { password, setPassword, confirmPassword, setConfirmPassword, loading, handleSubmit } = useResetPassword();

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-center">
        <div className="p-6 w-96">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className='block text-customText text-xl ml-6'>New Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password"
                className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" />
            </div>
            <div className="mb-4">
              <label className='block text-customText text-xl ml-6'>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" />
            </div>
            <button type="submit" className="w-full p-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl mt-2" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
      <div className='flex justify-end mb-4'>
        <p className='font-footerText text-customFooter text-6xl lg:text-5xl md:text-3xl sm:text-2xl'>
          Reset Password<span className='text-customOrange text-6xl'>.</span></p>
      </div>
    </div>
  );
}