"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { enviaFormulario } from '../../componentes/enviarFormulario';
import { toast } from 'react-toastify';
import withAuth from '@/utils/AuthCheck';
import { useAmbiente } from '@/utils/AmbienteContext';


const ListaUsuarios = () => {
    const router = useRouter();
    const [usersData, setUsersData] = useState([]);
    const { user} = useAmbiente();

    useEffect(() => {
        const fetchData = async () => {

            const url = `${process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP}/v1/Usuario/ListarUsuarios`;
            
            try {
                
                const usersData = await enviaFormulario('', url, 'GET')
                setUsersData(JSON.parse(usersData).dados);
                
            } catch (error) {
                
                toast(error.message, {
                    hideProgressBar: true,
                    autoClose: false,
                    type: 'error'
                });
                
            }
        };

        fetchData();
    }, []);

    const handleEditClick = (userId) => {
        router.push(`usuarios/editar/${userId}`);
    };

    const handleNovoClick = () => {
        router.push(`usuarios/novo`);
    };

    return (
        <div className='bg-fundo-borda bg-contain bg-no-repeat bg-cor-principal text-black min-h-[600px]'>
            
            <h2 className="text-2xl font-semibold mb-4 w-2/3 m-auto pt-5">
                
                Lista de Usuários
                <span>
                    <button onClick={() => handleNovoClick()}
                        className="bg-cor-tercearia hover:bg-verde text-white font-bold py-! px-2 shadow-sombra m-2 rounded text-base"
                    > Novo
                    </button>
                </span>
            </h2>
            <table className="w-2/3 border-collapse border border-gray-200 m-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2">E-mail</th>
                        <th className="py-2">Usuário</th>
                        <th className="py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {!usersData ?
                        <tr className="border-b border-gray-200">
                            <td className="py-2">aguarde...</td>
                        </tr>

                        :
                        usersData.map((user) => (
                            <tr key={user._id} className="border-b border-gray-200 text-center bg-white">
                                <td className="py-2">{user.email}</td>
                                <td className="py-2">{user.nome}</td>
                                <td className="py-2">
                                    <button
                                        onClick={() => handleEditClick(user.usuarioId)}
                                        className="bg-vermelho-claro hover:bg-cinza-escuro  font-bold py-1 px-2 rounded mr-2"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default withAuth(ListaUsuarios)
