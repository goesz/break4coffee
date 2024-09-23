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

const router = createBrowserRouter([
  {
    path: "/contato",
    element: <Contact />
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
    element: <App />
  },
  {
    path: "produtos",
    element: < ProductCard />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
