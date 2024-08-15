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
