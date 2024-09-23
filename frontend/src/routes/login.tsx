import React, { useRef, useState, useEffect } from 'react';
import Navbar from './navbar';
import { api } from '../services/api';
import Footer from './footer';
import { useNavigate, Link } from 'react-router-dom';
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
          navigate('/produtos');
      }
  }, [navigate]);
  
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
  
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', user.id);
        sessionStorage.setItem('userRole', user.role);
        sessionStorage.setItem('userMoney', user.saldo);
        navigate('/produtos')


  

        setUserProfile(user);
      } catch (err) {
        setError('Erro ao fazer login. Verifique suas credenciais.');
      }
  
      emailRef.current!.value = '';
      passwordRef.current!.value = '';
    };

  return (
    <div>
      <Navbar />
      <div className="w-full h-full min-h-screen bg-gray-300 flex flex-col items-center px-4 relative">
        <img
          src={`/images/coffee.png`}
          alt="Café"
          className="absolute z-0 right-96 top-10"
        />

        <main className="my-10 w-full h-full md:max-w-2xl z-10">
          <h1 className="text-4xl font-medium text-amber-950 mb-8">Login</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form className="flex flex-col my-6 z-auto" onSubmit={handleLoginSubmit}>
            <label className="font-medium text-amber-950">E-mail:</label>
            <input
              type="email"
              placeholder="Digite seu e-mail.."
              className="w-full mb-5 p-2 text-amber-950 rounded-lg"
              ref={emailRef}
              required
            />

            <label className="font-medium text-amber-950">Senha:</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full mb-5 p-2 text-amber-950 rounded-lg"
              ref={passwordRef}
              required
            />

            <input
              type="submit"
              value="Entrar"
              className="cursor-pointer text-white w-full p-2 bg-amber-950 rounded-lg font-medium hover:scale-105 duration-200"
            />
          </form>

          {userProfile && (
            <div className="mt-10 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold">Perfil do Usuário</h2>
              <p><strong>Nome:</strong> {userProfile.name}</p>
              <p><strong>Email:</strong> {userProfile.email}</p>
            </div>
          )}
        </main>
      </div>
        <Footer />
    </div>
  );
};

export default Login;
