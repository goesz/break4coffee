import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import { api } from '../services/api';

interface Pedido {
    id: string;
    descricao: string;
    valor: number;
    id_produto: string;
    loja: string;
    created_at: string; 
}

const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    return date.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(',', ' -');
  };

const Pedidos = () => {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            navigate('/login');
            return;
        }

        const fetchPedidos = async () => {
            try {
                const response = await api.get('/pedidos', {
                    params: { customer_id: userId }, 
                });
                setPedidos(response.data);
            } catch (err) {
                setError('Erro ao carregar os pedidos.');
            }
        };
        

        fetchPedidos();
    }, [navigate]);

    return (
        <div className="bg-gray-300">
            <Navbar />
            <div className="w-full h-full min-h-screen bg-gray-300 flex flex-col items-center px-4 relative">
                <main className="my-10 w-full h-full md:max-w-2xl z-10">

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {pedidos.length === 0 ? (
                        <p className="text-gray-700">Você não tem pedidos.</p>
                    ) : (
                        <ul className="list-disc pl-5">
                                                <h1 className="text-amber-800 font-semibold text-center text-5xl">Seus Pedidos:</h1>
                                                <h1 className="text-gray-500 font-style: italic font-semibold text-center text-1xl opacity-20">Muito obrigado pela confiança em nosso trabalho!</h1> <br></br> <br></br>
                            {pedidos.map(pedido => (
                                <li key={pedido.id} className="mb-4 relative bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105">
                                    <div className="relative h-32">
                                        <img
                                            src={`/images/${pedido.id_produto}.png`}
                                            alt={pedido.descricao}
                                            className="absolute w-36 h-36 -top-12 left-1/2 transform -translate-x-1/2 rounded-full shadow-lg"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p><strong>Produto:</strong> {pedido.descricao}</p>
                                        <p><strong>Valor:</strong> R$ {pedido.valor.toFixed(2)}</p>
                                        <p><strong>Feito em:</strong>   {formatDate(pedido.created_at)}</p>
                                        <p><strong>Loja parceira:</strong>   {pedido.loja}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Pedidos;