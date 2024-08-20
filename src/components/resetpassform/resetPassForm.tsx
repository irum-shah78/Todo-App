'use client';

import React from 'react';
import { useResetPassword } from './useResetPassForm';

const ResetPasswordForm: React.FC = () => {
  const { password, setPassword, confirmPassword, setConfirmPassword, loading, handleSubmit } = useResetPassword();

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className='block text-customText text-xl ml-6'>New Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="New Password"
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
        type="submit" 
        className="w-full p-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl mt-2" 
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
