'use client';

import React from 'react';
import { useSignUp } from './useSignUpForm';
import googleLogo from "../../../public/assets/icons/google-logo.svg";
import Image from 'next/image';

const SignUpForm: React.FC = () => {
  const { name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, loading, handleSubmit } = useSignUp();

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className='block text-customText text-xl ml-6'>Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name"
          className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" 
        />
      </div>
      <div className="mb-4">
        <label className='block text-customText text-xl ml-6'>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
          className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" 
        />
      </div>
      <div className="mb-4">
        <label className='block text-customText text-xl ml-6'>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
          className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" 
        />
      </div>
      <div className="mb-4">
        <label className='block text-customText text-xl ml-6'>Confirm Password</label>
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm Password" 
          className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" 
        />
      </div>
      <button 
        type="button" 
        className="w-full p-2 flex items-center text-center bg-customBackground text-customOrange border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
      >
        <Image src={googleLogo} alt="Google" className="w-6 h-6 ml-4 mr-4" />
        Sign Up with Google
      </button>
      <button 
        type="submit" 
        className="w-full p-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl mt-2"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
      <p className="text-center text-white mt-2">
        Already have an account? <a href="/signin" className="text-orange-500 underline">Sign in</a>
      </p>
    </form>
  );
};

export default SignUpForm;
