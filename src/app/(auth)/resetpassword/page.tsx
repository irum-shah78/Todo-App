// import { Metadata } from 'next';
// import React from 'react';
// import Header from '@/components/header/Header';
// import ResetPasswordForm from '../../../components/resetpassform/resetPassForm';

// export const metadata: Metadata = {
//   title: "Reset Password | Todo App",
//   description: "Reset your account password securely on Todo App.",
//   openGraph: {
//     title: "Reset Password | Todo App",
//     description: "Securely reset your account password on Todo App.",
//     images: [
//       {
//         url: `${process.env.NEXT_PUBLIC_APP_URL}/images/change-password-og.png`,
//         alt: "Todo App Reset Password",
//       },
//     ],
//     url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/resetpassword`,
//     type: "website",
//   },
// };

// const ResetPasswordPage = () => {
//   return (
//     <>
//       <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//       <Header />
//         <div className="flex-grow flex items-center justify-center bg-center">
//           <div className="p-6 w-96">
//             <ResetPasswordForm />
//           </div>
//         </div>
//         <div className='flex justify-end mb-4'>
//           <p className='font-footerText text-customFooter text-4xl sm:text-3xl md:text-3xl lg:text-6xl'>
//             Reset Password<span className='text-customOrange text-4xl sm:text-6xl md:text-7xl lg:text-8xl'>.</span>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResetPasswordPage;


import Head from 'next/head';
import React from 'react';
import Header from '@/components/header/Header';
import ResetPasswordForm from '../../../components/resetpassform/resetPassForm';;

const ResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Reset Password | Todo App</title>
        <meta name="description" content="Reset your account password securely on Todo App." />
        <meta property="og:title" content="Reset Password | Todo App" />
        <meta property="og:description" content="Securely reset your account password on Todo App." />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/images/change-password-og.png`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/auth/resetpassword`} />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
        <Header />
        <div className="flex-grow flex items-center justify-center bg-center">
          <div className="p-6 w-96">
            <ResetPasswordForm />
          </div>
        </div>
        <div className='flex justify-end mb-4'>
          <p className='font-footerText text-customFooter text-4xl sm:text-3xl md:text-3xl lg:text-6xl'>
            Reset Password<span className='text-customOrange text-4xl sm:text-6xl md:text-7xl lg:text-8xl'>.</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;