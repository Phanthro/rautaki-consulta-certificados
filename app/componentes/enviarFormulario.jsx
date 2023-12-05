"use server"

import { cookies } from "next/headers"

export async function enviaFormulario(formData, url, metodo) {

  let payload = JSON.stringify(formData)
  const cookieStore = cookies()
  const token = cookieStore.get('serpro-token')
  if (!token) return;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token.value}`);
  myHeaders.append("Cookie", `serpro-token=${token.value}`);

  return await (fetch(url, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token.value}`
    },
    body: payload,
    cache: 'no-store'
  }).then(response => {

    if (response.status != 200)
      console.log(response)

    return response.text()

  }).then((dados) => {

      return dados;
    }))


  // return (await (fetch(url, {
  //   method: metodo,
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: payload,
  //   cache: 'no-store'
  // }))).json()

};