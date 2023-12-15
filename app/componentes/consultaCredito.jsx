"use server"

import { enviaFormulario } from "./enviarFormulario"

export async function consultaCredito(clienteId) {
    const url = `https://localhost:7150/v1/Cliente/CreditosCliente?clienteId=${clienteId}`

    const res = await enviaFormulario('', url, 'GET')

    return res;

}