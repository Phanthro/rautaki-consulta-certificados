'use client'
import { useAmbiente } from '@/utils/AmbienteContext';
import Link from 'next/link';
import React from 'react'

const Sidebar = ({data}) => {
    const {sidebarOpen, toggleSidebar, isLogado} = useAmbiente();
    
    return (
        <div className={`w-4/6 text-black transform sombra 
            bg-white h-screen fixed overflow-hidden z-30 border border-cor-secundaria top-0
            ${!sidebarOpen ? 'hidden' : ''} md:w-0`} onClick={toggleSidebar}
            >
                <div><img src="/images/fire_logo_cinza.png" width={150} className='p-10 w-full'/></div>

            <ul>
                <li>
                </li>
                <li className="menu-li">
                    <img src="/images/carteira.svg" width={20} height={20} className='cursor-pointer ml-10' />
                    <Link href="#sobre" className='link-img'>Carteira</Link>
                </li>
                
                <li className="menu-li">
                    <img src="/images/transacao.svg" width={20} height={20} className='cursor-pointer ml-10' />
                    <Link href="#servicos" className='link-img'>Transações</Link>
                </li>
                <li className="menu-li">
                    <img src="/images/calendar.svg" width={20} height={20} className='cursor-pointer ml-10' />
                    <Link href="#localizacao" className='link-img'>Agendamento</Link>
                </li>
                <li className="menu-li">
                    <img src="/images/solicitacao.svg" width={20} height={20} className='cursor-pointer ml-10' />
                    <Link href="#contato" className='link-img'>Solicitações</Link>
                </li>
                <li className="menu-li">
                    <img src="/images/duvida.svg" width={20} height={20} className='cursor-pointer ml-10' /> 
                    <Link href="#contato" className='link-img ml-0'>Dúvida</Link>
                </li>
                <li className="menu-li">
                    <img src="/images/whatsapp.svg" width={20} height={20} className='cursor-pointer ml-10' /> 
                    <Link href="#contato" className='link-img ml-0'>WhatsApp</Link>
                </li>
                <li className="menu-li">
                    <img src="/images/configuracao.svg" width={20} height={20} className='cursor-pointer ml-10' /> 
                    <Link href="#contato" className='link-img ml-0'>Configurações</Link>
                </li>
                <li className="menu-li">
                    <img src="/images/user.svg" width={20} height={20} className='cursor-pointer ml-10' /> 
                    <Link href="#contato" className='link-img ml-0'>Conta</Link>
                </li>
                <li className="menu-li">
                    <img src="/images/atendimento.svg" width={20} height={20} className='cursor-pointer ml-10' /> 
                    <Link href="#contato" className='link-img ml-0 w-[90px]'>Central de atendimento</Link>
                </li>
                
                
              
                <li className="flex absolute right-5 bottom-0 mb-10">
                    <Link href="/logout" className='mr-3'>Sair</Link>
                    <img src="/images/sair.svg" width={20} height={20} className='cursor-pointer' /> 
                </li>
                
            </ul>
            
        </div>
    );
}

export default Sidebar