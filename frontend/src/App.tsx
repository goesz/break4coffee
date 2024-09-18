import { useEffect, useState, useRef, FormEvent } from 'react';
import { FiTrash } from 'react-icons/fi';
import { api } from './services/api';
import axios from 'axios';

interface ProductProps {
  id: string;
  nome: string;
  tipo: string;
  valor: number;
  descricao: string;
  created_at: string;
  updated_at: string;
}

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
  password: string;
}

function ProductCard() {
  const [products, setProducts] = useState<ProductProps[]>([]);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div 
          key={product.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
        >
          <img
            src={`/images/${product.id}.png`}
            alt={product.nome}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{product.nome}</h2>
            <p className="text-gray-700 mb-2"><span className="font-medium">Tipo:</span> {product.tipo}</p>
            <p className="text-gray-700 mb-2"><span className="font-medium">ID:</span> {product.id}</p>
            <p className="text-gray-700 mb-2"><span className="font-medium">Descrição:</span> {product.descricao}</p>
            <p className="text-gray-900 font-bold"><span className="font-medium">Valor:</span> R${product.valor.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const response = await api.get('/clientes');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value || !passwordRef.current?.value) return;

    try {
      const response = await api.post('/auth/register', {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      });
      console.log(response);

      alert('Cadastro realizado com sucesso!');
      setCustomers((allCustomers) => [...allCustomers, response.data]);

      nameRef.current.value = '';
      emailRef.current.value = '';
      passwordRef.current.value = '';

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(`Erro: ${error.response.data.msg || 'Ocorreu um erro inesperado'}`);
          return;
        }

        alert('Sem resposta do servidor');
        return;
      }

      alert('Ocorreu um erro inesperado');
      return;
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.delete('/cliente', {
        params: {
          id: id,
        }
      });

      const allCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(allCustomers);

    } catch (err) {
      console.log(err);
    }
    alert(id);
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white mb-8">Clientes</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome.."
            className="w-full mb-5 p-2 rounded-lg"
            ref={nameRef}
          />

          <label className="font-medium text-white">E-mail:</label>
          <input
            type="email"
            placeholder="Digite seu e-mail.."
            className="w-full mb-5 p-2 rounded-lg"
            ref={emailRef}
          />
          <label className="font-medium text-white">Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full mb-5 p-2 rounded-lg"
            ref={passwordRef}
          />
          <input
            type="submit"
            value="Cadastrar"
            className="cursor-pointer w-full p-2 bg-green-500 rounded-lg font-medium"
          />
        </form>

        <section className="flex flex-col gap-4 mb-10">
          {customers.map((customer) => (
            <article
              key={customer.id}
              className="w-full bg-white rounded p-4 shadow-md relative hover:scale-105 duration-200"
            >
              <p><span className="font-medium">Senha:</span> {customer.password}</p>
              <p><span className="font-medium">Nome:</span> {customer.name}</p>
              <p><span className="font-medium">Email:</span> {customer.email}</p>
              <p><span className="font-medium">Status:</span> {customer.status ? 'Ativo' : 'Inativo'}</p>

              <button
                onClick={() => handleDelete(customer.id)}
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute top-2 right-2"
              >
                <FiTrash size={18} color="#FFF" />
              </button>
            </article>
          ))}
        </section>
        <h1 className="text-4xl font-medium text-white mb-8">Nossos produtos</h1>
        <ProductCard />
      </main>
    </div>
  );
}
