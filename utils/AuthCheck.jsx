"use client"
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAmbiente } from './AmbienteContext';
import { ValidaToken } from './ValidaToken';
// import { Paginas } from '@types/paginas';

// const origin = 'http://avaloncliente-clusterip-srv/v1'
// const origin = `http://localhost:5198/v1`
const origin = `https://localhost:7150/v1`

const withAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { isLogado, setIsLogado, setUser } = useAmbiente();
  
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
        
        setUser(user);
        setIsLogado(true);

        // const pagina = Paginas.find((x)=>{
        //   return x.rota === pathname
        // });

        // if(!pagina)// verifica se a pagina existe
        // {
        //   router.push('/painel/inicial');
        //   return null;
        // }
        
        // const usuario = JSON.parse(user)
        // const temPermissao = usuario.permissoes.includes(pagina.id)

        // if(!temPermissao){
        //   router.push('/painel/inicial');
        // }
        
      };
      getUser();
  
    }, []);
    return <Component />
  }

  return AuthenticatedComponent;

}

export default withAuth
