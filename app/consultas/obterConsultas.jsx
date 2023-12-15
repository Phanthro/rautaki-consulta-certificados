"use server"

import { enviaFormulario } from "../componentes/enviarFormulario";

export async function obterConsulta(consultaId) {

    const url = `https://localhost:7150/v1/Consultas/ObterConsultas`

    const res = await enviaFormulario('', url, 'GET')

    const consultas = JSON.parse(res)

    if(consultaId){
        return consultas.dados.find( item => item.consultaId == consultaId);
    }

    return JSON.parse(res);

};