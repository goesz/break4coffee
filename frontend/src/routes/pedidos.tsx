import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import { api } from '../services/api';
import { FaSadTear } from 'react-icons/fa';

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
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        const fetchPedidos = async () => {
            try {
                const response = await api.get('/pedidos', {
                });
        
                const sortedPedidos = response.data.sort((a: Pedido, b: Pedido) => {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                });
        
                setPedidos(sortedPedidos);
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
                                        <div className="flex justify-center items-center mr-4 text-amber-950 text-center">
                                        <p>Você ainda não fez nenhum pedido </p>
                                        <FaSadTear className="text-3xl ml-2" />
                                    </div>
                    ) : (
                        <ul className="list-disc pl-5">
                                                <h1 className="text-amber-800 font-semibold text-center text-5xl"><i>Pedidos</i></h1>
                                                <h1 className="text-gray-500 font-style: italic font-semibold text-center text-1xl opacity-20">Muito obrigado pela confiança em nosso trabalho!</h1><br></br>
                            {pedidos.map(pedido => (
                                <li key={pedido.id} className=" p-4 bg-white shadow-lg mt-2 mr-4 ml-2 rounded-lg transform transition-colors duration-300 hover:bg-gray-100">
        <div className="flex justify-center items-center">
        <div className="w-48 h-48 rounded-lg overflow-hidden flex justify-center items-center">
                                        <img
                                            src={`/images/${pedido.id_produto}.png`}
                                            alt={pedido.descricao}
                                            className="w-48 h-48 object-cover"
                                        />
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p><strong>Produto:</strong> {pedido.descricao}</p>
                                        <p><strong>Valor:</strong> R$ {pedido.valor.toFixed(2)}</p>
                                        <p><strong>Feito em:</strong>   {formatDate(pedido.created_at)}</p>
                                        <p><strong>Loja parceira:</strong>   {pedido.loja}</p><br></br>
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