import React from 'react';
import { Link } from 'react-router-dom'

export const NavBar: React.FC = () => {
  return (
    <>
<nav className=' w-full h-96 text-white flex flex-col justify-between font-bold mr-3'>
    <div className='text-center text-2xl mb-2 flex justify-around'>V-FOODS</div>


    <div className="">
        <Link to='/'>
            <button className='flex items-center space-x-2 mb-2'>
                <img src="./src/assets/home.svg" alt="" className="h-6 w-6" />
                <div className="text-base">Início</div>
            </button>
        </Link>
        <Link to='/colaboradores'>
        <button className='flex items-center space-x-2'> 
            <img src="./src/assets/group.svg" alt="" className="h-6 w-6" />
            <div className="text-base">Colaboradores</div>
        </button>
        </Link>
    </div>

    <div className="flex gap-2 flex-col">

        <button className='flex items-center space-x-2 mb-2'> 
            <img src="./src/assets/settings.svg" alt="" className="h-6 w-6" />
            <div className="text-base">Configurações</div>
        </button>

        <button className='flex items-center space-x-2'>
            <img src="./src/assets/logout.svg" alt="" className="h-6 w-6" />
            <div className="text-base">Sair</div>
        </button>
    </div>
</nav>
</>
  );
};
