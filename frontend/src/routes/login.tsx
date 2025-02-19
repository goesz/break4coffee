import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Coffee, Mail, Lock, User } from 'lucide-react';
import { api } from '../services/api';
import NavbarLogin from './loginnav';

import axios, { AxiosError } from 'axios'; 


interface LoginResponse {
    user: {
      id: string;
      name: string;
      email: string;
      status: boolean;
      created_at: string;
      updated_at: string;
      role: string;
      saldo: number;
    };
    token: string;
  }

  const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [userProfile, setUserProfile] = useState<LoginResponse['user'] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const token = sessionStorage.getItem('token');
      if (token) {
          navigate('/');
      }
  }, [navigate]);
  
    const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {navigate('/cadastro');}
    const handleLoginSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
  
      try {
        const loginResponse = await api.post('/auth/login', {
          email,
          password,
        });
  
        const { token, user } = loginResponse.data;
  
        if (!token) {
          throw new Error('Falha ao fazer login. Verifique suas credenciais.');
        }
  
        localStorage.setItem('token', token);
        navigate('/')


  

        setUserProfile(user);
      } catch (err) {
        setError('Erro ao fazer login. Verifique suas credenciais.');
      }
  
      emailRef.current!.value = '';
      passwordRef.current!.value = '';
    };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-200 to-gray-300">
      < NavbarLogin />
      <div className="flex-grow flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mt-6 w-full space-y-4">
          <div>
            <Coffee className="mx-auto h-12 w-auto text-amber-900" />
            <h2 className=" text-center text-3xl font-extrabold text-amber-900">
              Bem-vindo!
            </h2>
            <p className="mt-2 text-center text-sm text-amber-700">
              Faça login para acessar sua conta
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
          <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
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
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-amber-950 placeholder-amber-950 text-amber-900 rounded-t-md focus:outline-none focus:ring-amber-950 focus:border-amber-950 focus:z-10 sm:text-sm"
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
                    autoComplete="current-password"
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
                className="group relative w-full flex justify-center py-2 px-4 transition-colors duration-300 ease-in-out text-sm font-bold rounded-md border-2 border-amber-900 text-amber-900 hover:text-gray-200 hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-950"
              >
                Entrar
              </button>
            </div>
          </form>
          <div>
            <button
              onClick={handleSignUp}
              className="group relative  w-full flex justify-center py-2 px-4  border-transparent border-2 transition-colors duration-300 ease-in-out text-sm font-bold rounded-md text-gray-300 hover:text-gray-100 bg-amber-950 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-950"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <User className="h-5 w-5 text-gray-300 group-hover:text-gray-300" aria-hidden="true" />
              </span>
              Cadastrar
            </button>
          </div>
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


 

    </div>
  );
};

export default Login;
