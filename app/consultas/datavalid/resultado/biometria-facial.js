"use client"

import { useAmbiente } from "@/utils/AmbienteContext"
import ItemResultado from "./itemResultado";
import moment from "moment/moment";
import { Genero } from "@/types/genero";
import { TipoDocumento } from "@/types/tipoDocumento";
import { Nacionalidade } from "@/types/nacionalidade";
import { situacaoCnh } from "@/types/situacaoCnh";
import { useEffect } from "react";

const BiometricaFacialResultado = () => {

    const { dados, setDados } = useAmbiente();

    const obterNomeEnum = (enumObj, valor) => {
        const nome = Object.keys(enumObj).find(key => enumObj[key] === valor);
        return nome || 'Não encontrado';
      };

    return (

        <div className="flex flex-col max-w-4xl m-auto border border-gray-200 p-3">
            {/* <pre>
                {dados && JSON.stringify(dados, null, 2)}
            </pre> */}
            {dados && dados.requisicao && dados.retorno && 
            <div>
            <div>
                <div className="flex">
                    {dados.requisicao.answer.biometria_face && (
                        <div>
                            <img src={`data:image/${dados.requisicao.answer.biometria_face.formato};base64, ${dados.requisicao.answer.biometria_face.base64}`} alt="Imagem carregada" style={{ width: '130px' }} />
                        </div>
                    )}
                    <div className="m-auto">
                <div className="font-RobotoMono text-lg">Biometrica Facil:</div>

                        <span className="text-xl font-RobotoMono">Probabilidade:</span>
                        <div className='p-2 text-blue-700 font-bold text-4xl'>{(dados.retorno.biometria_face.similaridade * 100).toFixed(2)}%</div>
                        <div> {dados.retorno.biometria_face.probabilidade} </div>
                    </div>
                </div>

            </div>


                <div className="font-RobotoMono text-lg mt-5  mb-2">Dados Pessoais:</div>
                {dados.retorno.cpf_disponivel &&
                    <div className="flex flex-wrap gap-2">
                        <ItemResultado campo={'Nome'} valor={dados.requisicao.answer.nome} ok={dados.retorno.nome} similaridade={dados.retorno.nome_similaridade} />
                        <ItemResultado campo={'Sexo'} valor={obterNomeEnum(Genero, dados.requisicao.answer.sexo)} ok={dados.retorno.sexo} />
                        <ItemResultado campo={'Data de Nascimento'} valor={moment(dados.requisicao.answer.data_nascimento).format('DD/MM/YYYY')} ok={dados.retorno.data_nascimento} />
                        <ItemResultado campo={'Situação do CPF'} valor={dados.requisicao.answer.situacao_cpf} ok={dados.retorno.situacao_cpf} />
                        <ItemResultado campo={'Nacionalidade'} valor={obterNomeEnum(Nacionalidade, dados.requisicao.answer.nacionalidade*1)} ok={dados.retorno.nacionalidade} />
                    </div>
                }

                <div className="font-RobotoMono text-lg mt-5  mb-2">Filiação:</div>
                {dados.retorno.filiacao &&
                    <div className="flex flex-wrap gap-2">
                        <ItemResultado campo={'Nome do Mãe'} valor={dados.requisicao.answer.filiacao.nome_mae} ok={dados.retorno.filiacao.nome_mae} similaridade={dados.retorno.filiacao.nome_mae_similaridade} />
                        <ItemResultado campo={'Nome do Pai'} valor={dados.requisicao.answer.filiacao.nome_pai} ok={dados.retorno.filiacao.nome_pai} similaridade={dados.retorno.filiacao.nome_pai} />
                    </div>
                }

                <div className="font-RobotoMono text-lg mt-5  mb-2">Documento:</div>
                {dados.retorno.documento &&
                    <div className="flex flex-wrap gap-2">
                        <ItemResultado campo={'Tipo'} valor={obterNomeEnum(TipoDocumento, dados.requisicao.answer.documento.tipo*1)} ok={dados.retorno.documento.tipo} />
                        <ItemResultado campo={'Número'} valor={dados.requisicao.answer.documento.numero} ok={dados.retorno.documento.numero} similaridade={dados.retorno.documento.numero_similaridade} />
                        <ItemResultado campo={'Orgão Expedidor'} valor={dados.requisicao.answer.documento.orgao_expedidor} ok={dados.retorno.documento.orgao_expedidor} />
                        <ItemResultado campo={'UF Expedidor'} valor={dados.requisicao.answer.documento.uf_expedidor} ok={dados.retorno.documento.uf_expedidor} />
                    </div>
                }

                <div className="font-RobotoMono text-lg mt-5  mb-2">Endereço:</div>
                {dados.retorno.endereco &&
                    <div className="flex flex-wrap gap-2">
                        <ItemResultado campo={'Logradouro'} valor={dados.requisicao.answer.endereco.logradouro} ok={dados.retorno.endereco.logradouro} similaridade={dados.retorno.endereco.logradouro_similaridade} />
                        <ItemResultado campo={'Número'} valor={dados.requisicao.answer.endereco.numero} ok={dados.retorno.endereco.numero} similaridade={dados.retorno.endereco.numero_similaridade} />
                        <ItemResultado campo={'Complemento'} valor={dados.requisicao.answer.endereco.complemento} ok={true} />
                        <ItemResultado campo={'Bairro'} valor={dados.requisicao.answer.endereco.bairro} ok={dados.retorno.endereco.bairro} similaridade={dados.retorno.endereco.bairro_similaridade} />
                        <ItemResultado campo={'CEP'} valor={dados.requisicao.answer.endereco.cep} ok={dados.retorno.endereco.cep} />
                        <ItemResultado campo={'Município'} valor={dados.requisicao.answer.endereco.municipio} ok={dados.retorno.endereco.municipio} similaridade={dados.retorno.endereco.municipio_similaridade} />
                        <ItemResultado campo={'UF'} valor={dados.requisicao.answer.endereco.uf} ok={dados.retorno.endereco.uf} />
                    </div>
                }

                <div className="font-RobotoMono text-lg mt-5  mb-2">CNH:</div>
                {dados.retorno.cnh &&
                    <div className="flex flex-wrap gap-2">
                        <ItemResultado campo={'Nome'} valor={dados.requisicao.answer.nome} ok={dados.retorno.cnh.nome} similaridade={dados.retorno.cnh.nome_similaridade} />
                        <ItemResultado campo={'Categoria'} valor={dados.requisicao.answer.cnh.categoria} ok={dados.retorno.cnh.categoria} />
                        <ItemResultado campo={'Observações'} valor={dados.requisicao.answer.cnh.observacoes} ok={dados.retorno.cnh.observacoes} similaridade={0} />
                        <ItemResultado campo={'Número Registro'} valor={dados.requisicao.answer.cnh.numero_registro} ok={dados.retorno.cnh.numero_registro} />
                        <ItemResultado campo={'Data Primeira Habilitação'} valor={moment(dados.requisicao.answer.cnh.data_primeira_habilitacao).format('DD/MM/YYYY')} ok={dados.retorno.cnh.data_primeira_habilitacao} />
                        <ItemResultado campo={'Data Válidade'} valor={moment(dados.requisicao.answer.cnh.data_validade).format('DD/MM/YYYY')} ok={dados.retorno.cnh.data_validade} />
                        <ItemResultado campo={'Registro Nacional Estrangeiro'} valor={dados.requisicao.answer.cnh.registro_nacional_estrangeiro} ok={dados.retorno.cnh.registro_nacional_estrangeiro} />
                        <ItemResultado campo={'Data da Última Emissão'} valor={moment(dados.requisicao.answer.cnh.data_ultima_emissao).format('DD/MM/YYYY')} ok={dados.retorno.cnh.data_ultima_emissao} />
                        <ItemResultado campo={'Situacao'} valor={obterNomeEnum(situacaoCnh, dados.requisicao.answer.cnh.codigo_situacao*1)} ok={dados.retorno.cnh.codigo_situacao} />
                        <ItemResultado campo={'Possui Impedimento'} valor={dados.requisicao.answer.cnh.possui_impedimento?'Sim':'Não'} ok={dados.retorno.cnh.possui_impedimento} />
                    </div>
                }
            </div>
            }
        </div>
    )
}

export default BiometricaFacialResultado