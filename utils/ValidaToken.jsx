"use server"

import { cookies } from "next/headers"

export async function ValidaToken(url){

    const cookieStore = cookies()
    const token = cookieStore.get('Fire-token')
    if(!token) return;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.value}`);
    myHeaders.append("Cookie", `Fire-token=${token.value}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      cache: 'no-store'
    };
    
    return fetch(url, requestOptions)
        .then(response => {
            if(response.status != 200) return ''

            return response.text()
        })
        .then( (dadosLogado)=>{
            return dadosLogado;
        })
};