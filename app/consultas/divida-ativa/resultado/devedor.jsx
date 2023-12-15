"use client"

import { useAmbiente } from "@/utils/AmbienteContext"
import ItemResultado from "./itemResultado";
import moment from "moment/moment";

const DevedorResultado = () => {

    const { dados, setDados } = useAmbiente();
    
    const obterNomeEnum = (enumObj, valor) => {
        const nome = Object.keys(enumObj).find(key => enumObj[key] === valor);
        return nome || 'Não encontrado';
    };

    return (

        <div className="flex flex-col max-w-4xl m-auto border border-gray-200 p-3">
            {dados && dados.requisicao && dados.retorno &&
                <div>
                    <div>
                        <div className="flex">
                            {dados.requisicao.answer.biometria_face && (
                                <div className="">
                                    <img src={`data:image/${dados.requisicao.answer.biometria_face.formato};base64, ${dados.requisicao.answer.biometria_face.base64}`} alt="Imagem carregada" style={{ width: '130px' }} />
                                </div>
                            )}
                            <div className="p-3 border">
                                <div className="font-RobotoMono text-lg">Biometrica Facil:</div>

                                <span className="text-xl font-RobotoMono">Probabilidade:</span>
                                <div className='p-2 text-blue-700 font-bold text-4xl'>{(dados.retorno.biometria_face.similaridade * 100).toFixed(2)}%</div>
                                <div> {dados.retorno.biometria_face.probabilidade} </div>
                            </div>
                        </div>

                    </div>


                    <div className="font-RobotoMono text-lg mt-5  mb-2">Documento:</div>
                    <div className="flex">
                        <div>
                            {dados.requisicao.answer.documento && (
                                    <div className="">
                                        <img src={`data:image/${dados.requisicao.answer.documento.formato};base64, ${dados.requisicao.answer.documento.base64}`} alt="Imagem carregada" style={{ width: '230px' }} />
                                    </div>
                                )}                        
                        </div>
                        <div>
                            {dados.requisicao.answer.documento_verso && (
                                    <div className="">
                                        <img src={`data:image/${dados.requisicao.answer.documento_verso.formato};base64, ${dados.requisicao.answer.documento_verso.base64}`} alt="Imagem carregada" style={{ width: '230px' }} />
                                    </div>
                                )}                        
                        </div>
                    </div>

                    <div className="font-RobotoMono text-lg mt-5  mb-2">CNH:</div>
                    {dados.retorno.cnh &&
                        <div className="flex flex-wrap gap-2">
                            <ItemResultado campo={'Número Registro'} valor={dados.retorno.cnh.numero_registro_ocr} ok={dados.retorno.cnh.numero_registro} />
                            <ItemResultado campo={'Nome'} valor={dados.retorno.cnh.nome_ocr} ok={dados.retorno.cnh.nome} similaridade={dados.retorno.cnh.nome_similaridade} />
                            <ItemResultado campo={'Identidade'} valor={dados.retorno.cnh.identidade_ocr} ok={dados.retorno.cnh.identidade} similaridade={dados.retorno.cnh.identidade_similaridade} />
                            <ItemResultado campo={'Data de Nascimento'} valor={moment(dados.retorno.cnh.data_nascimento_ocr).format('DD/MM/YYYY')} ok={dados.retorno.cnh.data_nascimento} />
                            <ItemResultado campo={'Data Primeira Habilitação'} valor={moment(dados.retorno.cnh.data_primeira_habilitacao_ocr).format('DD/MM/YYYY')} ok={dados.retorno.cnh.data_primeira_habilitacao} />
                            <ItemResultado campo={'Data da Última Emissão'} valor={moment(dados.retorno.cnh.data_ultima_emissao_ocr).format('DD/MM/YYYY')} ok={dados.retorno.cnh.data_ultima_emissao} />
                            <ItemResultado campo={'Data Válidade'} valor={moment(dados.retorno.cnh.data_validade_ocr).format('DD/MM/YYYY')} ok={dados.retorno.cnh.data_validade} />
                            
                            <ItemResultado campo={'Retrato'} valor={dados.retorno.cnh.retrato.probabilidade} ok={dados.retorno.cnh.retrato.disponivel} similaridade={dados.retorno.cnh.retrato.similaridade} />
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default DevedorResultado