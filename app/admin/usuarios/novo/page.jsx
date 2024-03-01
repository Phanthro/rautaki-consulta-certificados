'use client'
import TelefoneInput from '@/app/componentes/TelefoneInput';
import { enviaFormulario } from '@/app/componentes/enviarFormulario';
import withAuth from '@/utils/AuthCheck';
import { Router, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function page() {

    const [consultando, setConsultando] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        confirmacaoEmail: '',
        nome: '',
        senha: '',
        confirmacaoSenha: '',
        telefone: ''
    });

    function validarSenha() {
        var senha = formData.senha;
        var confirmacaoSenha = formData.confirmacaoSenha;
        if (senha != confirmacaoSenha) {
            alert("As senhas não coincidem!");
            return false;
        }
        return true;
    }

    function validarFormulario() {

        var email = formData.email;
        var confirmaEmail = formData.confirmacaoEmail;
        if (email != confirmaEmail) {
            alert("Os Emails não coincidem!");
            return false;
        }

        var senha = formData.senha;
        var regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!senha.match(regexSenha)) {
            alert("A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
            return false;
        }

        return validarSenha();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validarFormulario()) {

            formData.senha = Buffer.from(formData.senha).toString('base64');
            const url = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/Usuario/`;

            try {

                setConsultando(true);

                const resposta = await enviaFormulario(formData, url, 'POST');

                router.push('/admin/usuarios/');

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
    };

    return (
        <div className='bg-fundo-borda bg-contain bg-no-repeat bg-cor-principal text-black min-h-[600px]'>
            <form onSubmit={handleSubmit} className="p-2 datavalid m-auto w-2/3 ">

                    <div className='relative left-16 top-2 rounded-full py-1 px-2 bg-cinza2 text-white w-fit '>
                        <a className='' href='/admin/usuarios/'>&lt; voltar</a>
                    </div>
                <div className='flex flex-col gap-5 mb-10 items-center m-auto'>
                    <div className='w-full border-b font-Inter text-lg text-center'> Cadastro Novo Usuário</div>

                    <div className="ml-3  w-[380px] relative">
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className=" p-2 w-full border "
                            maxLength={150}
                            required
                        />
                    </div>
                    <div className="ml-3  w-[380px] relative">
                        <label htmlFor="confirmacaoEmail">Confirma E-mail:</label>
                        <input
                            type="email"
                            id="confirmacaoEmail"
                            name="confirmacaoEmail"
                            value={formData.confirmacaoEmail}
                            onChange={handleChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={150}
                        />
                    </div>
                    <div className="ml-3  w-[380px] relative">
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={150}
                        />
                    </div>
                    <div className="ml-3  w-[380px] relative">
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={150}
                        />
                    </div>
                    <div className="ml-3  w-[380px] relative">
                        <label htmlFor="confirmacaoSenha">Confirma Senha:</label>
                        <input
                            type="password"
                            id="confirmacaoSenha"
                            name="confirmacaoSenha"
                            value={formData.confirmacaoSenha}
                            onChange={handleChange}
                            className=" p-2 w-full border "
                            required
                            maxLength={150}
                        />
                    </div>

                    <div className="ml-3  w-[380px] relative">
                        <label htmlFor="telefone">Telefone:</label>
                        <TelefoneInput
                            type="text"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            className=" p-2 w-full border "
                            required
                        />
                    </div>

                    <div className='w-full text-center'>
                        {!consultando ?
                            <button type="submit" className="bg-cor-tercearia hover:bg-verde text-white font-bold py-2 px-4 shadow-sombra w-[178px] h-[50px]">
                                Salvar
                            </button>
                            : <div>Salvando...</div>}
                    </div>
                </div>
            </form>

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
    );
}

export default withAuth(page)