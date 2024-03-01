"use server"

import { enviaFormulario } from "../componentes/enviarFormulario";

export async function obterConsulta(consultaId) {

    const url = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/Consultas/ObterConsultas`

    const res = await enviaFormulario('', url, 'GET')

    const consultas = JSON.parse(res)

    if(consultaId){
        return consultas.dados.find( item => item.consultaId == consultaId);
    }

    return JSON.parse(res);

};