'use client'
import CardServico from './componentes/card-servico'
import withAuth from '@/utils/AuthCheck'

const Home = () => {
  return (
    <div>
      <div className="max-w-3xl mx-auto text-center mt-12">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 border-b-2 border-gray-500 pb-2">
          Nossas Consultas
        </h1>
        <p className="text-lg text-gray-800 mb-8">Abaixo estão as consultas que estão disponíveis.</p>
      </div>
      <div className='max-w-[1200px] min-h-fit m-auto text-center flex justify-center'>

        <CardServico
          titulo="Validação de Dados e Biometria"
          descricao="O Datavalid é uma solução de inteligência para qualificação cadastral de pessoas físicas e jurídicas."
          valor="30.00"
          link="/consultas/datavalid"
        />

        <CardServico
          titulo="Dívida Ativa"
          descricao="Consulta detalhada sobre as dívidas ativas da União direto das bases da PGFN e também consulta dos dados do devedor, seja pessoa física ou jurídica."
          valor="10.00"
          link="/consultas/dividaAtiva"

        />

      </div>
    </div>
  )
}

export default withAuth(Home)