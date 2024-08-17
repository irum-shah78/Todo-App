"use client";
import React from 'react';
import Header from '@/components/header/Header';
import { useForgetPassword } from './useForgetPassword';

export default function ForgetPassword() {
  const { email, setEmail, loading, handleSubmit } = useForgetPassword();

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-center">
        <div className="p-6 w-96">
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-customText text-xl ml-6'>Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
                disabled={loading} />
            </div>
            <button type="submit" className="w-full p-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl mt-2" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
      <div className='flex justify-end mb-4'>
        <p className='font-footerText text-customFooter text-6xl lg:text-5xl md:text-3xl sm:text-2xl'>
          forget password<span className='text-customOrange text-6xl'>.</span></p>
      </div>
    </div>
  );
}