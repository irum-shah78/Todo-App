import { Metadata } from 'next';
import React from 'react';
import HeaderComponent from '../../../components/header/Header';
import SignUpForm from '../../../components/signupform/SignUpForm';

export const metadata: Metadata = {
  title: "Sign Up | Todo App",
  description: "Create a new account on Todo App.",
  openGraph: {
    title: "Sign Up | Todo App",
    description: "Create a new account and join Todo App.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/signup`,
    type: "website",
  },
};

const SignUpPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
        <HeaderComponent />
        <div className="flex-grow flex items-center justify-center bg-center">
          <div className="p-6 w-96">
            <SignUpForm />
          </div>
        </div>
        <div className='flex justify-end mb-4'>
          <p className='font-footerText text-customFooter text-6xl lg:text-5xl md:text-3xl sm:text-2xl'>
            sign up<span className='text-customOrange text-6xl'>.</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;