import { Coffee, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
    const navigate = useNavigate()
    const sendToProducts = () =>{
      navigate("/produtos")
    }

  return (
    <footer className="bg-amber-950 mt-2 text-amber-100">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold  cursor-pointer flex items-center mb-4">
            <Coffee className="mr-2" />
            Break4Coffee
          </h2>
          <p className="mb-4">Para quando há pouco tempo para parar!</p>
          <div className="flex space-x-4">
            <div className="hover:text-amber-300  cursor-pointer transition-colors">
              <Facebook size={20} />
            </div>
            <div className="hover:text-amber-300  cursor-pointer transition-colors">
              <Twitter size={20} />
            </div>
            <div className="hover:text-amber-300  cursor-pointer transition-colors">
              <Instagram size={20} />
            </div>
            <div className="hover:text-amber-300  cursor-pointer transition-colors">
              <Linkedin size={20} />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold  cursor-pointer mb-4" onClick={sendToProducts}>Produtos</h3>
          <ul className="space-y-2">
            <li onClick={sendToProducts}><span className="hover:text-amber-300  cursor-pointer transition-colors">Cafés Especiais</span></li>
            <li><span className="hover:text-amber-300  cursor-pointer transition-colors">Bebidas Geladas</span></li>
            <li><span className="hover:text-amber-300  cursor-pointer transition-colors">Sucos Naturais</span></li>
            <li><span className="hover:text-amber-300  cursor-pointer transition-colors">Sucos Integrais</span></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
          <ul className="space-y-2">
            <li><span className="hover:text-amber-300 transition-colors">Nossa História</span></li>
            <li><span className="hover:text-amber-300 transition-colors">Localizações</span></li>
            <li><span className="hover:text-amber-300 transition-colors">Trabalhe Conosco</span></li>
            <li><span className="hover:text-amber-300 transition-colors">Sustentabilidade</span></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contato</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Phone size={16} className="mr-2" />
              <span>(11) 1234-5678</span>
            </li>
            <li className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span>contato@break4coffee.com</span>
            </li>
            <li className="flex  cursor-pointer items-center">
              <MapPin size={16} className="mr-2" />
              <span>São Paulo</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-amber-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Break4Coffee. Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0">
            <form onSubmit={(e) => e.preventDefault()} className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-amber-800 border-amber-700 text-amber-100 placeholder-amber-400"
              />
              <button type="submit"  className="bg-amber-700 text-amber-100 hover:bg-amber-600">
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </footer>
)
}