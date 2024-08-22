// import { Metadata } from 'next';
// import React from 'react';
// import Header from '@/components/header/Header';
// import SignInForm from '../../../components/signinform/signInForm';

// export const metadata: Metadata = {
//   title: "Sign In | Todo App",
//   description: "Sign in to your Todo App account securely.",
//   openGraph: {
//     title: "Sign In | MyApp",
//     description: "Securely sign in to your Todo App account.",
//     images: [
//       {
//         url: `${process.env.NEXT_PUBLIC_APP_URL}/images/signin-og.png`,
//         alt: "Todo App Sign In",
//       },
//     ],
//     url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/signin`,
//     type: "website",
//   },
// };

// const SignInPage = () => {
//   return (
//     <>
//       <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//         <Header />
//         <div className="flex-grow flex items-center justify-center bg-center">
//           <div className="p-6 w-96">
//             <SignInForm />
//           </div>
//         </div>
//         <div className='flex justify-end mb-4'>
//           <p className='font-footerText text-customFooter text-6xl lg:text-5xl md:text-3xl sm:text-2xl'>
//             sign in<span className='text-customOrange text-6xl'>.</span>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignInPage;


import Head from 'next/head';
import React from 'react';
import Header from '@/components/header/Header';
import SignInForm from '../../../components/signinform/signInForm';

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign In | Todo App</title>
        <meta name="description" content="Sign in to your Todo App account securely." />
        <meta property="og:title" content="Sign In | Todo App" />
        <meta property="og:description" content="Securely sign in to your Todo App account." />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/images/signin-og.png`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/auth/signin`} />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
        <Header />
        <div className="flex-grow flex items-center justify-center bg-center">
          <div className="p-6 w-96">
            <SignInForm />
          </div>
        </div>
        <div className='flex justify-end mb-4'>
          <p className='font-footerText text-customFooter text-6xl lg:text-5xl md:text-3xl sm:text-2xl'>
            sign in<span className='text-customOrange text-6xl'>.</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInPage;

