"use client"

import { useAmbiente } from "@/utils/AmbienteContext"
import moment from "moment/moment";
import ItemResultado from "./itemResultado";
import { useEffect } from "react";

const DevedorResultado = () => {

    const { dados, setDados } = useAmbiente();

    return (

        <div className="flex flex-col max-w-4xl m-auto border border-gray-200 p-3 text-sm">
            
            {dados && dados.requisicao && dados.retorno &&
                <div>
                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2 flex">
                        <div className="m-3 text-lg font-bold underline">Número de Inscrição consultado:</div>
                        <div className="font-bold m-4">
                            {dados.retorno[0].numeroInscricao}
                        </div>
                    </div>

                    {dados.retorno &&
                        <div className="flex flex-wrap gap-2">
                            <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2"><div className="m-3 text-lg font-bold underline">Informações:</div>

                                {/* <ItemResultado campo={'Inscrição'} valor={dados.retorno[0].inscricao} /> */}
                                <ItemResultado campo={'Número Processo'} valor={dados.retorno[0].numeroProcesso} />
                                <ItemResultado campo={'Situacao Inscrição'} valor={dados.retorno[0].situacaoInscricao} />
                                <ItemResultado campo={'Situação Descrição'} valor={dados.retorno[0].situacaoDescricao} />
                                <ItemResultado campo={'Nome do Devedor'} valor={dados.retorno[0].nomeDevedor} />
                                <ItemResultado campo={'Tipo'} valor={dados.retorno[0].tipoDevedor} />
                                <ItemResultado campo={'CPF / CNPJ'} valor={dados.retorno[0].cpfCnpj} />
                                <ItemResultado campo={'Código Sida'} valor={dados.retorno[0].codigoSida} />
                                <ItemResultado campo={'Nome da Unidade'} valor={dados.retorno[0].nomeUnidade} />
                                <ItemResultado campo={'Código Comprot'} valor={dados.retorno[0].codigoComprot} />
                                <ItemResultado campo={'Código Uorg'} valor={dados.retorno[0].codigoUorg} />
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default DevedorResultado