import React, { useEffect, useState } from 'react';

const CardapioImage = () => {
  const [fadeOut, setFadeOut] = useState(true); // Estado inicial para escurecer

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(false); // Remove o efeito de escurecimento após 2 segundos
    }, 200); // 2000 milissegundos = 2 segundos

    return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
  }, []);

  return (
    <div className="relative">
      <img
        className={`cardapio_img transition-opacity duration-1000 ${fadeOut ? 'opacity-100' : 'opacity-100'}`}
        src={`/images/cardapio2.png`}
        alt="Cardápio"
      />
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${fadeOut ? 'opacity-25' : 'opacity-0'}`}
      ></div>
    </div>
  );
};

export default CardapioImage;
