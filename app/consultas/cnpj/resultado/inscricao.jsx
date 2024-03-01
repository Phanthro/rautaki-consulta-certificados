"use client"

import { useAmbiente } from "@/utils/AmbienteContext"
import moment from "moment/moment";
import ItemResultado from "./itemResultado";
import { useEffect } from "react";

const InscricaoResultado = () => {

    const { dados, setDados } = useAmbiente();

    return (

        <div className="flex flex-col max-w-4xl m-auto border border-gray-200 p-3 text-xs">
        
            {dados && dados.requisicao && dados.retorno &&
                <div>
                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2 flex">
                        <div className="m-3 font-bold underline">Número de Inscrição consultado:</div>
                        <div className="font-bold m-4">
                            {dados.retorno.ni}
                        </div>
                    </div>


                    {dados.retorno &&
                        <div>
                            <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2">Informações:
                                <div className="flex flex-wrap gap-2">
                                    <ItemResultado campo={'Tipo de Estabelecimento'} valor={dados.retorno.tipoEstabelecimento} />
                                    <ItemResultado campo={'Nome Empresarial'} valor={dados.retorno.nomeEmpresarial} />
                                    <ItemResultado campo={'Nome Fantasia'} valor={dados.retorno.nomeFantasia} />

                                    <ItemResultado campo={'Data de Abertura'} valor={dados.retorno.dataAbertura} />

                                    <ItemResultado campo={'Correio Eletrônico'} valor={dados.retorno.correioEletronico} />
                                    <ItemResultado campo={'Capital Social'} valor={dados.retorno.capitalSocial} />
                                    <ItemResultado campo={'Porte'} valor={dados.retorno.porte} />
                                    <ItemResultado campo={'Situacao Especial'} valor={dados.retorno.situacaoEspecial} />
                                    <ItemResultado campo={'Data Situacao Especial'} valor={dados.retorno.dataSituacaoEspecial} />

                                </div>
                            </div>

                            {dados.retorno.situacaoCadastral &&
                                <div>
                                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2">Situação cadastral:
                                        <div className="flex flex-wrap gap-2">
                                            <ItemResultado campo={'Código'} valor={dados.retorno.situacaoCadastral.codigo} />
                                            <ItemResultado campo={'Data'} valor={dados.retorno.situacaoCadastral.data} />
                                            <ItemResultado campo={'Motivo'} valor={dados.retorno.situacaoCadastral.motivo} />
                                        </div>
                                    </div>
                                </div>
                            }

                            {dados.retorno.naturezaJuridica &&
                                <div>
                                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2">Natureza Jurídica:
                                        <div className="flex flex-wrap gap-2">
                                            <ItemResultado campo={'Código'} valor={dados.retorno.naturezaJuridica.codigo} />
                                            <ItemResultado campo={'Data'} valor={dados.retorno.naturezaJuridica.descricao} />
                                        </div>
                                    </div>
                                </div>
                            }

                            {dados.retorno.cnaePrincipal &&
                                <div>
                                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2">CNAE Principal:
                                        <div className="flex flex-wrap gap-2">
                                            <ItemResultado campo={'Código'} valor={dados.retorno.cnaePrincipal.codigo} />
                                            <ItemResultado campo={'Data'} valor={dados.retorno.cnaePrincipal.descricao} />
                                        </div>
                                    </div>
                                </div>
                            }

                            {dados.retorno.cnaeSecundarias &&
                                <div>
                                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2">CNAE Secundarias:
                                        <div className="flex flex-wrap gap-2">
                                            <ItemResultado campo={'Código'} valor={dados.retorno.cnaeSecundarias.codigo} />
                                            <ItemResultado campo={'Data'} valor={dados.retorno.cnaeSecundarias.descricao} />
                                        </div>
                                    </div>
                                </div>
                            }

                            {dados.retorno.endereco &&
                                <div>
                                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2">Endereco:
                                        <div className="flex flex-wrap gap-2">
                                            <ItemResultado campo={'Tipo lograd.'} valor={dados.retorno.endereco.tipoLogradouro} />
                                            <ItemResultado campo={'Logradouro'} valor={dados.retorno.endereco.logradouro} />
                                            <ItemResultado campo={'Número'} valor={dados.retorno.endereco.numero} />
                                            <ItemResultado campo={'Complemento'} valor={dados.retorno.endereco.complemento} />
                                            <ItemResultado campo={'CEP'} valor={dados.retorno.endereco.cep} />
                                            <ItemResultado campo={'Bairro'} valor={dados.retorno.endereco.bairro} />
                                            <ItemResultado campo={'Município'} valor={dados.retorno.endereco.municipio.descricao} />
                                            <ItemResultado campo={'Município(Jurisdição)'} valor={dados.retorno.municipioJurisdicao.descricao} />
                                            <ItemResultado campo={'UF'} valor={dados.retorno.endereco.uf} />
                                            <ItemResultado campo={'Pais'} valor={dados.retorno.endereco.pais.descricao} />
                                        </div>
                                    </div>
                                </div>
                            }

                            {dados.retorno.telefones &&
                                <div>
                                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2">Telefones:
                                        <div className="flex flex-wrap gap-2">
                                            {dados.retorno.telefones.map((tel, index) => (
                                                <>
                                                    <ItemResultado campo={`Telefone ${index + 1}`} valor={`(${tel.ddd})${tel.numero}`} />
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }

                            {dados.retorno.informacoesAdicionais &&
                                <div>
                                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2">Informacoes Adicionais:
                                        <div className="flex flex-wrap gap-2">
                                            <ItemResultado campo={'Optante Simples'} valor={dados.retorno.informacoesAdicionais.optanteSimples} />
                                            <ItemResultado campo={'Optante Mei'} valor={dados.retorno.informacoesAdicionais.optanteMei} />
                                            <div>
                                                <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2">Lista Periodo Simples:</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {dados.retorno.informacoesAdicionais.listaPeriodoSimples.map((data, index) => (
                                                        <>
                                                            <ItemResultado campo={'Data Início'} valor={data.dataInicio} />
                                                            <ItemResultado campo={'Data Fim'} valor={data.dataFim} />
                                                        </>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            }

                            {dados.retorno.socios && dados.retorno.socios.length > 0 &&
                                <div>
                                    <div className="font-Inter mt-5 mb-2 bg-slate-50 p-2 text-xs">Sócios:
                                        <div className="flex flex-wrap gap-2">
                                            {dados.retorno.socios.map((socio, index) => (
                                                <>
                                                    <div className="mt-5  mb-2">Sócio:
                                                        <ItemResultado campo={'Tipo de Sócio'} valor={socio.tipoSocio} />
                                                        <ItemResultado campo={'Nome'} valor={socio.tipoSocio} />
                                                        <ItemResultado campo={'Qualificação'} valor={socio.qualificacao} />
                                                        <ItemResultado campo={'País'} valor={socio.pais.descrição} />
                                                        <ItemResultado campo={'Representante Legal'} valor={`${socio.representanteLegal.nome} (${socio.representanteLegal.qualificacao})`} />
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

export default InscricaoResultado