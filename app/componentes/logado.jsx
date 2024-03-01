import { useAmbiente } from '@/utils/AmbienteContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Logado = () => {

  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const {sidebarOpen, toggleSidebar, isLogado, user} = useAmbiente();
  const router = useRouter();

  const voltarInicio = () => {
    router.push('/');
  };

  const AbreMenuUsuario = (status) => {
    setUserMenuOpen(status)
  }

  return (
    <div className="bg-white m-auto">
      <div className='m-auto flex flex-auto max-w-[500px] space-x-16 justify-between p-[15px]'>
        <div className='cursor-pointer' onClick={voltarInicio}>
          <img src='/images/fire_logo_cinza.png' width={130} />
        </div>
        <div className='h-[32px] border'></div>
        <div className=''>
          <img src='/images/rautaki_logo.png' width={130} />
        </div>
      </div>
      <div className='flex justify-center md:justify-normal space-x-20 md:space-x-[100px] md:px-3 px-10 py-2' onMouseLeave={(e)=>AbreMenuUsuario(false)}>
        <div className="relative">
          <a onClick={(e)=>AbreMenuUsuario(true)} className="hidden-arrow flex flex-row cursor-pointer">

            <img
              src="/images/user.png"
              className="rounded-full mr-3"
              style={{ height: '50px', width: '50px' }}
              alt=""
              loading="lazy" />
            <div className='text-gray-400 text-xs'>
              <div>{user.username}</div> 
              <div>{user.email}</div> 
            </div>

          </a>
          
          <ul className={`absolute z-[1000] float-right m-0 min-w-max right-0
          list-none overflow-hidden  border-none bg-white bg-clip-padding 
          text-left text-base shadow-lg dark:bg-neutral-700 ${!userMenuOpen && 'hidden'}`}
          >
            <li>
              <a
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal 
                  text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline 
                  disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 
                  dark:text-neutral-200 dark:hover:bg-white/30"
                href="/"
              >Recarga</a>
            </li>
            <li>
              <a
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal 
                  text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline 
                  disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 
                  dark:text-neutral-200 dark:hover:bg-white/30"
                href="/historicos/usuario/"
              >Histórico</a>
            </li>
            <li>
              <a
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal 
                  text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline 
                  disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 
                  dark:text-neutral-200 dark:hover:bg-white/30"
                href="/admin/usuarios/"
              >Conta</a>
            </li>

            <li>
              <a
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal 
                  text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline 
                  disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 
                  dark:text-neutral-200 dark:hover:bg-white/30"
                href="/logout"
              >Sair</a>
            </li>

          </ul>
        </div>
        <button className={`md:hidden text-black text-4xl py-1 px-2 rounded-xl max-w-[50px] max-h-[50px]`} onClick={toggleSidebar}>
          ☰
        </button>
      </div>

    
    </div>
  )
}

export default Logado