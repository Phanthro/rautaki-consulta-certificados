'use client'
import { useEffect, useState } from 'react'
import CardServico from './componentes/card-servico'
import withAuth from '@/utils/AuthCheck'
import { enviaFormulario } from './componentes/enviarFormulario'
import { useAmbiente } from '@/utils/AmbienteContext'
import Creditos from './componentes/creditos'
import MenuPrincipal from './componentes/menu-principal'
import MenuCertidoes from './componentes/menu-certidoes'

const Home = () => {

  const { creditos } = useAmbiente();
  const [menu, setMenu] = useState(0)

  const handleTipoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      ['tipoInscricao']: value,
      ['inscricao']: ''
    });
    
    formData.inscricao = ''; // Limpa o campo de inscrição ao trocar o tipo
  };

  const getPlaceholder = () => {
    return formData.tipoInscricao === 'cpf' ? 'Digite seu CPF' : 'Digite seu CNPJ';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {


  }, [])

  return (
    <div className='bg-fundo-borda bg-contain bg-no-repeat bg-cor-principal text-black min-h-[600px]'>
      {creditos ?
        <div className='flex flex-row pt-10 justify-center space-x-[150px]'>
          <div className='bg-cinza2 w-[87px] h-[30px] text-white p-1 '>
            Certidões
          </div>
          <Creditos />
        </div> : ''
      }
      <div className='max-w-[380px] border border-cinza2 m-auto my-3'></div>

        {menu == 0 && <MenuPrincipal menu={setMenu}/>}
        {menu == 1 && <MenuCertidoes menu={setMenu}/>}

    </div>
  )
}

export default withAuth(Home)