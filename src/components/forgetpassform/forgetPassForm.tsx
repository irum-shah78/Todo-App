'use client';

import React from 'react';
import { useForgetPassword } from './useForgetPassForm';

const ForgetPasswordForm: React.FC = () => {
  const { email, setEmail, loading, handleSubmit } = useForgetPassword();

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label className='block text-customText text-xl ml-6'>Email</label>
        <input 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
          className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
          disabled={loading} 
        />
      </div>
      <button 
        type="submit" 
        className="w-full p-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl mt-2" 
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
};

export default ForgetPasswordForm;
