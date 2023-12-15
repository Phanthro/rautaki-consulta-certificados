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


const DividaAtiva = () => {
    const router = useRouter();
    const { setDados, creditos, consultas } = useAmbiente();

    const [valorConsulta, setValorConsulta] = useState(0);
    const [temCredito, setTemCredito] = useState(false);


    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const arrowStyle = { color: '#000' };

    const closeModal = () => {
        setFormData(formVazio);

        router.push('/')
    }

    const formVazio = {
        numeroInscricao: "",
        tipo: "inscricao",

    }


    const [formData, setFormData] = useState(formVazio);
    const [erroGeral, setErroGeral] = useState('')

    const updateNestedState = (prevObj, keys, value) => {
        if (keys.length === 1) {
            if (keys[0] === 'possui_impedimento')
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

    const validateForm = () => {
        let isValid = true;

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErroGeral('')
        if (validateForm()) {

            // const url = `http://avaloncliente-clusterip-srv/v1/Cadastro`
            const url = `https://localhost:7150/v1/DividaAtiva`

            console.log('enviando formulário!')

            const resposta = await enviaFormulario(formData, url, 'POST')


            setDados({
                requisicao: formData,
                retorno: JSON.parse(resposta),
                consulta: formData.tipo
            })

            router.push('/consultas/divida-ativa/resultado')

        }
        else {
            console.log('erro no formulário');
            console.log(errors);
        }
    };

    useEffect(() => {

        const verificaCreditos = async () => {
            const consulta = await obterConsulta(200);

            if (!consulta) return;

            const saldo = creditos.dados;
            const custoConsulta = consulta.valor;
            setValorConsulta(custoConsulta)

            if (saldo >= custoConsulta) {
                setTemCredito(true)
            }
        }
        verificaCreditos()

    }, [creditos])


    return (
        <div className='p-10'>
            
            <form onSubmit={handleSubmit} className="p-2 bg-white fundo-cinza datavalid m-auto mt-10">

                <div className='flex flex-wrap gap-5 justify-items-center mb-10'>

                    <div className='w-full border-b font-RobotoMono text-lg'> Dados</div>

                    <div className="ml-3  w-[470px] relative">
                        <label htmlFor="answer.nome">{formData.tipo == 'inscricao'? 'Número Inscrição:' : 'CPF / CNPJ'}</label>
                        <input
                            type="text"
                            id="numeroInscricao"
                            name="numeroInscricao"
                            value={formData.numeroInscricao}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={75}
                        />
                        
                    </div>

                    <div className='ml-3 w-fit relative'>
                        <label htmlFor="answer.nacionalidade">Tipo:</label>
                        <select
                            id="tipo"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleInputChange}
                            required
                        >
                            <option value='' disabled> </option>
                            <option value='inscricao' > Inscrição</option>
                            <option value='devedor' > Devedor</option>

                        </select>
                    </div>

                <div className='text-center'>
                    {temCredito ?
                        <button type="submit" className="bg-cor-principal hover:bg-verde text-white font-bold p-2 shadow-sombra w-[178px] h-[60px]">
                            Consultar <div className='text-xs font-RobotoMono font-normal'>(R${valorConsulta.toFixed(2)})</div>
                        </button>
                        :
                        <div>Créditos insuficiente.</div>
                    }
                </div>
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

export default DividaAtiva