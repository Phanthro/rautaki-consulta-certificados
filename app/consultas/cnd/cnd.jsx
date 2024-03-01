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



const DividaAtiva = () => {
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
        tipoContribuinte: '',
        contribuinteConsulta: "",
        codigoIdentificacao: "",
        gerarCertidaoPdf: true

    }


    const [formData, setFormData] = useState(formVazio);
    const [erroGeral, setErroGeral] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
      
        if (name === 'tipoContribuinte') {
          const codigoIdentificacao = "900" + value;
          setFormData(prevState => ({
            ...prevState,
            [name]: value,
            codigoIdentificacao: codigoIdentificacao
          }));
        } else {
          // Para outros campos, atualize normalmente
          setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
          }));
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

            const url = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/CND`;
            try {
                setConsultando(true);

                
                const resposta = await enviaFormulario(formData, url, 'POST')

                setDados({
                    requisicao: formData,
                    retorno: JSON.parse(resposta).dados,
                    consulta: formData.tipo
                })

                router.push('/consultas/cnd/resultado');

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
            <span className='text-xs'>{JSON.stringify(formData)}</span>
            {creditos ?
                <div className='absolute right-20 md:right-40 m-[-20px]'>
                    <Creditos />
                </div> : ''
            }
            <div className=''>
                <form onSubmit={handleSubmit} className="p-2 bg-white fundo-cinza datavalid m-auto mt-10 w-3/4">

                    <div className='flex flex-col gap-5 justify-items-center mb-10'>

                        <div className='w-full border-b font-RobotoMono text-lg'> Dados</div>

                        <div className=' flex'>
                            


                            <div className='ml-3 w-fit relative'>
                                <label htmlFor="tipoContribuinte">Tipo de Contribuinte:</label>
                                <select
                                    id="tipoContribuinte"
                                    name="tipoContribuinte"
                                    value={formData.tipoContribuinte}
                                    onChange={handleChange}
                                    required
                                >
                                    <option disabled value=''>Selecione tipo de contribuinte</option>
                                    <option value='1'>1 - Pessoa Jurídica</option>
                                    <option value='2'>2 - Pessoa Física</option>
                                    <option value='3'>3 - Imóvel Rural</option>

                                </select>
                            </div>
                            <div className="ml-3 w-[470px] relative">
                                <label htmlFor="contribuinteConsulta">Contribuinte Consulta</label>
                                <input
                                    type="text"
                                    id="contribuinteConsulta"
                                    name="contribuinteConsulta"
                                    value={formData.contribuinteConsulta}
                                    onChange={handleChange}
                                    className=" p-2 w-full border"
                                    required
                                    maxLength={75}
                                />

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

export default DividaAtiva