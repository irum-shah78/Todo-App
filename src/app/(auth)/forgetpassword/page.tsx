"use client";
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('auth/forgetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      toast.success('Password reset link sent to your email.');
    } else {
      toast.error('Failed to send reset link.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <div className="flex-grow flex items-center justify-center bg-center">
        <div className="p-6 w-96">
          <form onSubmit={handleSubmit} className="">
            <div className='mb-4'>
              <label className='block text-customText text-xl ml-6'>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="Email"
                className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full p-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl mt-2"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
