// "use client";

// import { signOut } from "next-auth/react"

// export default function LogoutButton(){
//   return (
//     <div className="text-center bg-black text-white"
//     onClick={()=>{
//       signOut();
//     }} 
    
//     >Logout</div>
//   )
// }


// components/logout/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/signin');
  };

  return (
    <div 
      className="text-center bg-black text-white cursor-pointer p-2"
      onClick={handleLogout}
    >
      Logout
    </div>
  );
}
