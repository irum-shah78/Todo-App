import { Metadata } from 'next';
import React from 'react';
import Header from '@/components/header/Header';
import ChangePasswordForm from '../../../components/changepassform/changePassForm';

export const metadata: Metadata = {
  title: "Change Password | Todo App",
  description: "Change your account password securely on Todo App.",
  openGraph: {
    title: "Change Password | Todo App",
    description: "Securely change your account password on MyApp.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/change-password-og.png`,
        alt: "Todo App Change Password",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/changepassword`,
    type: "website",
  },
};

const ChangePassword = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
        <Header />
        <div className="flex-grow flex items-center justify-center bg-center">
          <div className="p-6 w-96">
            <ChangePasswordForm />
          </div>
        </div>
        <div className='flex justify-end mb-4'>
          <p className='font-footerText text-customFooter text-6xl lg:text-5xl md:text-3xl sm:text-2xl'>
            Change Password<span className='text-customOrange text-6xl'>.</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
