import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import { api } from '../services/api';

interface CartItem {
  id: string;
  nome: string;
  tipo: string;
  valor: number;
  descricao: string;
  quantidade: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = sessionStorage.getItem('userId')
  const { cartItems }: { cartItems: CartItem[] } = location.state || { cartItems: [] };

  const handleBack = () => {
    navigate('/produtos', { state: {} });
  };

  const handleFinalize = async () => {
    const userSaldo = parseFloat(sessionStorage.getItem('userMoney') || '0');
    if (!userId) return navigate('/login');
    if (userSaldo < total){
      console.log('você ta pobre')
      return navigate('/produtos')}
    try {
      await Promise.all(cartItems.map(async (item) => {
        await api.post('/pedido', {
          customer_id: userId,
          descricao: item.nome,
          valor: item.valor,
          loja: 'Starbucks',
          id_produto: item.id
        });
        console.log(item.valor);
      }));

      console.log('Pedidos criados com sucesso');
      navigate('/meuspedidos');
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.valor * item.quantidade, 0);

  return (
    <main className="bg-gray-300 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Finalizar Compra</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-700">Seu carrinho está vazio.</p>
        ) : (
          <div>
            <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold mb-4">Itens no Carrinho</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{item.nome}</span>
                    <span>{item.quantidade} x R${item.valor.toFixed(2)}</span>
                  </div>
                  <span className="font-bold text-gray-900">R${(item.valor * item.quantidade).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-xl font-bold">Total: R${total.toFixed(2)}</h3>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                className="bg-amber-950 text-white px-6 py-2 rounded-lg font-medium transition-transform duration-500 hover:scale-105"
                onClick={handleFinalize}
              >
                Finalizar Compra
              </button>
              <button
                className="bg-amber-950 text-white px-6 py-2 rounded-lg font-medium transition-transform duration-500 hover:scale-105"
                onClick={handleBack}
              >
                Alterar Itens
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Checkout;
