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
import ReactInputMask from 'react-input-mask';



const CNPJ = () => {
    const router = useRouter();
    const { setDados, creditos, consultas, user } = useAmbiente();
    const [open, setOpen] = useState(false);
    const [valorConsulta, setValorConsulta] = useState(0);
    const [temCredito, setTemCredito] = useState(false);
    const [consultando, setConsultando] = useState(false);

    const formVazio = {
        numeroInscricao: "",
        tipo: "basica",

    }

    const [formData, setFormData] = useState(formVazio);
    const [erroGeral, setErroGeral] = useState('')


    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const arrowStyle = { color: '#000' };

    const closeModal = () => {
        setFormData(formVazio);

        router.push('/')
    }

    

    const updateNestedState = (prevObj, keys, value) => {
        if (keys.length === 1) {
           
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

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        setFormData((prevFormData) => updateNestedState(prevFormData, keys, value));
    };

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

            const url = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/CNPJ`;
            try {
                setConsultando(true);
                
                const resposta = await enviaFormulario(formData, url, 'POST')
    
                setDados({
                    requisicao: formData,
                    retorno: JSON.parse(resposta).dados,
                    consulta: formData.tipo
                })
    
                router.push('/consultas/cnpj/resultado');

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

                        <div className=' flex'>

                            <div className="ml-3  w-[470px] relative">
                                <label htmlFor="numeroInscricao">{formData.tipo == 'inscricao' ? 'Número Inscrição:' : 'CPF / CNPJ'}</label>
                              
                                <ReactInputMask
                                    mask="99.999.999/9999-99"
                                    className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="item1TextBox"
                                    placeholder="00.000.000/0000-00"
                                    value={formData.numeroInscricao}
                                    onChange={(e) => handleInputChange('numeroInscricao', e.target.value  )}
                                    type="text"
                                />

                            </div>

                            <div className='ml-3 w-fit relative'>
                                <label htmlFor="tipo">Tipo:</label>
                                <select
                                    id="tipo"
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleSelectChange}
                                    required
                                >
                                    <option value='' disabled> </option>
                                    <option value='basica' > Básica</option>
                                    <option value='qsa' > QSA</option>
                                    <option value='empresa' > Empresa</option>

                                </select>
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

export default CNPJ