"use client"

import { useEffect, useState } from "react"
import { enviaFormulario } from "./enviarFormulario"
import { useAmbiente } from "@/utils/AmbienteContext";
import { consultaCredito } from "./consultaCredito";


const Creditos = () => {

    const {creditos, setCreditos, isLogado, user} = useAmbiente(0);

    useEffect(()=>{
        const consultaCreditos = async  (clienteId) => {
            var res = await consultaCredito(clienteId)
            setCreditos(JSON.parse(res))

        }
        consultaCreditos(user.clienteId);

    },[])

    return (
        <div className='flex items-baseline relative'>
            <span className='text-xs text-neutral-500 font-mono absolute top-[-12px] left-2'>créditos</span>
            <div className="text-green-600 transition duration-200 font-RobotoMono
                            motion-reduce:transition-none dark:text-green-400 lg:px-2 text-2xl
                            [&.active]:text-black/90 dark:[&.active]:text-green-400"
            >
                R$ {creditos.dados && creditos.dados.toFixed(2)}
            </div>
        </div>
    )
}

export default Creditos