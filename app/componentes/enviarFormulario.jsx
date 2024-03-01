"use server"

import { cookies } from "next/headers"

export async function enviaFormulario(formData, url, metodo, cache = 'no-store') {

  const cookieStore = cookies()
  const token = cookieStore.get('Fire-token')

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
      cache: cache
    }).then(response => {

      if (response.status != 200){
        return response.text().then(errorText => {
          var erro = JSON.parse(errorText);
          var retorno = '';
          if(erro.lenght && erro.lenght > 0){
            retorno = erro.dados[0];
          }else{
            retorno = `${erro.dados} (${erro.status});`
          }

          if(retorno.message){
            console.log(retorno.property)
            console.log(retorno.message)
            console.log(retorno.code)
            throw new Error(`Erro: ${retorno.message}(${retorno.code})`);
          }
          else{
            throw new Error(`Erro: ${retorno}`);
          }
        });
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

    cache: cache
  }).then(response => {

    if (response.status != 200)
      console.log(response)

    return response.text()

  }).then((dados) => {

    return dados;
  }))

};
