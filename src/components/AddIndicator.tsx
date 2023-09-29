import React from 'react';

interface AddIndicatorProps{
  openCreatePopUp: boolean,
  setOpenCreatePopUp: (value: React.SetStateAction<boolean>) => void
}

const AddIndicator: React.FC<AddIndicatorProps> = ({openCreatePopUp, setOpenCreatePopUp}: AddIndicatorProps) => {

  return (
    <div onClick={() => setOpenCreatePopUp(!openCreatePopUp)} className='flex items-center justify-center'>
      <button className=' bg-[#952323] h-8 w-40 flex items-center justify-center ml-1  rounded-md'>
        <div className='text-white text-xs font-bold'> Atribuir indicador</div>
          {/* <img src="./src/assets/add.svg" alt="Adicionar indicador" /> */}
      </button>
    
    </div>


  );
};

export default AddIndicator;