"use client"
import React, { useState } from 'react'
import withAuth from '@/utils/AuthCheck';
import CPF from './cpf';

const page = () => {
    const [abaAtiva, setAbaAtiva] = useState(1);

    const handleClickAba = (aba) => {
        setAbaAtiva(aba);
    };

    return (
        <div className='bg-fundo-borda bg-contain bg-no-repeat bg-cor-principal'>
            <div className="flex ">
                <button
                    className={`py-2 px-4 ${abaAtiva === 1 ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500'} focus:outline-none`}
                    onClick={() => handleClickAba(1)}
                >
                    CPF
                </button>
              
            </div>

            <div>
                {abaAtiva === 1 && (
                    <div className="py-4">
                        <CPF />
                    </div>
                )}
              
            </div>
        </div>
    )
}

export default withAuth(page)