import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-amber-800 py-8 w-full">
      <div className="container mx-auto px-4 max-w-screen-lg text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-left">Break4Coffee</h2>
            <p className="text-gray-800">Para quando há pouco tempo para parar!</p>
          </div>
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
            </ul>
          </nav>

          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-amber-950 hover:scale-105 duration-200">
              <FiFacebook size={24} />
            </a>
            <a href="https://twitter.com" className="hover:text-amber-950 hover:scale-105 duration-200">
              <FiTwitter size={24} />
            </a>
            <a href="https://instagram.com" className="hover:text-amber-950 hover:scale-105 duration-200">
              <FiInstagram size={24} />
            </a>
            <a href="https://linkedin.com" className="hover:text-amber-950 hover:scale-105 duration-200">
              <FiLinkedin size={24} />
            </a>
          </div>
        </div>

        <div className="text-center text-gray-800 mt-4">
          <p>&copy; 2024 Break4Coffee. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
