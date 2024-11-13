import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

const Localizacao = () => {
  return (
    <main className="bg-gray-100 flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8 mt-4">
        <h1 className="text-amber-800 text-4xl font-bold mb-6">Onde Estamos?</h1>

        <div className="flex flex-col lg:flex-row items-start lg:items-start gap-10 mb-8">
          <div className="lg:w-2/3 space-y-6 text-lg lg:text-xl text-justify">
            <p>
              Bem-vindos, viajantes do sabor! Aqui, nas encruzilhadas de São Paulo, onde os trilhos se entrelaçam e os vagões dançam ao ritmo da cidade, encontramos nossa morada. Nossas cafeterias, como estações mágicas, aguardam por vocês.
            </p>
            <p>
              E assim, viajantes, nossas cafeterias se espalham pelas linhas do São Paulo, cada uma com seu sabor exclusivo. Peguem seus copos, seus sorrisos e embarquem. Estamos no coração de São Paulo, onde o café é a língua universal e cada xícara conta uma história.
            </p>
            <p>
            Nosso objetivo é levar uma experiência única e aconchegante para toda a capital metropolitana de São Paulo.
             Em cada estação, de norte a sul, leste a oeste, estamos aqui para conectar pessoas e compartilhar momentos especiais ao redor de uma xícara de café.
            </p>
            <p>
            Com um compromisso de proximidade e acessibilidade, buscamos fazer parte do dia a dia de todos os paulistanos e visitantes,
             oferecendo um ambiente acolhedor em cada canto dessa metrópole vibrante. Nossa missão é simples: estar onde você está, proporcionando um <i>Break</i> delicioso e inesquecível.
            </p>
          </div>

          <div className="lg:w-1/3 space-y-4 flex flex-col items-center">
            <img 
              src="./images/cptm2.png" 
              alt="Localização das redes" 
              className="md:max-h-full md:max-w-96 h-auto lg:max-w-full lg:max-h-full" 
            />

  
          </div>
        </div>

        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1BR5aLuOUvdx7mxLvGeg5GTj1g77VGAc&ehbc=2E312F&noprof=1"
            width="100%"
            height="480"
            className="rounded-lg shadow-lg"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Localizacao;
