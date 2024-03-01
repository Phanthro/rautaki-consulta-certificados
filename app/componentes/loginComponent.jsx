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

        const url = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/Auth/login`

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

            let url = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/Auth/ValidaToken`
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
      <div className="bg-white m-auto">
        <div className='m-auto flex flex-auto max-w-[500px] justify-between p-[15px]'>
          <div className=''>
            <img src='/images/fire_logo.png' width={200}/>
          </div>  
          <div  className=''>
            <img src='/images/fire_seta.png' height={50} width={50}/>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="formulario-contato md:p-2 bg-white fundo-cinza m-auto text-center p-5">
          <div  className="mb-4 max-w-[225px] h-[32px] relative m-auto">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 absolute left-0 w-full h-full"
              placeholder="Login"
              autoComplete="on"
              width={255}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="mb-6 max-w-[225px] h-[32px] relative m-auto">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="p-2 absolute left-0 w-full h-full"
              placeholder="Senha"
              autoComplete="off"
            />
            <span className='absolute z-10 right-0'>
              <img src="/images/login_locker.svg" width={20} height={20} className='m-2' />
            </span>
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>


          <button
            type="submit"
            className="bg-botao hover:bg-verde text-white font-bold py-2 px-10 rounded-lg"
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

  );
};

export default LoginComponent;
