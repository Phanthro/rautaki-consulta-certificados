"use client"
import { useAmbiente } from '@/utils/AmbienteContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Creditos from './creditos';

const Navbar = ({ data }) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const { isLogado, user } = useAmbiente();

    const AbreMenuUsuario = () => {
        setUserMenuOpen(!userMenuOpen)
    }

    return (
        <header id="top" className='shadow-sombra z-50 '>

            <nav
                className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <button
                        className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                        type="button">
                        <span className="[&>svg]:w-7">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-7 w-7">
                                <path
                                    fillRule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd" />
                            </svg>
                        </span>
                    </button>

                    <div
                        className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto">
                        <a
                            className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                            href="/">Serpro - Rauteki</a>
                    </div>

                    <div className="relative flex items-center gap-5">
                        {isLogado ? <>
                          
                            <Creditos />

                            <a
                                className="mr-4 text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out 
                                focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none 
                                dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 
                                [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                href="#">
                                <span className="[&>svg]:w-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5">
                                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                    </svg>
                                </span>
                            </a>


                            <div
                                className="relative">
                                <a onClick={AbreMenuUsuario}
                                    className="hidden-arrow flex items-center whitespace-nowrap transition 
                                    duration-150 ease-in-out motion-reduce:transition-none cursor-pointer justify-center"
                                >
                                    <img
                                        src="/images/user.png"
                                        className="rounded-full"
                                        style={{ height: '50px', width: '50px' }}
                                        alt=""
                                        loading="lazy" />
                                        <div className='absolute text-gray-400 mt-16 text-xs'>
                                            {user.username}

                                        </div>
                                </a>
                                <ul className={`absolute z-[1000] float-right m-0 min-w-max right-0
                                list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding 
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
                                            href="/logout"
                                        >Sair</a>
                                    </li>

                                </ul>
                            </div>
                        </>
                            :
                            <div>
                                <a
                                    className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                                    href="/login/"
                                    data-te-nav-link-ref
                                >Entrar</a>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar