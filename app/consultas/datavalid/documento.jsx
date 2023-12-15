"use client"
import React, { useEffect, useState } from 'react'
import InputMask from "react-input-mask";
import Popup from 'reactjs-popup';
import DatePicker, { registerLocale } from 'react-datepicker';
import CadastroInfo from '@/app/componentes/cadastroInfo';
import pt from 'date-fns/locale/pt-BR';
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/navigation';

import 'react-datepicker/dist/react-datepicker.css';
import { enviaFormulario } from '@/app/componentes/enviarFormulario';
import { useAmbiente } from '@/utils/AmbienteContext';
import { obterConsulta } from '../obterConsultas';

registerLocale('pt-BR', pt)


const Documento = () => {
    const router = useRouter();
    const {setDados, creditos, consultas} = useAmbiente();

    const [imagemCarregadaDocumento, setImagemCarregadaDocumento] = useState('')
    const [imagemCarregadaDocumento_verso, setImagemCarregadaDocumento_verso] = useState('')
    const [imagemCarregadaBiometria_face, setImagemCarregadaBiometria_face] = useState('')
    const [open, setOpen] = useState(false);
    const [valorConsulta, setValorConsulta] = useState(0);
    const [temCredito, setTemCredito] = useState(false);


    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const arrowStyle = { color: '#000' };
    const closeModal = () => {
        setFormData(formVazio);

        router.push('/')
    }

    const formVazio = {
        key: {
            cpf: ""
        },
        answer: {
            documento: {
                formato: "JPG",
                base64: ""
            },
            documento_verso: {
                formato: "JPG",
                base64: ""
            },
            biometria_face: {
                formato: "JPG",
                base64: ""
            }
        }
    }

    const [formData, setFormData] = useState(formVazio);
    
    const [erroGeral, setErroGeral] = useState('')

    const updateNestedState = (prevObj, keys, value) => {
        if (keys.length === 1) {
            if(keys[0] === 'possui_impedimento')
                value = value === "true"

            return {
                ...prevObj,
                [keys[0]]: value,
            };
        }

        const [currentKey, ...remainingKeys] = keys;
        return {
            ...prevObj,
            [currentKey]: updateNestedState(prevObj[currentKey] || {}, remainingKeys, value),
        };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        setFormData((prevFormData) => updateNestedState(prevFormData, keys, value));
    };

    const handleInputImageChange = (e) => {

        const { name, files } = e.target;

        const imageFile = files[0];

        if (imageFile) {
            // Leitura do arquivo como base64
            const reader = new FileReader();
            reader.onloadend = () => {

                
                const base64String = reader.result;
                const [formato, base64] = base64String.split(',');
                
                let formatoImagem = formato.split(';')[0].split('/')[1];
                
                if(formatoImagem === 'jpeg') formatoImagem = 'jpg'
                
                switch (name) {
                    case 'answer.documento.base64':

                        setImagemCarregadaDocumento(reader.result)

                        setFormData({
                            ...formData,
                            answer: {
                                ...formData['answer'],
                                documento: {
                                    formato: formatoImagem,
                                    base64: base64
                                }
                            },
                        });
                        
                        break;

                    case 'answer.documento_verso.base64':
                        setImagemCarregadaDocumento_verso(reader.result)

                        setFormData({
                            ...formData,
                            answer: {
                                ...formData['answer'],
                                documento_verso: {
                                    formato: formatoImagem,
                                    base64: base64
                                }
                            },
                        });
                        
                        break;

                    case 'answer.biometria_face.base64':
                        setImagemCarregadaBiometria_face(reader.result)

                        setFormData({
                            ...formData,
                            answer: {
                                ...formData['answer'],
                                biometria_face: {
                                    formato: formatoImagem,
                                    base64: base64
                                }
                            },
                        });
                        
                        break;
                
                
                    default:
                        break;
                }

            };
            reader.readAsDataURL(imageFile);
        }

    };

    const validateForm = () => {
        let isValid = true;
      
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErroGeral('')
        if (validateForm()) {

            // const url = `http://avaloncliente-clusterip-srv/v1/Cadastro`
            const url = `https://localhost:7150/v1/DataValid/ValidarIdentidade/documento`

            console.log('enviando formulário!')

            const resposta = await enviaFormulario(formData, url, 'POST')

            
            setDados({
                requisicao: formData,
                retorno: JSON.parse(resposta).dados,
                consulta: 'documento'
            })

            router.push('/consultas/datavalid/resultado')

        }
        else {
            console.log('erro no formulário');
            console.log(errors);
        }
    };

    const setExemplo = ()=>{

    }

    useEffect(()=>{

        const verificaCreditos = async ()=>{
            const consulta = await obterConsulta(100);

            if(!consulta) return;

            const saldo = creditos.dados;
            const custoConsulta = consulta.valor;
            setValorConsulta(custoConsulta)
            
            if(saldo >= custoConsulta){
                setTemCredito(true)
            }
        }
        verificaCreditos()

    },[creditos])


    return (
        <div className='p-10'>
            <button onClick={setExemplo}>Exemplo</button>
            <form onSubmit={handleSubmit} className="p-2 bg-white fundo-cinza datavalid m-auto mt-10">

                <div className='flex flex-wrap gap-5 justify-items-center mb-10'>
                
                    <div className='w-full border-b font-RobotoMono text-lg'> CPF:</div>

                    <div className="ml-3  w-[270px] relative">
                        <label htmlFor="key.cpf">CPF:</label>
                        <InputMask
                            mask="999.999.999-99"
                            id="key.cpf"
                            name="key.cpf"
                            type="text"
                            value={formData.key.cpf}
                            className=" p-2 w-full border "
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className='w-full border-b font-RobotoMono text-lg'> Frente do documento:</div>

                    <div className='ml-3 w-[475px] relative'>
                    <input 
                        type="file" 
                        name="answer.documento.base64" 
                        onChange={handleInputImageChange} 
                        accept="image/*" 
                        className='input-imagem '
                        />
                    </div>
                    {imagemCarregadaDocumento && (
                            <div>
                                <p>Imagem :</p>
                                <img src={imagemCarregadaDocumento} alt="Imagem carregada" style={{ width: '200px' }} />
                            </div>
                        )}

                    
                    <div className='w-full border-b font-RobotoMono text-lg'> Verso do documento:</div>

                    <div className='ml-3 w-[475px] relative'>
                    <input 
                        type="file" 
                        name="answer.documento_verso.base64" 
                        onChange={handleInputImageChange} 
                        accept="image/*" 
                        className='input-imagem '
                        />
                    </div>
                    {imagemCarregadaDocumento_verso && (
                            <div>
                                <p>Imagem :</p>
                                <img src={imagemCarregadaDocumento_verso} alt="Imagem carregada" style={{ width: '200px' }} />
                            </div>
                        )}
                    
                    <div className='w-full border-b font-RobotoMono text-lg'> Foto:</div>

                    <div className='ml-3 w-[475px] relative'>
                    <input 
                        type="file" 
                        name="answer.biometria_face.base64" 
                        onChange={handleInputImageChange} 
                        accept="image/*" 
                        className='input-imagem '
                        />
                    </div>
                    {imagemCarregadaBiometria_face && (
                            <div>
                                <p>Foto :</p>
                                <img src={imagemCarregadaBiometria_face} alt="Imagem carregada" style={{ width: '200px' }} />
                            </div>
                        )}

                </div>

                <div className='w-full text-center'>
                    {temCredito?
                    <button type="submit" className="bg-cor-principal hover:bg-verde text-white font-bold py-2 px-4 shadow-sombra w-[178px] h-[50px]">
                        Consultar <div className='text-xs font-RobotoMono font-normal'>(R${valorConsulta.toFixed(2)})</div>
                    </button>
                    :
                    <div>Créditos insuficiente.</div>
                    }
                </div>
                {erroGeral && <span className="text-red-500 text-sm">{erroGreal}</span>}
            </form>


            <Popup open={open} onClose={closeModal} closeOnDocumentClick="false" closeOnEscape="false"
                {...{ modal: true, closeOnDocumentClick: false, lockScroll: true, overlayStyle, arrowStyle }}
            >
                <CadastroInfo closeModal={closeModal} />
            </Popup>

            {/* ******* TESTE : Visualizar json ********** */}
            <div className='fixed border top-0 right-[120px] w-[400px] h-fit bg-slate-200 hidden'>
                <pre className='text-sm'>{JSON.stringify(formData, null, 2)}</pre>
            </div>
        </div>
    )

}

export default Documento