import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import home from '../assets/home.svg';
import homeRed from '../assets/homeRed.svg';
import groupRed from '../assets/groupRed.svg';

import group from '../assets/group.svg';
import settings from '../assets/settings.svg';
import logout from '../assets/logout.svg';

export const NavBar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isColaboratorsPage = location.pathname === '/colaboradores';
  const homeImage = isHomePage ? homeRed : home;
  const colaboratorsImage = isColaboratorsPage ? groupRed : group;

  return (
    <>
      <nav className='w-full h-96 text-white flex flex-col justify-between font-bold mr-3'>

        <Link to='/'>
          <div className='text-center text-2xl mb-2 flex justify-around'>V-FOODS</div>
        </Link>

        <div className="">
          <Link to='/'>
            <button className={`flex items-center space-x-2 mb-2 px-3 py-1 mr-3 ${isHomePage ? 'bg-white rounded-lg text-[#952323] px-2 py-1 w-full' : ''}`}>
              <img src={homeImage} alt="" className="h-6 w-6" /> {/* Use a variável homeImage */}
              <div className="text-base">Início</div>
            </button>
          </Link>
          <Link to='/colaboradores'>
          <button className={`flex items-center space-x-2 mb-2 px-3 py-1 mr-3 ${isColaboratorsPage ? 'bg-white rounded-lg text-[#952323] w-full' : ''}`}>
              <img src={colaboratorsImage} alt="" className="h-6 w-6" />
              <div className="text-base">Colaboradores</div>
            </button>
          </Link>
        </div>

        <div className="flex gap-2 flex-col">
          <button className='flex items-center space-x-2 mb-2 px-3 py-1 mr-3'> 
            <img src={settings} alt="" className="h-6 w-6" />
            <div className="text-base">Configurações</div>
          </button>
          <button className='flex items-center space-x-2 px-3 py-1 mr-3'>
            <img src={logout} alt="" className="h-6 w-6" />
            <div className="text-base">Sair</div>
          </button>
        </div>
      </nav>
    </>
  );
};
