import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
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
              <Link to="/" className="text-amber-950 hover:text-amber-800">
                Produto
              </Link>
            </li>
            <li>
              <Link to="/" className="text-amber-950 hover:text-amber-800">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/" className="text-amber-950 hover:text-amber-800">
                Sobre Nós
              </Link>
            </li>
            <input type="button" className="cursor-pointer text-center h-7 text-white bg-amber-950 rounded-lg font-medium px-4 py-0" value="Login" onClick={handleClick}/>
          </ul>
        </div>
      </nav>
    );
  }
