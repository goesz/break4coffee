import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

const CoffeeArticle = () => {
  return (
    <main className="bg-gray-300 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">A Arte do Preparo do Café: Cuidados Essenciais</h1>
          <div className="mb-6 text-amber-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Publicado em 10 de Novembro, 2024</span>
          </div>
          <div className="relative w-full h-96 mb-8">
            <img
              src='/images/article.jpg'
              alt="Xícara de café com grãos de café ao redor"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="prose prose-amber lg:prose-lg max-w-none text-amber-950 text-lg">
            <p className="lead">
              O <b>café</b> é mais do que uma simples bebida; é uma experiência sensorial que começa muito antes da primeira xícara. O cuidado no preparo é essencial para extrair o melhor sabor e aroma dos grãos. Neste artigo, exploraremos os passos cruciais para um café perfeito.
            </p>
            <br></br>
            <h2 className='text-xl font-bold'>1. A Escolha dos Grãos</h2>
            <p>
              Tudo começa com a seleção dos grãos. Opte por grãos frescos e de qualidade, preferencialmente de torrefação recente. A frescura dos grãos é crucial para um sabor rico e complexo.
            </p>
            <br></br>
            <h2 className='text-xl font-bold'>2. A Moagem Adequada</h2>
            <p>
              A moagem correta é fundamental e varia de acordo com o método de preparo. Para cafeteiras de filtro, uma moagem média é ideal. Já para espresso, uma moagem fina é necessária.
            </p>
            <br></br>
            <h2 className='text-xl font-bold'>3. A Água Importa</h2>
            <p>
              Use água filtrada e na temperatura correta. Para a maioria dos métodos, a água deve estar entre 91°C e 96°C. Água muito quente pode extrair componentes amargos indesejados.
            </p>
            <br></br>
            <h2 className='text-xl font-bold'>4. Proporção Café-Água</h2>
            <p>
              A proporção ideal geralmente é de 1:16 (1 parte de café para 16 partes de água), mas pode ser ajustada ao gosto pessoal. Medir com precisão garante consistência no sabor.
            </p>
            <br></br>
            <h2 className='text-xl font-bold'>5. Tempo de Extração</h2>
            <p>
              O tempo de contato entre a água e o café é crucial. Para métodos de imersão como French Press, 4 minutos é o ideal. Para espresso, o tempo de extração deve ser entre 25 e 30 segundos.
            </p>
 <br></br>
            <p>
              O preparo do café é uma arte que requer atenção aos detalhes. Com estes cuidados, você estará no caminho certo para uma xícara de café excepcional. Lembre-se, a prática leva à perfeição, então não tenha medo de experimentar e ajustar de acordo com seu paladar.
            </p>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
};

export default CoffeeArticle;