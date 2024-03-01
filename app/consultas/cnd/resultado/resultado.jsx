"use client"

import { useAmbiente } from "@/utils/AmbienteContext"
import moment from "moment/moment";
import ItemResultado from "./itemResultado";
import { useEffect } from "react";
import PdfDownloadButton from "@/app/componentes/PdfDownloadButton";

const ResultadoCND = () => {

    const { dados, setDados } = useAmbiente();

    return (

        <div className="flex flex-col max-w-4xl m-auto border border-gray-200 p-3">
            {dados && dados.retorno && dados.retorno.Certidao &&
                <div>
                    <div className="font-RobotoMono text-lg mt-5  mb-2 underline">Número de Inscrição consultado:</div>
                    <div className="font-bold">
                         {dados.retorno.inscricao}
                    </div>

                    {dados.retorno &&
                        <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2"><div className="m-3 text-base font-bold underline">Informações:</div>
                            <div className="flex flex-wrap flex-col">
                                
                                <ItemResultado campo={'Tipo de Contribuinte'} valor={dados.retorno.Certidao.TipoContribuinte} />
                                <ItemResultado campo={'Contribuinte'} valor={dados.retorno.Certidao.ContribuinteCertidao} />
                                <ItemResultado campo={'Tipo de Certidão'} valor={dados.retorno.Certidao.TipoCertidao} />
                                <ItemResultado campo={'Data de Emissao'} valor={dados.retorno.Certidao.DataEmissao} />
                                <ItemResultado campo={'Data de Validade'} valor={dados.retorno.Certidao.DataValidade} />
                                <ItemResultado campo={'Codigo de Controle'} valor={dados.retorno.Certidao.CodigoControle} />
                                <div className="w-fit m-4">
                                    <PdfDownloadButton  pdfData={dados.retorno.Certidao.DocumentoPdf} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default ResultadoCND