import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import { api } from '../services/api';
import AddressForm from './adressform';

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
  const token = localStorage.getItem('token')
  const { cartItems }: { cartItems: CartItem[] } = location.state || { cartItems: [] };

  const handleBack = () => {
    navigate('/produtos', { state: {} });
  };

  const handleFinalize = async () => {
    if (!token){
      return navigate('/login');
  }


  
    try {
      for (const item of cartItems) {
        for (let i = 0; i < item.quantidade; i++) {
          await api.post('/pedido', {
            descricao: item.nome,
            valor: item.valor,
            loja: 'Break',
            id_produto: item.id
          });
          console.log(`Pedido para o item ${item.nome} feito com sucesso.`);
        }
      }

  
  
      console.log('Pedidos criados com sucesso');
      alert('Pedido realizado com sucesso');
      navigate('/meuspedidos');
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert('Erro ao finalizar compra, por favor, tente novamente.');
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

      <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Endereço de entrega:</h2>
      <AddressForm></AddressForm>

    </div>
            <div className="flex gap-4 justify-center">
              <button
                className="px-6 py-2 bg-amber-950 font-bold border-2 border-amber-950 text-gray-300 rounded-lg hover:bg-white hover:border-amber-950 hover:text-amber-950 transition"
                onClick={handleFinalize}
                >
                Comprar
              </button>
              <button
                className="px-6 py-2 border-2 font-semibold border-amber-950 text-amber-950 rounded-lg transition"
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
