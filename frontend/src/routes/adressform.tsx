import React, { useState } from 'react';
import axios from 'axios';

const AddressForm = () => {
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');


  const fetchAddress = async () => {
    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.data.erro) {
          setRua(response.data.logradouro);
        } else {
          alert("CEP não encontrado");
          setRua('');
        }
      } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
      }
    }
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="cep" className="block text-black">CEP</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onBlur={fetchAddress}
          className="w-full px-4 py-2 bg-white border border-amber-950 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
          placeholder=""
          required
        />
      </div>

      <div>
        <label htmlFor="numero" className="block text-black">Número</label>
        <input
          type="number"
          id="numero"
          name="numero"
          className="w-full px-4 py-2 bg-white border border-amber-950 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
          placeholder=""
          required
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="rua" className="block text-black">Rua</label>
        <input
          type="text"
          id="rua"
          name="rua"
          value={rua}
          onChange={(e) => setRua(e.target.value)} 
          className="w-full px-4 py-2 bg-white border border-amber-950 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
          placeholder=""
          required
        />
      </div>
    </form>
  );
};

export default AddressForm;
