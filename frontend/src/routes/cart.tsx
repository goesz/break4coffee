import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  nome: string;
  valor: number;
  quantidade: number;
}
interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemoveItem }) => {
  const navigate = useNavigate();

  if (items.length === 0) {
    return null;
  }

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems: items } });
  };

  const total = items.reduce((acc, item) => acc + item.valor * item.quantidade, 0);

  return (
    <div className="fixed bottom-0 left-0 m-4 bg-white shadow-lg rounded-lg p-4 w-80">
      <h3 className="text-lg font-semibold mb-2">Carrinho</h3>
      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <span className="font-semibold">{item.nome}</span>
          <span>{item.quantidade} x R${item.valor.toFixed(2)}</span>
          <button
            onClick={() => onRemoveItem(item.id)}
            className="text-amber-950 font-bold text-lg ml-2"
          >
            &times;
          </button>
        </div>
      ))}
      <div className="border-t border-gray-200 pt-2">
        <h4 className="text-lg font-bold">Total: R${total.toFixed(2)}</h4>
      </div>
      <button
        className="bg-amber-950 text-white px-4 py-2 rounded-lg mt-4 w-full font-medium transition-transform duration-500 hover:scale-105"
        onClick={handleCheckout}
      >
        Finalizar Compra
      </button>
    </div>
  );
};

export default Cart;
