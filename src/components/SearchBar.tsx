import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Colaborador:', searchTerm);
  };

  

  return (
    <div className='flex items-center bg-[#FBFBFB] ml-4 mr-4 rounded-2xl'>
      <img src="./src/assets/search.svg" alt="" className="h-4 w-4 ml-4" />
      <form onSubmit={handleSearchSubmit} className='flex-grow'>
        <input
          type="text"
          placeholder="Buscar colaboradores"
          className="p-2 w-full bg-[#FBFBFB] ml-1 mr-4 rounded-2xl outline-none"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;