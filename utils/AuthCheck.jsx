"use client"
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAmbiente } from './AmbienteContext';
import { ValidaToken } from './ValidaToken';

const origin = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1`

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    const { setIsLogado, setUser } = useAmbiente();
  
    useEffect(() => {
      const getUser = async () => {
        let url = `${origin}/Auth/ValidaToken`
        const response = await ValidaToken(url)
        
        const user = await response
        if (!user) {
          setIsLogado(false)
          router.push('/')
          return;
        }
        
        setUser(JSON.parse(user));
        setIsLogado(true);
      };
      getUser();
  
    }, []);
    return <Component {...props} />
  }

  return AuthenticatedComponent;

}

export default withAuth
