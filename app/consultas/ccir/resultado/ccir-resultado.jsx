"use client"

import { useAmbiente } from "@/utils/AmbienteContext"
import moment from "moment/moment";
import ItemResultado from "./itemResultado";
import { useEffect } from "react";

const CCIRResultado = () => {

    const { dados, setDados } = useAmbiente();

    return (

        <div className="flex text-xs flex-col max-w-4xl m-auto border border-gray-200 p-3">
            {dados && dados.requisicao && dados.retorno &&
                <div>
                    <div className="font-Inter text-lg mt-5  mb-2 underline">Número de Inscrição consultado:</div>
                    <div className="font-bold">
                        {dados.requisicao.NumeroInscricao}
                    </div>

                    {dados.retorno &&
                        <div>
                            <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2"><div className="m-3 text-base font-bold underline">Informações:</div>
                                <div className="flex flex-wrap gap-2">
                                    <ItemResultado campo={'Área Certificada'} valor={dados.retorno.areaCertificada} />
                                    <ItemResultado campo={'Área Medida'} valor={dados.retorno.areaMedida} />
                                    <ItemResultado campo={'Área total Posse Justo Titulo'} valor={dados.retorno.totalAreaPosseJustoTitulo} />
                                    <ItemResultado campo={'Área total Posse Simples Ocupacao'} valor={dados.retorno.totalAreaPosseSimplesOcupacao} />
                                    <ItemResultado campo={'Área total Registrada'} valor={dados.retorno.totalAreaRegistrada} />
                                    <ItemResultado campo={'Módulo Fiscal'} valor={dados.retorno.areaModuloFiscal} />
                                    <ItemResultado campo={'Módulo Rural'} valor={dados.retorno.areaModuloRural} />
                                    <ItemResultado campo={'Área Total'} valor={dados.retorno.areaTotal} />

                                    <ItemResultado campo={'Pessoas Pessoas Relacionadas ao Imovel'} valor={dados.retorno.totalPessoasRelacionadasImovel} />
                                    <ItemResultado campo={'Classificação Fundiária'} valor={dados.retorno.classificacaoFundiaria} />
                                    <ItemResultado campo={'Código do Imovel Incra'} valor={dados.retorno.codigoImovelIncra} />

                                    <ItemResultado campo={'Dt.Process. (Última Declaração)'} valor={dados.retorno.dataProcessamentoUltimaDeclaracao} />
                                    <ItemResultado campo={'Denominação'} valor={dados.retorno.denominacao} />
                                    <ItemResultado campo={'Fração Mínima Parcelamento'} valor={dados.retorno.fracaoMinimaParcelamento} />
                                    <ItemResultado campo={'Indicações Localização'} valor={dados.retorno.indicacoesLocalizacao} />
                                    <ItemResultado campo={'Município Sede'} valor={dados.retorno.municipioSede} />
                                    <ItemResultado campo={'Número Módulos Fiscais'} valor={dados.retorno.numeroModulosFiscais} />
                                    <ItemResultado campo={'Número Módulos Rurais'} valor={dados.retorno.numeroModulosRurais} />
                                    <ItemResultado campo={'UF Sede'} valor={dados.retorno.ufSede} />

                                </div>
                            </div>

                            {dados.retorno.areasRegistradas &&
                                <div>
                                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2"><div className="m-3 text-base font-bold underline">Áreas Registradas:</div>
                                        <div className="flex flex-wrap gap-2">
                                            {dados.retorno.areasRegistradas.map((area, index) => (
                                                <>
                                                    <div className="font-Inter m-2">Livro/Ficha: {area.livroOuFicha}
                                                        <ItemResultado campo={'CNS Ou Ofício'} valor={area.cnsOuOficio} />
                                                        <ItemResultado campo={'Data de Registro'} valor={area.dataRegistro} />
                                                        <ItemResultado campo={'Área'} valor={area.area} />
                                                        <ItemResultado campo={'Matrícula Ou Transcrição'} valor={area.matriculaOuTranscricao} />
                                                        <ItemResultado campo={'Município Cartório'} valor={area.municipioCartorio} />
                                                        <ItemResultado campo={'Registro'} valor={area.registro} />
                                                        <ItemResultado campo={'UF Cartório'} valor={area.ufCartorio} />
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }

                            {dados.retorno.dadosUltimoCcir &&
                                <div>
                                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2"><div className="m-3 text-base font-bold underline">Dados do Último CCIR:</div>
                                        <div className="flex flex-wrap gap-2">
                                            <ItemResultado campo={'CNS Ou Ofício'} valor={dados.retorno.dadosUltimoCcir.situacaoCcir} />
                                            <ItemResultado campo={'CNS Ou Ofício'} valor={dados.retorno.dadosUltimoCcir.numeroAutenticidadeCcir} />
                                            <ItemResultado campo={'CNS Ou Ofício'} valor={dados.retorno.dadosUltimoCcir.dataGeracaoCcir} />
                                            <ItemResultado campo={'Data de Registro'} valor={dados.retorno.dadosUltimoCcir.dataLancamento} />
                                            <ItemResultado campo={'Livro Ou Ficha'} valor={dados.retorno.dadosUltimoCcir.dataVencimentoCcir} />
                                            <ItemResultado campo={'Matrícula Ou Transcrição'} valor={dados.retorno.dadosUltimoCcir.debitosAnteriores} />
                                            <ItemResultado campo={'Município Cartório'} valor={dados.retorno.dadosUltimoCcir.juros} />
                                            <ItemResultado campo={'Registro'} valor={dados.retorno.dadosUltimoCcir.multa} />
                                            <ItemResultado campo={'Registro'} valor={dados.retorno.dadosUltimoCcir.taxaServicosCadastrais} />
                                            <ItemResultado campo={'Registro'} valor={dados.retorno.dadosUltimoCcir.valorCobrado} />
                                            <ItemResultado campo={'Registro'} valor={dados.retorno.dadosUltimoCcir.valorTotal} />
                                        </div>
                                    </div>
                                </div>
                            }

                            {dados.retorno.titulares &&
                                <div>
                                    <div className="font-Inter mt-5 bg-slate-50 p-2"><div className="m-3 text-base font-bold underline">Titulares:</div>
                                        <div className="flex flex-wrap gap-2 p-2">
                                            {dados.retorno.titulares.map((titular, index) => (
                                                <>
                                                    <div className="font-Inter mb-2">
                                                        Titular: {titular.nomeTitular}
                                                        <ItemResultado campo={'CNS/Ofício'} valor={titular.condicaoTitularidade} />
                                                        <ItemResultado campo={'CPF/CNPJ'} valor={titular.cpfCnpj} />
                                                        <ItemResultado campo={'Declarante'} valor={titular.declarante} />
                                                        <ItemResultado campo={'Nacionalidade'} valor={titular.nacionalidade} />
                                                        <ItemResultado campo={'Percentual Detencao'} valor={titular.percentualDetencao} />
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default CCIRResultado