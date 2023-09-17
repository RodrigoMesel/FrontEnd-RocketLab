import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#E48586] px-4 py-2 w-1/6 text-white flex flex-col">
      {/* <div className="max-w-6xl mx-auto">
          <div className="text-white font-mono font-semibold text-xl">Sweet Shop</div>
      </div> */}
      <div className='text-center text-xl font-bold '>V-FOODS</div>
      
      <div className="grow h-28"></div>
      <button className='text-left font-semibold px-4'>Início</button>
      <button className='text-left font-semibold  px-4'> Colaboradores</button>
      <div className="grow h-28"></div>
      <button className='text-left font-semibold px-4'> Configurações</button>
      <button className='text-left font-semibold px-4'> Sair</button>

      
    </nav>
  );
};
