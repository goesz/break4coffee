import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

export default function Contact() {
    return (
        <main className="bg-gray-300 flex flex-col min-h-screen">
          <Navbar />
    
          <div className="flex-grow container mx-auto px-4 py-6">
            <h1 className="text-amber-950 text-2xl">Página de contato</h1>
            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            </div>
          </div>
    
          <Footer />
        </main>
      );
}

