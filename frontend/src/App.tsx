import { useEffect, useState, useRef, FormEvent } from 'react';
import { FiTrash } from 'react-icons/fi';
import { api } from './services/api';
import axios from 'axios';
import Footer from './routes/footer';
import Navbar from './routes/navbar';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
  password: string;
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
    <div>

      < Navbar />
    <div className="w-full h-full min-h-screen bg-gray-300 flex flex-col items-center px-4 relative">


    <img
  src={`/images/coffee.png`}
  alt="Café"
  className="absolute z-0 right-96 top-10"
  />

      <main className="my-10 w-full h-full md:max-w-2xl z-10">
        <h1 className="text-4xl font-medium text-amber-950 mb-8">Clientes</h1>
        <form className="flex flex-col my-6 z-auto" onSubmit={handleSubmit}>
          <label className="font-medium text-amber-950">Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome.."
            className="w-full mb-5 p-2 text-amber-950 rounded-lg"
            ref={nameRef}
            />

          <label className="font-medium text-amber-950">E-mail:</label>
          <input
            type="email"
            placeholder="Digite seu e-mail.."
            className="w-full mb-5 p-2 text-amber-950 rounded-lg"
            ref={emailRef}
            />
          <label className="font-medium text-amber-950">Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full mb-5 p-2 text-amber-950 rounded-lg"
            ref={passwordRef}
            />
          <input
            type="submit"
            value="Cadastrar"
            className="cursor-pointer text-white w-full p-2 bg-amber-950 rounded-lg font-medium hover:scale-105 duration-200"
            />
        </form>

        <section className="flex flex-col gap-4 mb-10">
          {customers.map((customer) => (
            <article
            key={customer.id}
            className="w-full bg-white rounded p-4 shadow-md relative hover:scale-105 duration-200"
            >
              <p><span className="font-medium">Senha:</span> {customer.password}</p>
              <p><span className="font-medium">Id:</span> {customer.id}</p>
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
      </main>
      <Footer />
    </div>
          </div>
    
  );
}
