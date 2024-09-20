import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Footer from './footer';
import Navbar from './navbar';
import Cart from './cart';

interface ProductProps {
  id: string;
  nome: string;
  tipo: string;
  valor: number;
  descricao: string;
  created_at: string;
  updated_at: string;
}

interface CartItem extends ProductProps {
  quantidade: number;
}

const ProductCard = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get('/produtos');
        setProducts(response.data);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }

    loadProducts();
  }, []);

  const addToCart = (product: ProductProps) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantidade: 1 }];
    });
  };

  return (
<main className="bg-gray-300 flex flex-col min-h-screen">
  <Navbar />
  <div className="flex-grow">
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-32">
              <img
                src={`/images/${product.id}.png`}
                alt={product.nome}
                className="absolute w-36 h-36 -top-12 left-1/2 transform -translate-x-1/2 rounded-full shadow-lg"
              />
            </div>
            
            <div className="p-4 h-auto flex flex-col">
              <h2 className="text-xl font-semibold mb-2 text-center">{product.nome}</h2>
              <p className="text-amber-950 mb-2">
                <span className="font-bold">Tipo:</span> {product.tipo}
              </p>
              <p className="text-amber-950 mb-2">
                <span className="font-bold">ID:</span> {product.id}
              </p>
              <p className="text-amber-950 mb-2 font-medium">
                <span className="font-bold">Descrição:</span> {product.descricao}
              </p>
              <p className="text-gray-900 font-bold">
                <span className="font-bold">Valor:</span> R${product.valor.toFixed(2)}
              </p>
              <div className="absolute bottom-4 right-4">
                <button
                  className="bg-amber-950 text-white px-4 py-2 rounded-lg transition-transform duration-500 hover:scale-105 font-medium"
                  onClick={() => addToCart(product)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  <Cart items={cartItems} />
  <Footer />
</main>

  );
};

export default ProductCard;
