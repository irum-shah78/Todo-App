// // // src/app/(root)/AuthenticatedLayout.tsx
// // 'use client'; // Add this line at the very top

// // import React from 'react';
// // import { useRouter } from 'next/navigation';
// // import { useTheme } from '../../libs/ThemeContext';
// // import Header from '@/components/header/Header';
// // import LogoutButton from '@/components/logout/LogoutButton';

// // const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //   const { currentTheme } = useTheme();
// //   const router = useRouter();

// //   const navigateTo = (path: string) => {
// //     router.push(path);
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col" style={{ backgroundColor: currentTheme.background }}>
// //       <Header />
// //       <nav className="flex justify-around p-4" style={{ backgroundColor: currentTheme.accent }}>
// //         <button onClick={() => navigateTo('/todos')} className="btn">Todos</button>
// //         <button onClick={() => navigateTo('/settings')} className="btn">Settings</button>
// //         <LogoutButton />
// //       </nav>
// //       <main className="flex-grow p-4">{children}</main>
// //     </div>
// //   );
// // };

// // export default AuthenticatedLayout;



// 'use client';

// import React from 'react';
// import { useRouter } from 'next/navigation';
// import { useTheme } from '@/libs/ThemeContext';
// import Header from '@/components/header/Header';
// import LogoutButton from '@/components/logout/LogoutButton';

// const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { currentTheme } = useTheme();
//   const router = useRouter();

//   const navigateTo = (path: string) => {
//     router.push(path);
//   };

//   return (
//     <div className="min-h-screen flex flex-col" style={{ backgroundColor: currentTheme.background }}>
//       <Header />
//       <nav className="flex justify-around p-4" style={{ backgroundColor: currentTheme.accent }}>
//         <button onClick={() => navigateTo('/todos')} className="btn">Todos</button>
//         <button onClick={() => navigateTo('/settings')} className="btn">Settings</button>
//         <LogoutButton />
//       </nav>
//       <main className="flex-grow p-4">{children}</main>
//     </div>
//   );
// };

// export default AuthenticatedLayout;
