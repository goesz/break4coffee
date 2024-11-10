import React, { useEffect, useState, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Mail, Lock, User, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import axios from 'axios';
import Footer from '../routes/footer';
import Navbar from '../routes/navbar';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
  password: string;
}

export default function Cadastro() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const userRole = sessionStorage.getItem('userRole');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/produtos');
    }
  }, [navigate]);

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

      alert('Cadastro realizado com sucesso!');
      navigate('/login')
      
      setCustomers((allCustomers) => [...allCustomers, response.data]);

      nameRef.current.value = '';
      emailRef.current.value = '';
      passwordRef.current.value = '';
      setError(null);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.msg || 'Ocorreu um erro inesperado');
          return;
        }
        setError('Sem resposta do servidor');
        return;
      }
      setError('Ocorreu um erro inesperado');
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
      console.error(err);
      setError('Erro ao deletar cliente');
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-200 to-gray-300">
      <Navbar />
      <div className="flex-grow mt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Coffee className="mx-auto h-12 w-auto text-amber-900" />
            <h2 className="mt-4 text-center text-3xl font-extrabold text-amber-900">
              Cadastro
            </h2>
            <p className="mt-2 text-center text-sm text-amber-700">
              Preencha os dados para criar sua conta
            </p>
          </div>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nome
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-amber-950" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-amber-950 placeholder-amber-950 text-amber-900 rounded-t-md focus:outline-none focus:ring-amber-950 focus:border-amber-950 focus:z-10 sm:text-sm"
                    placeholder="Nome"
                    ref={nameRef}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Endereço de e-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-amber-950" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-amber-950 placeholder-amber-950 text-amber-900 focus:outline-none focus:ring-amber-950 focus:border-amber-950 focus:z-10 sm:text-sm"
                    placeholder="Endereço de e-mail"
                    ref={emailRef}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-amber-950" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-amber-950 placeholder-amber-950 text-amber-900 rounded-b-md focus:outline-none focus:ring-amber-950 focus:border-amber-950 focus:z-10 sm:text-sm"
                    placeholder="Senha"
                    ref={passwordRef}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative  w-full flex justify-center py-2 px-4  border-transparent border-2 transition-colors duration-300 ease-in-out text-sm font-bold rounded-md text-gray-300 hover:text-gray-100 bg-amber-950 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-950"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <User className="h-5 w-5 text-gray-300 group-hover:text-gray-300" aria-hidden="true" />
              </span>
                Cadastrar
              </button>
            </div>
          </form>

          {userRole === 'admin' && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-amber-900 mb-4">Lista de Clientes</h3>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="bg-white rounded-lg shadow-md p-4 relative hover:shadow-lg transition-shadow duration-200"
                  >
                    <p><span className="font-medium">Nome:</span> {customer.name}</p>
                    <p><span className="font-medium">Email:</span> {customer.email}</p>
                    <p><span className="font-medium">Status:</span> {customer.status ? 'Ativo' : 'Inativo'}</p>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      aria-label="Deletar cliente"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
      <Footer />
    </div>
  );
}