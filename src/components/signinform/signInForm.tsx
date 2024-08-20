'use client';

import React from 'react';
import { useSignIn } from './useSignInForm';
import googlelogo from "../../../public/assets/icons/google-logo.svg";
import Image from 'next/image';
import Header from '@/components/header/Header';

const SignInForm: React.FC = () => {
  const { email, setEmail, password, setPassword, loadingCredentials, loadingGoogle, handleSubmit, handleGoogleSignIn } = useSignIn();

  return (
    <form onSubmit={handleSubmit} className="">
      <div className='mb-4'>
        <label className='block text-customText text-xl ml-6'>Email</label>
        <input 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          disabled={loadingCredentials || loadingGoogle} 
          placeholder="Email" 
          className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" 
        />
      </div>
      <div>
        <label className='block text-customText text-xl ml-6'>Password</label>
        <input 
          id="password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
          disabled={loadingCredentials || loadingGoogle} 
          className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" 
        />
      </div>
      <div className="flex justify-end">
        <a href="/forgetpassword" className="text-sm text-customText hover:underline mt-2">Forget Password</a>
      </div>
      <div className='mt-6'>
        <button 
          type="button" 
          className="w-full p-2 flex items-center text-center bg-customBackground text-customOrange border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl" 
          onClick={handleGoogleSignIn} 
          disabled={loadingGoogle || loadingCredentials}
        >
          <Image src={googlelogo} alt="Google logo" className="w-6 h-6 ml-4 mr-4" />
          {loadingGoogle ? "Signing In..." : "Sign In with Google"}
        </button>
      </div>
      <div>
        <button 
          type="submit" 
          className="w-full p-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl mt-2" 
          disabled={loadingCredentials || loadingGoogle}
        >
          {loadingCredentials ? "Signing In..." : "Sign In"}
        </button>
        <p className="text-center text-white mt-4">
          Don&#39;t have an account? <a href="/signup" className="text-orange-500 underline">Sign up</a>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
