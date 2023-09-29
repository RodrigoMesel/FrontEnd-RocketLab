import React, { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import search from '../assets/search.svg';

const SearchBar: React.FC = () => {

  const {filterText, setFilterText} = useContext(FilterContext)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Colaborador:', filterText);
  };

  

  return (
    <div className='flex items-center bg-[#FBFBFB] ml-4 mr-4 rounded-2xl'>
      <img src={search} alt="" className="h-4 w-4 ml-4" />
      <form onSubmit={handleSearchSubmit} className='flex-grow'>
        <input
          type="text"
          placeholder="Buscar colaboradores"
          className="p-2 w-full bg-[#FBFBFB] ml-1 mr-4 rounded-2xl outline-none"
          value={filterText}
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;