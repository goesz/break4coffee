import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ProductCard from './routes/produtos.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from './routes/contact.tsx'
import Teste from './routes/padrao.tsx'

const router = createBrowserRouter([
  {
    path: "/contato",
    element: <Contact />
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
