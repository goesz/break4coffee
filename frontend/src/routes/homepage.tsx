import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { api } from '../services/api';
import Cart from './cart';
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

  

const Home = () => {
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

  {/* Hero Section */}
  <div className="bg-cover bg-center h-64 bg-gray-200" style={{ backgroundImage: "url('./images/cafe2.jpg')" }}>
    <div className="container mx-auto flex items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-white text-shadow-lg bg-opacity-75 p-2">
        Break4Coffee
      </h1>
    </div>
  </div>

  <div className="container mx-auto py-8 space-y-8">
    <div className="flex flex-col mr-2 ml-2 sm:mr-0 sm:ml-0 md:flex-row items-center bg-gray-100 rounded-lg p-6">
      <div className="md:w-1/2 p-6 text-center rounded-lg md:rounded-r-none flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-amber-900 mb-4">
          Dicas de como cuidar do <b>Seu</b> Café
        </h2>
        <p className="text-amber-800 font-medium mb-6">
          Conheça nossa linha de <b>Cold Brew e Refreshers™</b>
        </p>
        <button className="px-6 py-2 border-2 border-amber-900 text-amber-900 rounded-lg hover:bg-amber-900 hover:text-white transition">
          Saiba mais
        </button>
      </div>
      <div className="md:w-1/2 flex items-center justify-center bg-amber-900 rounded-lg">
        <img
          src="./images/cafe1.jpg"
          alt="Café"
          className="w-3/4 h-auto mb-2 mt-2 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mr-2 ml-2 sm:mr-0 sm:ml-0 mt-6">
    {products.slice(0, 4).map((product) => (
      <div
        key={product.id}
        className="py-6 bg-white shadow-lg rounded-lg transform transition-colors duration-300 hover:bg-gray-100"
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
        
        <div className="p-2 flex flex-col">
          <h2 className="text-xl text-amber-800 font-semibold mb-2 text-center">{product.nome}</h2>
          <p className="text-amber-950 mb-2">
            <span className="font-bold"></span> {/* {product.tipo} */}
          </p>
          <p className="text-amber-950 mb-2 ml-2">{product.descricao}</p>
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
  <Cart items={cartItems} />
  <Footer />
</main>

  );
};

export default Home;