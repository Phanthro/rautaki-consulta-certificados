import React from 'react'
import '@/styles/modal.css'

const CadastroInfo = ({closeModal}) => {
  return (
    <div className="modalConfirmacao flex flex-col gap-5">
        <div className='header'>&nbsp;</div>

        <a className="close" onClick={closeModal}>
        <img src="../images/icon _close square_.svg" width={60} height={60} className='' />
        </a>
        <div className='modal-subtitulo'>Cadastro efetuado com sucesso!</div>

        <div className='modal-texto'>Em breve entraremos em contato.</div>

        <div className='w-full text-center'>
            <button onClick={closeModal}
                type="submit"
                className="bg-cor-principal hover:bg-verde text-white font-bold py-2 
                px-4 shadow-sombra w-[178px] h-[50px] text-[16px] uppercase"

            >
                ok
            </button>
        </div>
    </div>
  )
}

export default CadastroInfo