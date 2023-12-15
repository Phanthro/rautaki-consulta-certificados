"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '@/styles/modal.css'
import { useAmbiente } from '@/utils/AmbienteContext';
import { ValidaToken } from '@/utils/ValidaToken';

const LoginComponent = () => {
  const { isLoading, setIsLoading, setPermissoes, setIsLogado, setToken, setUser } = useAmbiente()

  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [statusLogin, setStatusLogin] = useState('')

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = { ...errors };

    if (!formData.email) {
      updatedErrors.email = 'Campo obrigatório';
      isValid = false;
    } else {
      updatedErrors.email = '';
    }

    if (!formData.password) {
      updatedErrors.password = 'Campo obrigatório';
      isValid = false;
    } else {
      updatedErrors.password = '';
    }

    setErrors(updatedErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true)
      const credentials = `${formData.email}:${formData.password}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');

      setFormData(prevState => ({
        ...prevState,
        password: ''
      }));
      try {

        // const url = `http://avaloncliente-clusterip-srv/v1/Auth/login`
        const url = `https://localhost:7150/v1/Auth/login`

        await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${encodedCredentials}`
          },
          credentials: 'include',
          redirect: 'follow',
        }).then(async (res) => {
          setIsLoading(false)

          const retorno = await res.json();
          if (!res.ok) {
            setStatusLogin(retorno.error);
            console.log('Formulário válido. Enviar dados:', await res);
          }
          else {
            setPermissoes(retorno.permissoes)
            setToken(retorno.jwt)

            let url = `https://localhost:7150/v1/Auth/ValidaToken`
            const response = await ValidaToken(url)
            
            const user = await response
            if (!user) {
              setIsLogado(false)
              router.push('/')
              return;
            }
            
            setUser(JSON.parse(user));

            setIsLogado(true)
            router.push('/')
          }
        })

      } catch (error) {
        throw new Error("Erro ao logar.")

      } finally {
        setIsLoading(false)
      }


    } else {
      console.log('Formulário inválido. Corrija os erros.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="h-[700px] flex flex-col items-center justify-center bg-gray-300">

      <div className="modal-login flex flex-wrap border relative">
        <div className='header m-auto'>
          entrar
          {/* <img src="../images/logo_oficial_01.png" width={132} height={132} className='m-auto' /> */}
        </div>

        <a href='/' className="close">
          <img src="../images/icon_close square.svg" width={30} height={30} className='' />
        </a>


        <form onSubmit={handleSubmit} className="formulario-contato md:p-2 bg-white fundo-cinza m-auto text-center">
          <div className="mb-4 flex items-center">
            <span><img src="../images/icon_user.svg" width={32} height={36} className='mr-4' /></span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 w-full border "
              placeholder="Login"
              autoComplete="on"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="mb-6 flex items-center">
            <span><img src="../images/icon_lock.svg" width={32} height={33} className='mr-4' /></span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="p-2 w-full border "
              placeholder="Senha"
              autoComplete="off"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>


          <button
            type="submit"
            className="bg-cor-principal hover:bg-verde text-white font-bold py-2 
                px-4 shadow-sombra w-[178px] h-[50px] text-[16px] uppercase"
                >
            <span className={`${!isLoading && 'hidden'}`}>
              <svg className="inline animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            Entrar
          </button>
          {statusLogin && <span className="text-red-500 text-sm">{statusLogin}</span>}
        </form>

      </div>

    </div>
  );
};

export default LoginComponent;
