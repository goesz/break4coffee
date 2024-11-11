import React, { useState } from 'react';
import { Coffee } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom';
import Dropdown from './dropdown';
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
<nav className="mb-2 p-4">
  <div className="container mx-auto flex  justify-between items-center">
    <div className="flex mb-4 md:mb-0"> {}
    <Coffee className="mr-2 text-amber-950" />
      <span className="text-amber-950 font-bold text-xl"></span> {}
    </div>
    <div className="relative md:flex-row space-y-2 md:space-y-0 md:space-x-4"> {}
      <ul className="flex space-x-6">
        <li>
          <Link to="/produtos" className="text-amber-950 duration-200 hover:text-amber-800">
            <b>PRODUTOS</b>
          </Link>
        </li>
        <li>
          <Link to="/contato" className="text-amber-950 duration-200 hover:text-amber-800">
            <b>CONTATO</b>
          </Link>
        </li>
        <li>
          <Link to="/" className="text-amber-950 duration-200 hover:text-amber-800">
            <b>SOBRE</b>
          </Link>
        </li>
      </ul>
    </div>
    <div>
      {!isLoggedIn ? (
        <input
          type="button"
          className="group relative w-full flex justify-center cursor-pointer px-4 transition-colors duration-300 ease-in-out text-sm font-bold rounded-lg border-2 border-amber-900 text-amber-900 hover:text-gray-200 hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-950"
          value="Login"
          onClick={handleClick}
        />
      ) : (
        <div className="relative px-4 mr-4 mt-2 inline-block">
          <button onClick={handleDrop} className="focus:outline-none">
            <FaUserCircle className="text-amber-950 text-2xl" />
          </button>
          {openProfile && <Dropdown />}
        </div>
      )}
    </div>
  </div>
</nav>


  );
}
