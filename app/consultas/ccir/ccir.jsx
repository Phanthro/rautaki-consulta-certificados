"use client"
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import CadastroInfo from '@/app/componentes/cadastroInfo';
import pt from 'date-fns/locale/pt-BR';
import { useRouter } from 'next/navigation';

import 'react-datepicker/dist/react-datepicker.css';
import { enviaFormulario } from '@/app/componentes/enviarFormulario';
import { useAmbiente } from '@/utils/AmbienteContext';
import { obterConsulta } from '../obterConsultas';
import Creditos from '@/app/componentes/creditos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CCIR = () => {
    const router = useRouter();
    const { setDados, creditos, consultas, user } = useAmbiente();
    const [open, setOpen] = useState(false);
    const [valorConsulta, setValorConsulta] = useState(0);
    const [temCredito, setTemCredito] = useState(false);
    const [consultando, setConsultando] = useState(false);


    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const arrowStyle = { color: '#000' };

    const closeModal = () => {
        setFormData(formVazio);

        router.push('/')
    }

    const formVazio = {
        numeroInscricao: "",
        tipo: "CodigoImovel",

    }


    const [formData, setFormData] = useState(formVazio);
    const [erroGeral, setErroGeral] = useState('')

    const handleInputChange = (nome, valor) => {
        
        setFormData(prevState => ({
            ...prevState,
            [nome]: valor
          }));

    };

    const validateForm = () => {
        let isValid = true;

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErroGeral('')

        if (validateForm()) {

            const url = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/CCIR`;
            try {
                setConsultando(true);

                const resposta = await enviaFormulario(formData, url, 'POST')

                setDados({
                    requisicao: formData,
                    retorno: JSON.parse(resposta).dados,
                    consulta: formData.tipo
                })

                router.push('/consultas/ccir/resultado');

            } catch (error) {

                toast(error.message, {
                    hideProgressBar: true,
                    autoClose: false,
                    type: 'error'
                });

            }
            finally {
                setConsultando(false);
            }

        }
        else {
            console.log('erro no formulário');
            console.log(errors);
        }
    };

    useEffect(() => {

        const verificaCreditos = async (clienteId) => {
            // var res = await consultaCredito(clienteId)
            // setCreditos(JSON.parse(res))
            const consulta = await obterConsulta(100);

            if (!consulta) return;
            const saldo = creditos.dados;
            const custoConsulta = consulta.valor;
            setValorConsulta(custoConsulta)

            if (saldo >= custoConsulta) {
                setTemCredito(true)
            }
        }
        verificaCreditos(user.clienteId)

    }, [])


    return (
        <div className='p-10'>
            {creditos ?
                <div className='absolute right-20 md:right-40 m-[-20px]'>
                    <Creditos />
                </div> : ''
            }
            <div className=''>
                <form onSubmit={handleSubmit} className="p-2 bg-white fundo-cinza datavalid m-auto mt-10 w-3/4">

                    <div className='flex flex-col gap-5 justify-items-center mb-10'>

                        <div className='w-full border-b font-RobotoMono text-lg'> Dados</div>

                        <div className='flex flex-col items-center'>

                            <div className="ml-3  w-[470px] relative">
                                <label htmlFor="numeroInscricao">{formData.tipo == 'CodigoImovel' ? 'Código do Imóvel:' : 'Número Inscrição'}</label>
                                <input
                                    type="text"
                                    id="numeroInscricao"
                                    name="numeroInscricao"
                                    value={formData.numeroInscricao}
                                    onChange={(e)=>handleInputChange('numeroInscricao', e.target.value)}
                                    className=" p-2 w-full border "
                                    required
                                    maxLength={75}
                                />

                            </div>
                            <div className='ml-3 w-fit relative'>
                                <label>
                                    <input
                                        type="radio"
                                        value="CodigoImovel"
                                        checked={formData.tipo === 'CodigoImovel'}
                                        onChange={(e)=>handleInputChange('tipo', e.target.value)}
                                    /> Código imovel
                                </label>

                                <label className="ml-4">
                                    <input
                                        type="radio"
                                        value="NI"
                                        checked={formData.tipo === 'NI'}
                                        onChange={(e)=>handleInputChange('tipo', e.target.value)}
                                    /> CPF/CNPJ
                                </label>
                            </div>
                            
                        </div>


                        <div className='text-center'>
                            {creditos.dados >= valorConsulta ?
                                !consultando ?
                                    <button type="submit" className="bg-cor-tercearia hover:bg-verde text-white font-bold py-2 px-4 shadow-sombra w-[178px] h-[50px]">
                                        Consultar <div className='text-xs font-RobotoMono font-normal'>(R${valorConsulta.toFixed(2)})</div>
                                    </button>
                                    : <div>Consultando...</div>
                                :
                                <div>Créditos insuficiente.</div>
                            }
                        </div>
                    </div>

                    {erroGeral && <span className="text-red-500 text-sm">{erroGreal}</span>}
                </form>
            </div>


            <Popup open={open} onClose={closeModal} closeOnDocumentClick="false" closeOnEscape="false"
                {...{ modal: true, closeOnDocumentClick: false, lockScroll: true, overlayStyle, arrowStyle }}
            >
                <CadastroInfo closeModal={closeModal} />
            </Popup>

            {/* ******* TESTE : Visualizar json ********** */}
            <div className='fixed border top-0 right-[120px] w-[400px] h-fit bg-slate-200 hidden'>
                <pre className='text-sm'>{JSON.stringify(formData, null, 2)}</pre>
            </div>


            <ToastContainer
                position="bottom-center"
                autoClose={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
        </div>
    )

}

export default CCIR