"use client"
import { enviaFormulario } from '@/app/componentes/enviarFormulario';
import { Consulta } from '@/types/consulta';
import { useAmbiente } from '@/utils/AmbienteContext';
import withAuth from '@/utils/AuthCheck';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const HistoricoUsuario = ({ params }) => {
  const router = useRouter();

  const [historico, setHistorico] = useState({});
  const {dados, setDados, user} = useAmbiente();
  const urlBase = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/Consultas/UsuarioConsultasHistorico`;

  useEffect(() => {
    const consultaHistorico = async () => {
      
      const url = urlBase + `?usuarioId=${user.usuarioId}`

      const res = await enviaFormulario('', url, 'GET')
      if (res)
        setHistorico(JSON.parse(res))

    }
    consultaHistorico();

  }, [user])

  const visualizar= async (consultaHistoricoId) =>{

    const url = urlBase + `?consultaHistoricoId=${consultaHistoricoId}`

    const res = await enviaFormulario('', url, 'GET')
      
    const resultado = JSON.parse(res).dados[0]
    
    const {tipo, alvo} = identificarConsulta(resultado.consultaId)
    
    setDados({
      requisicao: JSON.parse(resultado.requisicao),
      retorno : JSON.parse(resultado.resposta),
      consulta: tipo
    });

    
    router.push(alvo);

  }

  const identificarConsulta = (consultaId) => {
    switch (consultaId) {
      case Consulta[0].consultaId: //Validação de Dados e Biometria
        return {tipo:'facial', alvo:'/consultas/datavalid/resultado'};
      case Consulta[1].consultaId: //Validação de Documento
        return {tipo:'documento', alvo:'/consultas/datavalid/resultado'};

      case Consulta[2].consultaId: //Dívida Ativa - inscricao
        return {tipo:'inscricao', alvo:'/consultas/divida-ativa/resultado'};
      case Consulta[3].consultaId: //Dívida Ativa - devedor
        return {tipo:'devedor', alvo:'/consultas/divida-ativa/resultado'};

      case Consulta[4].consultaId: //CNPJ - basica
        return {tipo:'devedor', alvo:'/consultas/cnpj/resultado'};
      case Consulta[5].consultaId: //CNPJ - qsa
        return {tipo:'devedor', alvo:'/consultas/cnpj/resultado'};
        case Consulta[6].consultaId: //CNPJ - empresa
        return {tipo:'devedor', alvo:'/consultas/cnpj/resultado'};

      case Consulta[7].consultaId: //CPF
        return {tipo:'devedor', alvo:'/consultas/cpf/resultado'};

      case Consulta[8].consultaId: //CND
        return {tipo:'devedor', alvo:'/consultas/cnd/resultado'};

      case Consulta[9].consultaId: //CCIR
        return {tipo:'devedor', alvo:'/consultas/ccir/resultado'};

      
      default:
        throw new Error('Consulta não encontrada');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex bg-gray-200">
        <div className="w-1/5 py-2 px-4 border-b">Nome do Usuário</div>
        <div className="w-1/5 py-2 px-4 border-b">Nome da Consulta</div>
        <div className="w-1/5 py-2 px-4 border-b">CPF</div>
        <div className="w-1/5 py-2 px-4 border-b">Realizado em</div>
        <div className="w-1/5 py-2 px-4 border-b">Ações</div>
      </div>
      
      {historico.dados ?
      <div>
        {historico.dados.map((h) => (
          <div key={h.consultaHistoricoId} className="flex bg-gray-100">
            <div className="w-1/5 py-2 px-4 border-b">{h.nomeUsuario}</div>
            <div className="w-1/5 py-2 px-4 border-b">{h.nomeConsulta}</div>
            <div className="w-1/5 py-2 px-4 border-b">{h.cpf}</div>
            <div className="w-1/5 py-2 px-4 border-b">{moment(h.realizadoEm).format('DD/MM/YYYY HH:mm:ss')}</div>
            
            <div className="w-1/5 py-2 px-4 border-b">
              <button onClick={()=>{visualizar(h.consultaHistoricoId)}} className="bg-gray-50 text-gray-800 py-1 px-2 rounded">Visualizar</button>
            </div>
          </div>
        ))}
        </div>
        :
        <div>
          sem histórico
        </div>
      }
    </div>

  )
}

export default withAuth(HistoricoUsuario)