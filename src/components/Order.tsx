import React from 'react';

interface OrderProps{
  openPopUp: boolean,
  setOpenPopUp: (value: React.SetStateAction<boolean>) => void
}

const Order: React.FC<OrderProps> = ({openPopUp, setOpenPopUp}: OrderProps) => {

  return (
    <div onClick={() => setOpenPopUp(!openPopUp)}>
        <button className='rounded-2xl bg-[#952323] h-12 w-32 text-center flex items-center text-white font-bold'>
            <img src="./src/assets/filter_alt.svg" className='ml-4'/>
            <div className='flex grow'></div>
            <div className='mr-4'>Ordenar</div>
        </button>
    </div>

  );
  
};

export default Order;