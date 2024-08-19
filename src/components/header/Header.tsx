import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../../public/assets/icons/logo.svg";
import tuneNav from "../../../public/assets/icons/Tune-Nav.svg";
import logoutIcon from "../../../public/assets/icons/Logout.svg";
import useHeader from './useHeader';
import { HeaderProps } from '@/types/type';

const Header: React.FC<HeaderProps> = ({ theme }) => {
  const { handleSignOut, isAuthenticated } = useHeader({ theme });

  const themeClassPrefix = theme?.name
    ? theme.name.toLowerCase().replace(/\s+/g, '-')
    : 'default';

  return (
    <header
      className={`w-full h-12 flex items-center justify-between fixed top-0 
        ${theme ? `bg-${themeClassPrefix}-background` : 'dotted-nav'}`}
    >
      <Link href="/">
        <Image src={logo} alt="icon" className="ms-6 h-8 w-8 cursor-pointer" />
      </Link>
      <div className="flex items-center gap-2">
        {isAuthenticated && (
          <>
            <Link href="/settings">
              <Image src={tuneNav} alt="settings icon" className={`h-8 w-8 cursor-pointer bg-${themeClassPrefix}-background`} />
            </Link>
            <Image src={logoutIcon} alt="logout icon" className={`mr-6 h-8 w-8 cursor-pointer bg-${themeClassPrefix}-background`}
              onClick={handleSignOut} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;