import React, { useState } from 'react';

interface CartItem {
  id: string;
  nome: string;
  valor: number;
  quantidade: number;
}

const Cart = ({ items }: { items: CartItem[] }) => {
    if (items.length === 0) {
        return null;
      }
  const total = items.reduce((acc, item) => acc + item.valor * item.quantidade, 0);

  return (
    <div className="fixed bottom-4 right-4 w-64 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-4">Carrinho</h3>
      {items.length === 0 ? (
        <p className="text-gray-700">Seu carrinho está vazio</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className="mb-2">
              <span className="font-medium">{item.nome}</span> - {item.quantidade}x
              <span className="font-bold"> R${item.valor.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="text-right font-bold mt-4">Total: R${total.toFixed(2)}</p>
    </div>
  );
};

export default Cart;
