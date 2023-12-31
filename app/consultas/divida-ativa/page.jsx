"use client"
import React, { useState } from 'react'
import DividaAtiva from './divida-ativa';
import withAuth from '@/utils/AuthCheck';

const page = () => {
    const [abaAtiva, setAbaAtiva] = useState(1);

    const handleClickAba = (aba) => {
        setAbaAtiva(aba);
    };

    return (
        <div>
            <div className="flex border-b">
                <button
                    className={`py-2 px-4 ${abaAtiva === 1 ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500'} focus:outline-none`}
                    onClick={() => handleClickAba(1)}
                >
                    Dívida Ativa
                </button>
              
            </div>

            <div>
                {abaAtiva === 1 && (
                    <div className="py-4">
                        <DividaAtiva />
                    </div>
                )}
              
            </div>
        </div>
    )
}

export default withAuth(page)