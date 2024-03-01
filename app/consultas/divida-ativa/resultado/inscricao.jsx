"use client"

import { useAmbiente } from "@/utils/AmbienteContext"
import moment from "moment/moment";
import ItemResultado from "./itemResultado";
import { useEffect } from "react";

const InscricaoResultado = () => {

    const { dados, setDados } = useAmbiente();

    return (

        <div className="flex flex-col max-w-4xl m-auto border border-gray-200 p-3 text-sm">
            
            {dados && dados.requisicao && dados.retorno &&
                <div>
                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2 flex">
                        <div className="m-3 text-lg font-bold underline">Número de Inscrição consultado:</div>
                        <div className="font-bold m-4">
                            {dados.retorno[0].inscricao}
                        </div>
                    </div>

                    {dados.retorno &&
                        <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2"><div className="m-3 text-lg font-bold underline">Informações:</div>
                            <div className="flex flex-wrap gap-2">

                                {/* <ItemResultado campo={'Inscrição'} valor={dados.retorno[0].inscricao} /> */}
                                <ItemResultado campo={'Processo Administrativo'} valor={dados.retorno[0].processoAdministrativo} />
                                <ItemResultado campo={'Situação'} valor={dados.retorno[0].situacao} />
                                <ItemResultado campo={'Data Inscrição'} valor={dados.retorno[0].dataInscricao} />
                                <ItemResultado campo={'No. PFN Responsável'} valor={dados.retorno[0].numeroPFNResponsavel} />
                                <ItemResultado campo={'Nome PFN Responsável'} valor={dados.retorno[0].nomePFNResponsavel} />
                                <ItemResultado campo={'No. PFN Inscrição'} valor={dados.retorno[0].numeroPFNInscricao} />
                                <ItemResultado campo={'Nome PFN Inscrição'} valor={dados.retorno[0].nomePFNInscricao} />
                                <ItemResultado campo={'No. Processo Judicial'} valor={dados.retorno[0].numeroProcessoJudicial} />
                                <ItemResultado campo={'No.Processo Judicial Novo'} valor={dados.retorno[0].numeroProcessoJudicialNovo} />
                                <ItemResultado campo={'Orgão Origem'} valor={dados.retorno[0].orgaoOrigem} />
                                <ItemResultado campo={'Código Natureza Receita'} valor={dados.retorno[0].codigoNaturezaReceita} />
                                <ItemResultado campo={'Nome Natureza Receita'} valor={dados.retorno[0].nomeNaturezaReceita} />
                                <ItemResultado campo={'Código Receita Principal'} valor={dados.retorno[0].codigoReceitaPrincipal} />
                                <ItemResultado campo={'Nome Receita'} valor={dados.retorno[0].nomeReceita} />
                                <ItemResultado campo={'Código Série'} valor={dados.retorno[0].codigoSerie} />
                                <ItemResultado campo={'Nome Série'} valor={dados.retorno[0].processoAdministrativo} />
                                <ItemResultado campo={'Código Orgão Justica'} valor={dados.retorno[0].codigoOrgaoJustica} />
                                <ItemResultado campo={'Nome Orgão Justica'} valor={dados.retorno[0].nomeOrgaoJustica} />
                                <ItemResultado campo={'Número Juízo'} valor={dados.retorno[0].numeroJuizo} />
                                <ItemResultado campo={'Descrição Juízo'} valor={dados.retorno[0].descricaoJuizo} />
                                <ItemResultado campo={'Data Protocolo Jud. Execução'} valor={dados.retorno[0].dataProtocoloJudExecucao} />
                                <ItemResultado campo={'Data Distribuicao Judicial'} valor={dados.retorno[0].dataDistribuicaoJudicial} />
                                <ItemResultado campo={'Indicador Moeda Total Inscrito'} valor={dados.retorno[0].indicadorMoedaTotalInscrito} />
                                <ItemResultado campo={'Valor Total Inscrito Moeda'} valor={dados.retorno[0].valorTotalInscritoMoeda} />
                                <ItemResultado campo={'Valor Total Inscrito Index'} valor={dados.retorno[0].valorTotalInscritoIndex} />
                                <ItemResultado campo={'Indicador Moeda Total Consolidado'} valor={dados.retorno[0].indicadorMoedaTotalConsolidado} />
                                <ItemResultado campo={'Valor Total Consolidado Moeda'} valor={dados.retorno[0].valorTotalConsolidadoMoeda} />
                                <ItemResultado campo={'Indicador Moeda Total Remanescente'} valor={dados.retorno[0].indicadorMoedaTotalRemanescente} />
                                <ItemResultado campo={'Valor Remanescente Moeda'} valor={dados.retorno[0].valorRemanescenteMoeda} />
                                <ItemResultado campo={'Valor Remanescente Index'} valor={dados.retorno[0].valorRemanescenteIndex} />
                                <ItemResultado campo={'Data Devolucao Processo'} valor={dados.retorno[0].dataDevolucaoProcesso} />
                                <ItemResultado campo={'No. Auto Infracao'} valor={dados.retorno[0].numeroAutoInfracao} />
                                <ItemResultado campo={'Indicador Prescrição SV8'} valor={dados.retorno[0].indicadorPrescricaoSV8} />
                                <ItemResultado campo={'Data Decretação Falência'} valor={dados.retorno[0].dataDecretacaoFalencia} />
                                <ItemResultado campo={'Data Fim Procurador'} valor={dados.retorno[0].dataFimProcurador} />
                                <ItemResultado campo={'No. Imovel ITR'} valor={dados.retorno[0].numeroImovelITR} />
                                <ItemResultado campo={'Data Extinção Inscrição'} valor={dados.retorno[0].dataExtincaoInscricao} />
                                <ItemResultado campo={'Motivo Suspensão Exigilidade'} valor={dados.retorno[0].motivoSuspensaoExigilidade} />
                                <ItemResultado campo={'No. RipSpu'} valor={dados.retorno[0].numeroRipSpu} />
                                <ItemResultado campo={'Indicador Analise Orgão Origem'} valor={dados.retorno[0].indicadorAnaliseOrgaoOrigem} />
                                <ItemResultado campo={'MotivoExtinção Inscrição'} valor={dados.retorno[0].motivoExtincaoInscricao} />
                                <ItemResultado campo={'Indicador Prot. Imped. Ajuiz.'} valor={dados.retorno[0].indicadorProtImpedAjuiz} />
                                <ItemResultado campo={'No. Agrupamento'} valor={dados.retorno[0].numeroAgrupamento} />
                                <ItemResultado campo={'No. Inscrição Original'} valor={dados.retorno[0].numeroInscricaoOriginal} />
                                <ItemResultado campo={'Numero Inscrição Derivada 1'} valor={dados.retorno[0].numeroInscricaoDerivada1} />
                                <ItemResultado campo={'Numero Inscrição Derivada 2'} valor={dados.retorno[0].numeroInscricaoDerivada2} />
                                <ItemResultado campo={'Numero Inscrição Derivada 3'} valor={dados.retorno[0].numeroInscricaoDerivada3} />
                                <ItemResultado campo={'Numero Inscrição Derivada 4'} valor={dados.retorno[0].numeroInscricaoDerivada4} />
                                <ItemResultado campo={'Numero Inscrição Derivada 5'} valor={dados.retorno[0].numeroInscricaoDerivada5} />
                                <ItemResultado campo={'Numero Inscrição Derivada 6'} valor={dados.retorno[0].numeroInscricaoDerivada6} />
                                <ItemResultado campo={'Numero Inscrição Derivada 7'} valor={dados.retorno[0].numeroInscricaoDerivada7} />
                                <ItemResultado campo={'Dcomp'} valor={dados.retorno[0].dcomp} />
                                <ItemResultado campo={'Descrição Não Calculado'} valor={dados.retorno[0].descricaoNaoCalculado} />
                                <ItemResultado campo={'Código Município SPU'} valor={dados.retorno[0].codigoMunicipioSPU} />
                                <ItemResultado campo={'Código Sistema Origem'} valor={dados.retorno[0].codigoSistemaOrigem} />
                                <ItemResultado campo={'Descrição Sistema Origem'} valor={dados.retorno[0].descricaoSistemaOrigem} />
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default InscricaoResultado