import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Footer from './footer';
import Navbar from './navbar';
import Cart from './cart';
import CardapioImage from './cardapioimage';
import { FaShoppingCart } from 'react-icons/fa'

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
  <CardapioImage />
  <div className="flex-grow">
<br></br>
<h1 className="text-amber-800 font-semibold text-center text-5xl">Nosso cardápio</h1>
<h1 className="text-black text-center text-2xl">Só escolher e aproveitar o seu <i>break!</i></h1><br></br>
<div className="container mx-auto  py-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <div
        key={product.id}
        className="py-6 bg-white shadow-lg mt-2 mr-2 ml-2 rounded-lg transform transition-colors duration-300 hover:bg-gray-100"
      >
        <div className="flex justify-center items-center">
        <div className="w-48 h-48 rounded-lg overflow-hidden flex justify-center items-center">

          <img
            src={`/images/${product.id}.png`}
            alt={product.nome}
            className="w-full h-full object-cover"
          />
          </div>
        </div>
        
        <div className="p-2 h-auto flex flex-col">
          <h2 className="text-xl text-amber-800 font-bold mb-2 text-center">{product.nome}</h2>
          <p className="text-amber-950 mb-2">
            <span className="font-bold"></span>  {// product.tipo
            }
          </p>
          <p className="text-amber-950 ml-2 mb-2 mr-2 font-medium">
            <span className="font-bold"></span> {product.descricao}
          </p>
          <p className="text-gray-900 ml-2">
            <span className="font-bold"></span> R${product.valor.toFixed(2)}
          </p>
          <div className="absolute bottom-2 mt-2 right-4 mr-0">
            <button
              className="flex justify-center bg-amber-950 w-20 text-white p-3 rounded-lg transition-colors hover:bg-amber-900 duration-200 font-medium s: lg:w-14"
              onClick={() => addToCart(product)}
            >
              <FaShoppingCart className="text-xl" />
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
