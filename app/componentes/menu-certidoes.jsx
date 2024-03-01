import React, { useEffect, useState } from 'react'
import { enviaFormulario } from './enviarFormulario';

const  MenuCertidoes = (props) => {

    const [consultas, setConsultas] = useState({});

    useEffect(() => {
        const consultaConsultas = async () => {

            const url = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/Consultas/ObterConsultas`

            const res = await enviaFormulario('', url, 'GET', 'force-cache')

            if (res) {
                let jsonParse = JSON.parse(res)
                jsonParse.dados = jsonParse.dados.filter(item => !item.itemPai)
                setConsultas(jsonParse) 
            }

        }
        consultaConsultas();

    }, [])

    const formatoMoeda = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <div className='card-inicio'>
            <a className='rounded-full py-1 px-2 bg-cinza2 text-white self-start cursor-pointer' onClick={()=>props.menu(0)}>&lt; voltar</a>
            {consultas && consultas.dados && consultas.dados.map((item, index) => (
                <a className='card-item' href={item.link}>
                    {/* <img src='../images/fire_fogo.png' className="w-[25px] align-middle" /> */}
                    <div className="card-titulo">{item.nome}</div>
                    <div className="card-subtitulo">{item.descricao}</div>
                    <div className='text-cor-tercearia text-sm text-right relative top-2'>{formatoMoeda.format(item.valor)}</div>
                    
                </a>
            ))}
        </div>
    )
}

export default MenuCertidoes