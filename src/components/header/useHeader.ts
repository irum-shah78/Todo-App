import { useSession, signOut } from 'next-auth/react';
import { useEffect, useMemo } from 'react';
import { UseHeaderProps, UseHeaderReturn } from '@/types/type';
const useHeader = ({ theme }: UseHeaderProps): UseHeaderReturn => {
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated';

  const headerStyle = useMemo(() => {
    if (theme) {
      return { backgroundColor: theme.background };
    } else {
      return { background: 'navBlack' }; 
    }
  }, [theme]);

  const tuneNavStyle = useMemo(() => {
    if (theme) {
      return `mr-6 h-8 w-8 cursor-pointer fill-[${theme.accent}]`;
    } else {
      return 'mr-6 h-8 w-8 cursor-pointer';
    }
  }, [theme]);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/signin' });
  };

  return {
    headerStyle,
    tuneNavStyle,
    handleSignOut,
    isAuthenticated,
  };
};
export default useHeader;