"use server"

import { cookies } from "next/headers"

export async function enviaFormulario(formData, url, metodo) {

  const cookieStore = cookies()
  const token = cookieStore.get('serpro-token')

  if (metodo !== 'GET') {
    if(!token) throw new Error("Erro ao obter o token");
    let payload = JSON.stringify(formData)
    return await (fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token.value}`
      },
      body: payload,
      cache: 'no-store'
    }).then(response => {

      if (response.status != 200){
        console.log(response)
        throw new Error("Erro na consulta POST")
      }

      return response.text()

    }).then((dados) => {

      return dados;
    }))
  }

  return await (fetch(url, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
      "Authorization":  `Bearer ${token && token.value}`
    },

    cache: 'no-store'
  }).then(response => {

    if (response.status != 200)
      console.log(response)

    return response.text()

  }).then((dados) => {

    return dados;
  }))

};
