import Cadastro from './routes/cadastro';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
  password: string;
}



export default function App() {
  return (
<div className='bg-gray-300'>


    < Cadastro />

</div>

    
  );
}
