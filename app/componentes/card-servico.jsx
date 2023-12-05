import { useAmbiente } from '@/utils/AmbienteContext';
import React from 'react'

const CardServico = (props) => {
    const formatoMoeda = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    const { isLogado } = useAmbiente();

    return (
        <div className="p-8 ml-4 border border-gray-200 rounded relative
            bg-white w-64 hover:bg-gray-50 hover:border-b-4 hover:border-b-green-900 
            active:bg-gray-100 h-[400px]" >

            <div className="flex justify-center items-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <div className="text-center mt-4">
                <h1 className="font-bold text-gray-700 text">{props.titulo}</h1>
                <p className="text-500 text-sm mt-4">
                    {props.descricao}
                </p>

            </div>
            {isLogado?
            <a href={props.link} className='absolute bottom-0 left-0 text-center w-full h-10 py-2 bg-green-500 text-green-950
                text-500 text-lg mt-4 font-extrabold font-inter'>
                {formatoMoeda.format(props.valor)} / consulta
            </a>
            :
            <a href='/login' className='absolute bottom-0 left-0 text-center w-full h-10 py-2 bg-yellow-500 text-yellow-950
                text-500 text-lg mt-4 font-extrabold font-inter uppercase'>
                consultar
            </a>
            }

        </div>
    )
}

export default CardServico