"use server"

import { enviaFormulario } from "./enviarFormulario"

export async function consultaCredito(usuarioId) {
    const url = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/Usuario/ObterCreditos?usuarioId=${usuarioId}`

    const res = await enviaFormulario('', url, 'GET')

    return res;

}