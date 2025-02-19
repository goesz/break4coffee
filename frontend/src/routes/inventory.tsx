import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Navbar from './navbar';
import Footer from './footer';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ProductProps {
  id: string;
  nome: string;
  tipo: string;
  valor: number;
  descricao: string;
  quantidade: number;
  status: string;
}

const Estoque = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const loadProducts = async () => {
      try {
        const response = await api.get('/produtos');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao carregar produtos do estoque:', error);
      }
    };

    loadProducts();
  }, [navigate]);

  const updateProductStatus = async (productId: string, status: string) => {
    try {
      await api.post('/inventory', { productId, status });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, status } : product
        )
      );
    } catch (error) {
      console.error(`Erro ao atualizar status do produto: ${productId}`, error);
    }
  };

  return (
    <main className="bg-gray-300 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto py-6">
        <h1 className="text-amber-800 font-semibold text-center text-5xl">
          Estoque de Produtos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <div
            key={product.id}
            className="py-8 bg-white shadow-lg mt-2 mr-2 ml-2 rounded-lg transform transition-colors duration-300 hover:bg-gray-100"
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
              <h2 className="text-xl text-amber-800 font-bold text-center">{product.nome}</h2>
              <p className="text-amber-950 mb-2">
              </p>
              <p className="text-amber-950 ml-2 text-center mb-2 mr-2 font-medium">
              <span className="font-bold"></span> {product.status === "enabled" ? "Ativado" : "Desativado"}
              </p>
              <p className="absolute text-gray-900 bottom-2 ml-2 mb-2 font-bold">
                <span className="font-bold"></span> <i>R$ {product.valor.toFixed(2).replace(".", ",")} </i>
              </p>
          
              <div className="absolute bottom-2 mt-2 right-4 mr-0 flex space-x-2">
                <button
                  className="flex items-center justify-center bg-green-600 w-20 text-white p-3 rounded-lg transition-colors hover:bg-green-500 duration-200 font-medium lg:w-14"
                  onClick={() => updateProductStatus(product.id, 'enabled')}
                >
                  <FaCheck className="text-xl" />
                </button>
                <button
                  className="flex items-center justify-center bg-red-600 w-20 text-white p-3 rounded-lg transition-colors hover:bg-red-500 duration-200 font-medium lg:w-14"
                  onClick={() => updateProductStatus(product.id, 'disabled')}
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Estoque;
