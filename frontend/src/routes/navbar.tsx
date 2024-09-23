import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Dropdown from './dropdown'; // Certifique-se de que o caminho está correto
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false); 

  const handleClick = () => {
    navigate('/login');
  };

  const handleDrop = () => {
    setOpenProfile(!openProfile);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    navigate('/');
  };

  const isLoggedIn = !!sessionStorage.getItem('token');

  return (
    <nav className="bg-gray-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-amber-950 font-bold text-xl">
          <img
            src="./images/logo.png"
            alt="Minha Cafeteria"
            className="h-10 w-10 mr-2"
          />
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/produtos" className="text-amber-950 hover:text-amber-800">
              <b>
                Produtos
                </b>
            </Link>
          </li>
          <li>
            <Link to="/contato" className="text-amber-950 hover:text-amber-800">
            <b>
              Contato
            </b>
            </Link>
          </li>
          <li>
            <Link to="/" className="text-amber-950 hover:text-amber-800">
             <b> Sobre Nós</b>
            </Link>
          </li>
          {!isLoggedIn ? (
            <input
              type="button"
              className="cursor-pointer text-center h-6 text-white bg-amber-950 rounded-lg font-medium px-4 py-0 hover:scale-105 duration-500"
              value="Login"
              onClick={handleClick}
            />
          ) : (
            <div className="relative inline-block">
              <button onClick={handleDrop} className="focus:outline-none">
                <FaUserCircle className="text-amber-950 text-2xl" />
              </button>
              {openProfile && <Dropdown />}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}
