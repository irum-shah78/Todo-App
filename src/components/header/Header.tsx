import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../../public/assets/icons/logo.svg";
import tuneNav from "../../../public/assets/icons/Tune-Nav.svg";
import logoutIcon from "../../../public/assets/icons/Logout.svg";
import useHeader from './useHeader';
import { HeaderProps } from '@/types/type';

const Header: React.FC<HeaderProps> = ({ theme }) => {
  const { headerStyle, tuneNavStyle, handleSignOut, isAuthenticated } = useHeader({ theme });

  return (
    <header style={headerStyle} className="w-full h-12 dotted-nav flex items-center justify-between fixed top-0">
      <Link href="/">
        <Image src={logo} alt="icon" className="ms-6 h-8 w-8 cursor-pointer" />
      </Link>
      <div className="flex items-center">
        {isAuthenticated && (
          <>
            <Link href="/settings">
              <Image src={tuneNav} alt="settings icon" className={tuneNavStyle} />
            </Link>
            <Image src={logoutIcon} alt="logout icon" className="mr-6 h-8 w-8 cursor-pointer" onClick={handleSignOut} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;