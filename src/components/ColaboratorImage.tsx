import React from 'react';

const ColaboratorImage: React.FC = () => {

  return (
    <>
        <div className='rounded-3xl bg-[#E5E5E5] h-12 w-12 flex items-center justify-center ml-1'>
            <img src="./src/assets/person.svg" alt="Img colaborador" />
        </div>
    </>
  );
};

export default ColaboratorImage;