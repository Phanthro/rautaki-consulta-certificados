"use client"
import React, { useState } from 'react'
import BiometriaFacial from './biometria-facial';

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
                    Biometrial Facial
                </button>
                <button
                    className={`py-2 px-4 ${abaAtiva === 2 ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500'} focus:outline-none`}
                    onClick={() => handleClickAba(2)}
                >
                    Documento
                </button>
            </div>

            <div>
                {abaAtiva === 1 && (
                    <div className="py-4">
                        <BiometriaFacial />
                    </div>
                )}

                {abaAtiva === 2 && (
                    <div className="py-4">
                        Conteúdo da Tab 2
                    </div>
                )}
            </div>
        </div>
    )
}

export default page