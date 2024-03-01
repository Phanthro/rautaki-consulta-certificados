import React from 'react'

const MenuPrincipal = (props) => {
  return (
    <div className='card-inicio'>
        <div className='card-item' onClick={()=>props.menu(1)}>
          {/* <img src='../images/fire_fogo.png' className="w-[25px] align-middle" /> */}
          <div className="card-titulo">Nova certidão</div>
          <div className="card-subtitulo">Faça uma nova consulta de certidão.</div>
        </div>
        
        <a className='card-item' href='/historicos/usuario'>
          {/* <img src='../images/fire_fogo.png' className="w-[25px] align-middle" /> */}
          <div className="card-titulo">Certidões emitidas</div>
          <div className="card-subtitulo">Histórico de certidões emitidas.</div>
        </a>
       
        <div className='card-item'>
          {/* <img src='../images/fire_fogo.png' className="w-[25px] align-middle" /> */}
          <div className="card-titulo">Adicionar créditos</div>
          <div className="card-subtitulo">Coloquei mais créditos para solicitar novas certidões.</div>
        </div>
      </div>
  )
}

export default MenuPrincipal