import { Metadata } from 'next';
import React from 'react';
import Header from '@/components/header/Header';
import ForgetPasswordForm from '../../../components/forgetpassform/ForgetPassForm';

export const metadata: Metadata = {
  title: "Forget Password | Todo App",
  description: "Reset your account password securely on Todo App.",
  openGraph: {
    title: "Forget Password | Todo App",
    description: "Securely reset your account password on Todo App.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/forget-password-og.png`,
        alt: "Todo App Forget Password",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/forgetpassword`,
    type: "website",
  },
};

const ForgetPassword = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
        <Header />
        <div className="flex-grow flex items-center justify-center bg-center">
          <div className="p-6 w-96">
            <ForgetPasswordForm />
          </div>
        </div>
        <div className='flex justify-end mb-4'>
          <p className='font-footerText text-customFooter text-4xl sm:text-6xl lg:text-7xl'>
            Forget Password<span className='text-customOrange text-4xl sm:text-6xl lg:text-7xl'>.</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;