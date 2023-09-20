import React from 'react';

const Order: React.FC = () => {

  
  return (
    <>
        <button className='rounded-2xl bg-[#952323] h-12 w-32 text-center flex items-center text-white font-bold'>
            <img src="./src/assets/filter_alt.svg" className='ml-4'/>
            <div className='flex grow'></div>
            <div className='mr-4'>Ordenar</div>
        </button>
    </>

  );
};

export default Order;