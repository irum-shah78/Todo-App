import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../../public/assets/icons/logo.svg";
import logout from "../../../public/assets/icons/Logout.svg";
import { signOut } from 'next-auth/react';

const Header = () => {
  return (
    <header className="bg-navBlack w-full h-14 dotted-nav flex items-center justify-between fixed top-0">
      <Image src={logo} alt="icon" className="ms-6 h-8 w-8 cursor-pointer" />
      <Image 
        src={logout} 
        alt="icon" 
        className="mr-6 h-8 w-8 cursor-pointer" 
        onClick={() => signOut({ callbackUrl: '/signin' })} 
      />
    </header>
  );
};

export default Header;
