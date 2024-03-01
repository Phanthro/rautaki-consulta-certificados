"use client"

import { useEffect, useState } from "react"
import { enviaFormulario } from "./enviarFormulario"
import { useAmbiente } from "@/utils/AmbienteContext";
import { consultaCredito } from "./consultaCredito";


const Creditos = () => {

    const {creditos, setCreditos, isLogado, user} = useAmbiente(0);

    useEffect(()=>{
        const consultaCreditos = async  (usuarioId) => {
            var res = await consultaCredito(usuarioId)
            setCreditos(JSON.parse(res))

        }
        consultaCreditos(user.usuarioId);

    },[user])

    return (
        <div className='flex flex-col'>
            <div className='text-xs text-cinza font-mono flex'>
                <img src="/images/dolar.svg" className="self-center" /> 
                <span className="self-center">Créditos</span>
            </div>
            <div className="text-cinza font-RobotoMono text-md" >
                R$ {creditos.dados && creditos.dados.toFixed(2)}
            </div>
        </div>
    )
}

export default Creditos