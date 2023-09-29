import React from 'react';
import person from '../assets/person.svg';

const ColaboratorImage: React.FC = () => {

  return (
    <>
        <div className='rounded-3xl bg-[#E5E5E5] h-12 w-12 flex items-center justify-center ml-1'>
            <img src={person} alt="Img colaborador" />
        </div>
    </>
  );
};

export default ColaboratorImage;