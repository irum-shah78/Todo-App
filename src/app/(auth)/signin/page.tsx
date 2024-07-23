// // "use client";
// // import React, { useEffect, useState } from 'react';
// // import { signIn, signOut } from 'next-auth/react';
// // import googlelogo from "../../../../public/assets/icons/google-logo.svg";
// // import Image from 'next/image';
// // import toast from 'react-hot-toast';
// // import Header from '@/components/header/Header';

// // export default function SignIn() {
// //   useEffect(()=>{
// //     signOut({
// //       redirect: false,
// //     });
// //   }, []);
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const signin = async () => {
// //     setLoading(true);
// //     const signinResponse = await signIn("credentials", {
// //       email,
// //       password,
// //       redirect: false,
// //     });

// //     if (signinResponse?.ok) {
// //       toast.success("Successfully Logged in!");
// //       setTimeout(() => {
// //         window.location.assign("/");
// //       }, 2000);

// //     } else if (signinResponse?.error) {
// //       toast.error(signinResponse.error);
// //     }

// //     setLoading(false);
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     await signin();
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
// //       <Header />
// //       <div className="flex-grow flex items-center justify-center bg-center">
// //         <div className="p-6 w-96">
// //           <form onSubmit={handleSubmit} className="">
// //             <div className='mb-4'>
// //               <label className='block text-customText text-xl ml-6'>Email</label>
// //               <input
// //                 id="email"
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 disabled={loading}
// //                 placeholder="Email"
// //                 className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
// //               />
// //             </div>
// //             <div>
// //               <label className='block text-customText text-xl ml-6'>Password</label>
// //               <input
// //                 id="password"
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 disabled={loading}
// //                 placeholder="Password"
// //                 className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
// //               />
// //             </div>
// //             <div className="flex justify-end">
// //               <a href="#" className="text-sm text-customText hover:underline mt-2">Forget Password</a>
// //             </div>
// //             <div className='mt-6'>
// //               <button
// //                 type="button"
// //                 className="w-full p-2 flex items-center text-center bg-customBackground text-customOrange border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
// //                 onClick={() => signIn('google')}
// //               >
// //                 <Image src={googlelogo} alt="Google logo" className="w-6 h-6 ml-4 mr-4" />
// //                 Sign In with Google
// //               </button>
// //             </div>
// //             <div>
// //               <button
// //                 type="submit"
// //                 onClick={signin}
// //                 className="w-full p-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl mt-2"
// //                 disabled={loading}
// //               >
// //                 {loading ? "Signing In..." : "Sign In"}
// //               </button>
// //               <p className="text-center text-white mt-4">
// //                 Don&#39;t have an account? <a href="/signup" className="text-orange-500 underline">Sign up</a>
// //               </p>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //       <div className='flex justify-end mb-4'>
// //         <p className='font-footerText text-customFooter text-6xl lg:text-5xl md:text-3xl sm:text-2xl'>
// //           sign in<span className='text-customOrange text-6xl'>.</span></p>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";
// import React, { useEffect, useState } from 'react';
// import { signIn, signOut } from 'next-auth/react';
// import googlelogo from "../../../../public/assets/icons/google-logo.svg";
// import Image from 'next/image';
// import toast from 'react-hot-toast';
// import Header from '@/components/header/Header';
// import { useRouter } from 'next/navigation';

// export default function SignIn() {
//   const router = useRouter();
  
//   useEffect(() => {
//     signOut({
//       redirect: false,
//     });
//   }, []);
  
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const signin = async () => {
//     setLoading(true);
//     const signinResponse = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (signinResponse?.ok) {
//       toast.success("Successfully Logged in!");
//       setTimeout(() => {
//         window.location.assign("/");
//       }, 2000);
//     } else if (signinResponse?.error) {
//       toast.error(signinResponse.error);
//     }

//     setLoading(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await signin();
//   };

//   return (
//     <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
//       <Header />
//       <div className="flex-grow flex items-center justify-center bg-center">
//         <div className="p-6 w-96">
//           <form onSubmit={handleSubmit} className="">
//             <div className='mb-4'>
//               <label className='block text-customText text-xl ml-6'>Email</label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={loading}
//                 placeholder="Email"
//                 className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
//               />
//             </div>
//             <div>
//               <label className='block text-customText text-xl ml-6'>Password</label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={loading}
//                 placeholder="Password"
//                 className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3"
//               />
//             </div>
//             <div className="flex justify-end">
//             <a href="/forgetpassword" className="text-sm text-customText hover:underline mt-2">Forget Password</a>
//             </div>
//             <div className='mt-6'>
//               <button
//                 type="button"
//                 className="w-full p-2 flex items-center text-center bg-customBackground text-customOrange border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl"
//                 onClick={() => signIn('google')}
//               >
//                 <Image src={googlelogo} alt="Google logo" className="w-6 h-6 ml-4 mr-4" />
//                 Sign In with Google
//               </button>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 onClick={signin}
//                 className="w-full p-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl mt-2"
//                 disabled={loading}
//               >
//                 {loading ? "Signing In..." : "Sign In"}
//               </button>
//               <p className="text-center text-white mt-4">
//                 Don&#39;t have an account? <a href="/signup" className="text-orange-500 underline">Sign up</a>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//       <div className='flex justify-end mb-4'>
//         <p className='font-footerText text-customFooter text-6xl lg:text-5xl md:text-3xl sm:text-2xl'>
//           sign in<span className='text-customOrange text-6xl'>.</span></p>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useEffect, useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import googlelogo from "../../../../public/assets/icons/google-logo.svg";
import Image from 'next/image';
import toast from 'react-hot-toast';
import Header from '@/components/header/Header';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  
  useEffect(() => {
    signOut({ redirect: false });
  }, []);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signin = async () => {
    setLoading(true);
    const signinResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signinResponse?.ok) {
      toast.success("Successfully Logged in!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else if (signinResponse?.error) {
      toast.error(signinResponse.error);
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }
    await signin();
  };

  return (
    <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-center">
        <div className="p-6 w-96">
          <form onSubmit={handleSubmit} className="">
            <div className='mb-4'>
              <label className='block text-customText text-xl ml-6'>Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
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
                disabled={loading}
                placeholder="Password"
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
                onClick={() => signIn('google')}
              >
                <Image src={googlelogo} alt="Google logo" className="w-6 h-6 ml-4 mr-4" />
                Sign In with Google
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="w-full p-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl mt-2"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
              <p className="text-center text-white mt-4">
                Don&#39;t have an account? <a href="/signup" className="text-orange-500 underline">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className='flex justify-end mb-4'>
        <p className='font-footerText text-customFooter text-6xl lg:text-5xl md:text-3xl sm:text-2xl'>
          sign in<span className='text-customOrange text-6xl'>.</span></p>
      </div>
    </div>
  );
}
