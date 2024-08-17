import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import logo from "../../../public/assets/icons/logo.svg";
import tuneNav from "../../../public/assets/icons/Tune-Nav.svg";
import logoutIcon from "../../../public/assets/icons/Logout.svg"; 

interface HeaderProps {
  theme?: {
    primary: string;
    background: string;
    accent: string;
  };
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  const { data: session, status } = useSession();

  const headerStyle = theme
    ? { backgroundColor: theme.background }
    : { background: 'navBlack' };

  const tuneNavStyle = theme
    ? `mr-6 h-8 w-8 cursor-pointer fill-[${theme.accent}]`
    : 'mr-6 h-8 w-8 cursor-pointer';

  return (
    <header
      style={headerStyle}
      className="w-full h-12 dotted-nav flex items-center justify-between fixed top-0"
    >
      <Link href="/">
        <Image src={logo} alt="icon" className="ms-6 h-8 w-8 cursor-pointer" />
      </Link>
      <div className="flex items-center">
        {status === 'authenticated' && (
          <>
            <Link href="/settings">
              <Image src={tuneNav} alt="settings icon" className={tuneNavStyle} />
            </Link>
            <Image
              src={logoutIcon}
              alt="logout icon"
              className="mr-6 h-8 w-8 cursor-pointer"
              onClick={() => signOut({ callbackUrl: '/signin' })}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
