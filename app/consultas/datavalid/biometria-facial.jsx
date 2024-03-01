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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Creditos from '@/app/componentes/creditos';
import { consultaCredito } from '@/app/componentes/consultaCredito';

registerLocale('pt-BR', pt)


const BiometriaFacial = () => {
    const router = useRouter();
    const { setDados, creditos, consultas, user, setCreditos } = useAmbiente();

    const [imagemCarregada, setImagemCarregada] = useState('')
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
        key: {
            cpf: ""
        },
        answer: {
            nome: "",
            sexo: "",
            nacionalidade: "",
            data_nascimento: null,
            situacao_cpf: "",
            filiacao: {
                nome_mae: "",
                nome_pai: ""
            },
            documento: {
                tipo: "",
                numero: "",
                orgao_expedidor: "",
                uf_expedidor: ""
            },
            endereco: {
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cep: "",
                municipio: "",
                uf: ""
            },
            cnh: {
                categoria: "",
                observacoes: "",
                numero_registro: "",
                data_primeira_habilitacao: null,
                data_validade: null,
                registro_nacional_estrangeiro: "",
                data_ultima_emissao: null,
                codigo_situacao: "",
                possui_impedimento: ""
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

    const handleInputImageChange = (e) => {

        const { name, files } = e.target;

        const imageFile = files[0];

        if (imageFile) {
            const tamanhoMaximoEmMB = 1;
            const tamanhoMaximoEmBytes = tamanhoMaximoEmMB * 1024 * 1024;

            if (imageFile.size > tamanhoMaximoEmBytes) {
                alert(`A imagem deve ter no máximo ${tamanhoMaximoEmMB} MB.`);
                // Resetar o controle de input
                e.target.value = null;
                setImagemCarregada(null);
                return;
            }


            // Leitura do arquivo como base64
            const reader = new FileReader();
            reader.onloadend = () => {

                setImagemCarregada(reader.result)

                const base64String = reader.result;
                const [formato, base64] = base64String.split(',');

                let formatoImagem = formato.split(';')[0].split('/')[1];

                if (formatoImagem === 'jpeg') formatoImagem = 'jpg'


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


            };
            reader.readAsDataURL(imageFile);
        }

    };

    const handleInputDateChange = (date) => {

        setFormData({
            ...formData,
            answer: {
                ...formData['answer'],
                data_nascimento: date
            },
        });
    };

    const handleInputCnhDateChange = (name, value) => {

        const e = {
            target: {
                name: name,
                value: value
            }
        }
        handleInputChange(e)
    };

    const validateForm = () => {
        let isValid = true;

        return isValid;
    };

    const consultaCEP = async (e) => {

        const cepUrl = `https://viacep.com.br/ws/${formData.answer.endereco.cep}/json/`

        const cepretorno = await (await fetch(cepUrl)).json()
        if (!cepretorno.erro) {
            setFormData({
                ...formData,
                answer: {
                    ...formData['answer'],
                    endereco: {
                        ...formData['endereco'],
                        logradouro: cepretorno.logradouro,
                        complemento: cepretorno.complemento,
                        bairro: cepretorno.bairro,
                        cep: cepretorno.cep,
                        municipio: cepretorno.localidade,
                        uf: cepretorno.uf,
                    }
                },
            });
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErroGeral('')
        if (validateForm()) {

            const url = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/DataValid/ValidarIdentidade/facial`

            try {
                
                setConsultando(true);

                const resposta = await enviaFormulario(formData, url, 'POST')
                setDados({
                    requisicao: formData,
                    retorno: JSON.parse(resposta).dados,
                    consulta: 'facial'
                })
                router.push('/consultas/datavalid/resultado')

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

    const setExemplo = () => {

        setFormData({
            "key": {
                "cpf": "257.744.350-16"
            },
            "answer": {
                "nome": "Manuela Elisa da Mota",
                "sexo": "F",
                "nacionalidade": "1",

                "situacao_cpf": "regular",
                "filiacao": {
                    "nome_mae": "Simone Carla da Mota",
                    "nome_pai": "Roberto Bruno da Mota"
                },
                "documento": {
                    "tipo": "1",
                    "numero": "123456789",
                    "orgao_expedidor": "SSP",
                    "uf_expedidor": "SP"
                },
                "endereco": {
                    "logradouro": "Rua Olívia Guedes Penteado",
                    "complemento": "941",
                    "bairro": "Socorro",
                    "cep": "04766-900",
                    "municipio": "São Paulo",
                    "uf": "SP",
                    "numero": "941"
                },
                "cnh": {
                    "categoria": "B",
                    "observacoes": "EAR",
                    "numero_registro": "987654321",
                    "registro_nacional_estrangeiro": "-",
                    "codigo_situacao": "3",
                    "possui_impedimento": true
                },
                "biometria_face": {
                    "formato": "jpg",
                    "base64": ""
                }
            }
        })

    }

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
            <button onClick={setExemplo}>Exemplo</button>
            <form onSubmit={handleSubmit} className="p-2 bg-white fundo-cinza datavalid m-auto mt-10">

                <div className='flex flex-wrap gap-5 justify-items-center mb-10'>

                    <div className='w-full border-b font-RobotoMono text-lg'> Dados Pessoais</div>

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

                    <div className="ml-3  w-[470px] relative">
                        <label htmlFor="answer.nome">Nome completo:</label>
                        <input
                            type="text"
                            id="answer.nome"
                            name="answer.nome"
                            value={formData.answer.nome}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={75}
                        />
                        {/* {errors.answer.nome && <span className="text-red-500 text-sm">{errors.answer.nome}</span>} */}
                    </div>

                    <div className='ml-3 w-fit relative'>
                        <label htmlFor="answer.sexo">Sexo:</label>
                        <select
                            id="answer.sexo"
                            name="answer.sexo"
                            value={formData.answer.sexo}
                            onChange={handleInputChange}
                            className=""
                            required
                        >
                            <option value='' disabled></option>
                            <option value='M' >Masculino</option>
                            <option value='F' >Feminino</option>

                        </select>
                    </div>

                    <div className='ml-3 w-fit relative'>
                        <label htmlFor="answer.nacionalidade">Nacionalidade:</label>
                        <select
                            id="answer.nacionalidade"
                            name="answer.nacionalidade"
                            value={formData.answer.nacionalidade}
                            onChange={handleInputChange}
                            required
                        >
                            <option value='' disabled> </option>
                            <option value='1' > Brasileiro</option>
                            <option value='2' > Brasileiro Naturalizado</option>
                            <option value='3' > Estrangeiro</option>
                            <option value='4' > Brasileiro Nascido no Exterior</option>

                        </select>
                    </div>

                    <div className="ml-3 w-[220px] relative">
                        <label htmlFor="answer.data_nascimento">Data de Nascimento:</label>
                        <DatePicker
                            id='answer.data_nascimento'
                            name='answer.data_nascimento'
                            locale="pt-BR"
                            selected={formData.answer.data_nascimento}
                            onChange={date => handleInputDateChange(date)}
                            className=" p-2 w-full border "
                            dateFormat="dd/MM/yyyy"
                            required
                        />
                        {/* {errors.answer.data_nascimento && <span className="text-red-500 text-sm">{errors.answer.data_nascimento}</span>} */}
                    </div>

                    <div className='ml-3 w-fit relative'>
                        <label htmlFor="answer.situacao_cpf">Situacao do CPF:</label>
                        <select
                            id="answer.situacao_cpf"
                            name="answer.situacao_cpf"
                            value={formData.answer.situacao_cpf}
                            onChange={handleInputChange}
                        >
                            <option value='' disabled></option>
                            <option value='regular' > Regular</option>
                            <option value='suspensa' > Suspensa</option>
                            <option value='titular falecido' > Titular falecido</option>
                            <option value='Pendente de regularização' > Pendente de regularização</option>
                            <option value='Cancelada por multiplicidade' > Cancelada por multiplicidade</option>
                            <option value='nula' > Nula</option>
                            <option value='cancelada de oficio' > Cancelada de oficio</option>

                        </select>
                    </div>

                    <div className='w-full border-b font-RobotoMono text-lg'> Filiação:</div>


                    <div className="ml-3  w-[470px] relative">
                        <label htmlFor="answer.filiacao.nome_pai">Nome do Pai:</label>
                        <input
                            type="text"
                            id="answer.filiacao.nome_pai"
                            name="answer.filiacao.nome_pai"
                            value={formData.answer.filiacao.nome_pai}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={75}
                        />
                        {/* {errors.answer.filiacao.nome_pai && <span className="text-red-500 text-sm">{errors.answer.filiacao.nome_pai}</span>} */}
                    </div>

                    <div className="ml-3  w-[470px] relative">
                        <label htmlFor="answer.filiacao.nome_mae">Nome do Mãe:</label>
                        <input
                            type="text"
                            id="answer.filiacao.nome_mae"
                            name="answer.filiacao.nome_mae"
                            value={formData.answer.filiacao.nome_mae}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={75}
                        />
                        {/* {errors.answer.filiacao.nome_mae && <span className="text-red-500 text-sm">{errors.answer.filiacao.nome_mae}</span>} */}
                    </div>

                    <div className='w-full border-b font-RobotoMono text-lg'> Documento:</div>


                    <div className='ml-3 w-fit relative'>
                        <label htmlFor="answer.documento.tipo">Tipo de Documento:</label>
                        <select
                            id="answer.documento.tipo"
                            name="answer.documento.tipo"
                            value={formData.answer.documento.tipo}
                            onChange={handleInputChange}
                            className="primeiro-item-cinza"
                            required
                        >
                            <option value=''></option>
                            <option value='1' > Carteira de identidade</option>
                            <option value='2' > Carteira profissional</option>
                            <option value='3' > Passaporte</option>
                            <option value='4' > Carteira de reservista</option>

                        </select>
                    </div>

                    <div className="ml-3  w-[270px] relative">
                        <label htmlFor="answer.documento.numero">Número de Documento:</label>
                        <input
                            type="text"
                            id="answer.documento.numero"
                            name="answer.documento.numero"
                            value={formData.answer.documento.numero}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={30}
                        />
                        {/* {errors.answer.documento.numero && <span className="text-red-500 text-sm">{errors.answer.documento.numero}</span>} */}
                    </div>

                    <div className="ml-3 w-[170px] relative">
                        <label htmlFor="answer.documento.orgao_expedidor">Órgão Expedidor:</label>
                        <input
                            type="text"
                            id="answer.documento.orgao_expedidor"
                            name="answer.documento.orgao_expedidor"
                            value={formData.answer.documento.orgao_expedidor}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={10}
                        />
                        {/* {errors.answer.documento.orgao_expedidor && <span className="text-red-500 text-sm">{errors.answer.documento.orgao_expedidor}</span>} */}
                    </div>

                    <div className="ml-3 w-[170px] relative">
                        <label htmlFor="answer.documento.uf_expedidor">UF Expedidor:</label>
                        <input
                            type="text"
                            id="answer.documento.uf_expedidor"
                            name="answer.documento.uf_expedidor"
                            value={formData.answer.documento.uf_expedidor}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={50}
                        />
                        {/* {errors.answer.documento.uf_expedidor && <span className="text-red-500 text-sm">{errors.answer.documento.uf_expedidor}</span>} */}
                    </div>

                    <div className='w-full border-b font-RobotoMono text-lg'> Endereço:</div>


                    <div className="ml-3 w-[230px] relative">
                        <label htmlFor="answer.endereco.cep">CEP:</label>
                        <InputMask
                            mask="99999-999"
                            type="text"
                            id="answer.endereco.cep"
                            name="answer.endereco.cep"
                            value={formData.answer.endereco.cep}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                        />
                        <a tabIndex="0" className="bg-cor-principal h-full w-[50px] text-white px-2 py-1 absolute right-0 cursor-pointer" onClick={consultaCEP}>
                            <SearchIcon className=" text-white mt-[10px]" />
                        </a>

                        {/* {errors.answer.endereco.cep && <span className="text-red-500 text-sm">{errors.answer.endereco.cep}</span>} */}
                    </div>

                    <div className="ml-3  w-[350px] relative">
                        <label htmlFor="answer.endereco.bairro">Bairro:</label>
                        <input
                            type="text"
                            id="answer.endereco.bairro"
                            name="answer.endereco.bairro"
                            value={formData.answer.endereco.bairro}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={40}
                        />
                        {/* {errors.answer.endereco.bairro && <span className="text-red-500 text-sm">{errors.answer.endereco.bairro}</span>} */}
                    </div>

                    <div className="ml-3 w-[708px] relative">
                        <label htmlFor="answer.endereco.logradouro">Logradouro:</label>
                        <input
                            type="text"
                            id="answer.endereco.logradouro"
                            name="answer.endereco.logradouro"
                            value={formData.answer.endereco.logradouro}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={75}
                        />
                        {/* {errors.answer.endereco.logradouro && <span className="text-red-500 text-sm">{errors.answer.endereco.logradouro}</span>} */}
                    </div>

                    <div className="ml-3 w-[150px] relative">
                        <label htmlFor="answer.endereco.numero">Número:</label>
                        <input
                            type="text"
                            id="answer.endereco.numero"
                            name="answer.endereco.numero"
                            value={formData.answer.endereco.numero}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                        />
                        {/* {errors.answer.endereco.numero && <span className="text-red-500 text-sm">{errors.answer.endereco.numero}</span>} */}
                    </div>

                    <div className="ml-3 w-[330px] relative">
                        <label htmlFor="answer.endereco.complemento">Complemento:</label>
                        <input
                            type="text"
                            id="answer.endereco.complemento"
                            name="answer.endereco.complemento"
                            value={formData.answer.endereco.complemento}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                        />
                        {/* {errors.answer.endereco.complemento && <span className="text-red-500 text-sm">{errors.answer.endereco.complemento}</span>} */}
                    </div>

                    <div className="ml-3 w-[232px] relative">
                        <label htmlFor="answer.endereco.municipio">Município:</label>
                        <input
                            type="text"
                            id="answer.endereco.municipio"
                            name="answer.endereco.municipio"
                            value={formData.answer.endereco.municipio}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                        />
                        {/* {errors.answer.endereco.municipio && <span className="text-red-500 text-sm">{errors.answer.endereco.municipio}</span>} */}
                    </div>

                    <div className="ml-3 w-[132px] relative">
                        <label htmlFor="answer.endereco.uf">UF:</label>
                        <input
                            type="text"
                            id="answer.endereco.uf"
                            name="answer.endereco.uf"
                            value={formData.answer.endereco.uf}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                        />
                        {/* {errors.answer.endereco.uf && <span className="text-red-500 text-sm">{errors.answer.endereco.uf}</span>} */}
                    </div>

                    <div className='w-full border-b font-RobotoMono text-lg'> CNH:</div>


                    <div className="ml-3  w-[100px] relative">
                        <label htmlFor="answer.cnh.categoria">Categoria:</label>
                        <input
                            type="text"
                            id="answer.cnh.categoria"
                            name="answer.cnh.categoria"
                            value={formData.answer.cnh.categoria}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                        />
                        {/* {errors.answer.cnh.categoria && <span className="text-red-500 text-sm">{errors.answer.cnh.categoria}</span>} */}
                    </div>

                    <div className="ml-3  w-[470px] relative">
                        <label htmlFor="answer.cnh.observacoes">Observações:</label>
                        <input
                            type="text"
                            id="answer.cnh.observacoes"
                            name="answer.cnh.observacoes"
                            value={formData.answer.cnh.observacoes}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                        />
                        {/* {errors.answer.cnh.email && <span className="text-red-500 text-sm">{errors.answer.cnh.observacoes}</span>} */}
                    </div>

                    <div className="ml-3  w-[270px] relative">
                        <label htmlFor="answer.cnh.numero_registro">Número Registro:</label>
                        <input
                            type="text"
                            id="answer.cnh.numero_registro"
                            name="answer.cnh.numero_registro"
                            value={formData.answer.cnh.numero_registro}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                        />
                        {/* {errors.answer.cnh.numero_registro && <span className="text-red-500 text-sm">{errors.answer.cnh.numero_registro}</span>} */}
                    </div>

                    <div className="ml-3  w-[220px] relative">
                        <label htmlFor="answer.cnh.data_primeira_habilitacao">Data 1a Habilitação:</label>
                        <DatePicker
                            id='answer.cnh.data_primeira_habilitacao'
                            name='answer.cnh.data_primeira_habilitacao'
                            locale="pt-BR"
                            selected={formData.answer.cnh.data_primeira_habilitacao}
                            onChange={date => handleInputCnhDateChange('answer.cnh.data_primeira_habilitacao', date)}
                            className=" p-2 border"
                            dateFormat="dd/MM/yyyy"
                            required
                        />
                        {/* {errors.answer.cnh.data_primeira_habilitacao && <span className="text-red-500 text-sm">{errors.answer.cnh.data_primeira_habilitacao}</span>} */}
                    </div>

                    <div className="ml-3  w-[220px] relative">
                        <label htmlFor="answer.cnh.data_validade">Data Validade:</label>
                        <DatePicker
                            id='answer.cnh.data_validade'
                            name='answer.cnh.data_validade'
                            locale="pt-BR"
                            selected={formData.answer.cnh.data_validade}
                            onChange={date => handleInputCnhDateChange('answer.cnh.data_validade', date)}
                            className=" p-2 border"
                            dateFormat="dd/MM/yyyy"
                            required
                        />
                        {/* {errors.answer.cnh.data_validade && <span className="text-red-500 text-sm">{errors.answer.cnh.data_validade}</span>} */}
                    </div>

                    <div className="ml-3  w-[220px] relative">
                        <label htmlFor="answer.cnh.data_ultima_emissao">Data Última Emissão:</label>
                        <DatePicker
                            id='answer.cnh.data_ultima_emissao'
                            name='answer.cnh.data_ultima_emissao'
                            locale="pt-BR"
                            selected={formData.answer.cnh.data_ultima_emissao}
                            onChange={date => handleInputCnhDateChange('answer.cnh.data_ultima_emissao', date)}
                            className=" p-2 border"
                            dateFormat="dd/MM/yyyy"
                            required
                        />
                        {/* {errors.answer.cnh.data_ultima_emissao && <span className="text-red-500 text-sm">{errors.answer.cnh.data_ultima_emissao}</span>} */}
                    </div>

                    <div className="ml-3  w-[230px] relative">
                        <label htmlFor="answer.cnh.registro_nacional_estrangeiro">Registro Nacional de Estrangeiro:</label>
                        <input
                            type="text"
                            id="answer.cnh.registro_nacional_estrangeiro"
                            name="answer.cnh.registro_nacional_estrangeiro"
                            value={formData.answer.cnh.registro_nacional_estrangeiro}
                            onChange={handleInputChange}
                            className=" p-2 w-full border "
                            required
                        />
                        {/* {errors.answer.cnh.registro_nacional_estrangeiro && <span className="text-red-500 text-sm">{errors.answer.cnh.registro_nacional_estrangeiro}</span>} */}
                    </div>
                    <div className='ml-3 w-fit relative'>
                        <label htmlFor="answer.cnh.codigo_situacao">Situação:</label>
                        <select
                            id="answer.cnh.codigo_situacao"
                            name="answer.cnh.codigo_situacao"
                            value={formData.answer.cnh.codigo_situacao}
                            onChange={handleInputChange}
                            className="primeiro-item-cinza"
                            required
                        >
                            <option value=''></option>
                            <option value='2' > Em emissão</option>
                            <option value='3' > Emitida</option>
                            <option value='A' > Cancelada</option>

                        </select>
                    </div>

                    <div className='ml-3 w-[145px] relative'>
                        <label htmlFor="answer.cnh.possui_impedimento">Possui Impedimento:</label>
                        <select
                            id="answer.cnh.possui_impedimento"
                            name="answer.cnh.possui_impedimento"
                            value={formData.answer.cnh.possui_impedimento}
                            onChange={handleInputChange}
                            className="w-full primeiro-item-cinza"
                            required
                        >
                            <option value=''></option>
                            <option value='true' > Sim</option>
                            <option value='false' > Não</option>

                        </select>
                    </div>

                    <div className='w-full border-b font-RobotoMono text-lg'> Foto facial:</div>

                    <div className='ml-3 w-[175px] relative'>
                        <label htmlFor="answer.biometria_face.base64" className='input-imagem'>Escolher foto</label>
                        <input
                            id="answer.biometria_face.base64"
                            type="file"
                            name="answer.biometria_face.base64"
                            onChange={handleInputImageChange}
                            accept="image/*"
                            className=''
                            required
                        />
                    </div>
                    {imagemCarregada && (
                        <div>
                            <p>Foto :</p>
                            <img src={imagemCarregada} alt="Imagem carregada" style={{ width: '200px' }} />
                        </div>
                    )}

                </div>

                <div className='w-full text-center'>
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
            {/* ****** */}

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

export default BiometriaFacial