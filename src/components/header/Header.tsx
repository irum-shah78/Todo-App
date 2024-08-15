import React from 'react';
import Image from 'next/image';
import logo from "../../../public/assets/icons/logo.svg";

const Header = () => {
  return (
    <header className="bg-navBlack w-full h-14 dotted-nav flex items-center justify-between fixed top-0">
      <Image src={logo} alt="icon" className="ms-6 h-8 w-8 cursor-pointer " />
    </header>
  );
};

export default Header;
