"use client"

import { useAmbiente } from "@/utils/AmbienteContext"
import ItemResultado from "./itemResultado";
import Formatador from "@/utils/Formatador";

const CPFResultado = () => {

    const { dados, setDados } = useAmbiente();

    return (

        <div className="flex flex-col max-w-4xl m-auto border border-gray-200 p-3 text-xs">
            
            {dados && dados.requisicao && dados.retorno &&
                <div>
                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2 flex">
                        <div className="m-3 text-lg font-bold underline">Número de Inscrição consultado:</div>
                        <div className="font-bold m-4">
                            {dados.retorno.ni}
                        </div>
                    </div>

                    {dados.retorno &&
                        <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2"><div className="m-3 text-base font-bold underline">Informações:</div>
                            <div className="flex flex-wrap gap-2">

                                <ItemResultado campo={'Nome'} valor={dados.retorno.nome} />
                                <ItemResultado campo={'Situação'} valor={`${dados.retorno.situacao.codigo} - ${dados.retorno.situacao.descricao}`} />
                                <ItemResultado campo={'Data de Nascimento'} valor={Formatador.formatarData(dados.retorno.nascimento)} />
                                {dados.retorno.obito &&
                                    <ItemResultado campo={'Óbito'} valor={dados.retorno.obito} />
                                }
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default CPFResultado