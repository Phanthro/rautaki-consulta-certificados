"use client"
import { useAmbiente } from '@/utils/AmbienteContext';
import LoginComponent from './loginComponent';
import Logado from './logado';
import Sidebar from './Sidebar';

const Navbar = ({ data }) => {
    const { toggleSidebar,  sidebarOpen, isLogado } = useAmbiente();

    return (
        <header id="top" className='shadow-sombra z-50 '>
            <nav
                className="
                    flex-no-wrap 
                    relative
                    flex
                    w-full
                    items-center
                    justify-between 
                    bg-[#ffffff]
                    py-2
                    lg:flex-wrap 
                    lg:justify-start 
                    lg:py-4">
            
            {!isLogado?
             <LoginComponent />
             :
             <Logado />
            }
            
            </nav>
            <div className={`${!sidebarOpen && 'hidden'} absolute left-0 top-0 bg-black opacity-30 w-screen h-screen z-20 `} onClick={toggleSidebar}>&nbsp;</div>
            <Sidebar data={data} />
            
        </header>
    )
}

export default Navbar