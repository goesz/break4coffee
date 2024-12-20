import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ProductCard from './routes/produtos.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from './routes/contact.tsx';
import Teste from './routes/padrao.tsx';
import Checkout from './routes/checkout.tsx';
import Login from './routes/login.tsx';
import Pedidos from './routes/pedidos.tsx';
import Home from './routes/homepage.tsx'
import CoffeeArticle from './routes/tips.tsx';
import Localizacao from './routes/localizacao.tsx';
import Estoque from './routes/inventory.tsx';
import UserProfile from './routes/profile.tsx';

const router = createBrowserRouter([
  {
    path: "/contato",
    element: <Contact />
  },
  {
    path: "/meuperfil",
    element: < UserProfile />
  },
  {
    path: "/meuspedidos",
    element: < Pedidos />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/checkout",
    element: <Checkout />
  },
  {
    path: "/teste",
    element: <Teste/>
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/cadastro",
    element: <App />
  },
  {
    path: "/sobre",
    element: <Localizacao />
  },
  {
    path: "produtos",
    element: < ProductCard />
  },
  {
    path: "/blog/dicas-de-preparo",
    element: < CoffeeArticle />
  },
  {
    path: "/estoque",
    element: < Estoque />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
