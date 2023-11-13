import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useAuth } from 'src/hooks/useAuth';

interface IProps {
  children: ReactNode
  
}

const SessionChecker = ({ children }:IProps) => {
  const router = useRouter();
  const { logout } = useAuth()
  const loginDate = localStorage.getItem('timestamp');

  
  useEffect(() => {
    if (loginDate) {
      const loginTime = parseInt(loginDate);
      const currentTime = Date.now();
      const elapsedTime = currentTime - loginTime;

      if (elapsedTime >= 13500000) { // 3:45 horas
        logout()
      }
    }

    //return
  }, [children]);

  
  return <>{children}</>;
};

export default SessionChecker;