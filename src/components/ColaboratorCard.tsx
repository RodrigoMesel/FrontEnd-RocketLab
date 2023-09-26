import React from 'react';

const ColaboratorCard: React.FC = () => {

  
  return (
    <>
        <div className='flex flex-col rounded-2xl bg-[#FBFBFB] h-44 w-40 text-center items-center text-[#312843]'>
            <div className='flex items-center mt-5'>
                <div className='rounded-3xl bg-[#E5E5E5] h-12 w-12 flex items-center justify-center ml-1'>
                    <img src="./src/assets/person.svg" alt="Img colaborador" />
                </div>
            </div>
                <div className='font-bold mt-1'>Alice Martins</div>
                <div className=''>Marketing</div>


            <div className='flex items-center space-x-1 rounded-xl bg-[#6186D3] h-8 w-16 text-center text-white font-bold'>
                <img src="./src/assets/grade.svg" className='ml-4'/>
                <div className='mr-4'>9</div>
            </div>
        </div>
    </>

  );
};

export default ColaboratorCard;