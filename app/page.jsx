'use client'
import { useEffect, useState } from 'react'
import CardServico from './componentes/card-servico'
import withAuth from '@/utils/AuthCheck'
import { enviaFormulario } from './componentes/enviarFormulario'
import { useAmbiente } from '@/utils/AmbienteContext'

const Home = () => {

  const [consultas, setConsultas] = useState({});

  useEffect(()=>{
    const consultaConsultas = async  () => {

        const url = `https://localhost:7150/v1/Consultas/ObterConsultas`

        const res = await enviaFormulario('', url, 'GET')

        if(res){
          let jsonParse = JSON.parse(res)
          jsonParse.dados = jsonParse.dados.filter( item => !item.itemPai )
          setConsultas(jsonParse)
        }

    }
    consultaConsultas();

},[])
  return (
    <div>
      <div className="max-w-3xl mx-auto text-center mt-12">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 border-b-2 border-gray-500 pb-2">
          Nossas Consultas
        </h1>
        <p className="text-lg text-gray-800 mb-8">Abaixo estão as consultas que estão disponíveis.</p>
      </div>
      <div className='max-w-[1200px] min-h-fit m-auto text-center flex justify-center'>
        {consultas && consultas.dados && consultas.dados.map((item, index) => (
          <CardServico
            key={index}
            titulo={item.nome}
            descricao={item.descricao}
            valor={item.valor}
            link={item.link}
          />
        ))}

      </div>
    </div>
  )
}

export default withAuth(Home)