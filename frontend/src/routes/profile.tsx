import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaWallet, FaListAlt, FaBox } from 'react-icons/fa';
import Navbar from './navbar';
import Footer from './footer';

interface UserProfileProps {
    id: string;
    name: string;
    email: string;
    saldo: number;
    role: string;
}

const UserProfile = () => {
    const [user, setUser] = useState<UserProfileProps | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await api.get('/user/profile');
                setUser(response.data.user);
                if (response.data.isAdmin) {
                    setIsAdmin(true); // Marcar como admin
                }
            } catch (error) {
                console.error('Erro ao carregar perfil do usuário:', error);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    if (!user) {
        return <p>Carregando informações do usuário...</p>;
    }

    return (
        <main className="bg-gray-100 min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-grow container mx-auto px-6 py-8">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-amber-800 text-2xl font-semibold text-center mb-6">Perfil do {user.name}</h1>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <FaUser className="text-amber-800 text-xl" />
                            <p className="text-gray-700 text-lg"><strong>Nome:</strong> {user.name}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-amber-800 text-xl" />
                            <p className="text-gray-700 text-lg"><strong>Email:</strong> {user.email}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaWallet className="text-amber-800 text-xl" />
                            <p className="text-gray-700 text-lg"><strong>Saldo:</strong> R$ {user.saldo.toFixed(2).replace('.', ',')}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/meuspedidos')}
                        className="mt-6 w-full flex items-center justify-center py-2 px-4 bg-amber-800 text-white rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    >
                        <FaListAlt className="mr-2 text-lg" />
                        Meus Pedidos
                    </button>

                    {isAdmin && (
                        <button
                            onClick={() => navigate('/estoque')}
                            className="mt-4 w-full flex items-center justify-center py-2 px-4 bg-white text-amber-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                        >
                            <FaBox className="mr-2 text-lg" />
                            Estoque
                        </button>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default UserProfile;
