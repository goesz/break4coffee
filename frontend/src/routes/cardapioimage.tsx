import React, { useEffect, useState } from 'react';

const CardapioImage = () => {
  const [fadeOut, setFadeOut] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(false);
    }, 200); 

    return () => clearTimeout(timer);
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
