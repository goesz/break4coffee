import React from 'react';
import { useNavigate, Link } from 'react-router-dom';




const Dropdown = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.clear();
    navigate('/login');
  };
    return (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <ul className="py-2 text-amber-950">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-bold"> <Link to="/perfil" className="block w-full text-left">Meu perfil</Link></li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-bold"><Link to="/meuspedidos" className="block w-full text-left">Meus pedidos</Link></li>
                <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Sair</li>
            </ul>
            <div className="absolute right-2 top-0 transform -translate-y-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white" />
        </div>
    )
}

export default Dropdown;