import React from 'react';

interface AddColaboratorProps{
  openCreatePopUp: boolean,
  setOpenCreatePopUp: (value: React.SetStateAction<boolean>) => void
}

const AddColaborator: React.FC<AddColaboratorProps> = ({openCreatePopUp, setOpenCreatePopUp}: AddColaboratorProps) => {

  
  return (
    <div onClick={() => setOpenCreatePopUp(!openCreatePopUp)} className='flex items-center justify-center'>
      <button className='rounded-3xl bg-[#952323] h-12 w-12 flex items-center justify-center ml-1'>
          <img src="./src/assets/add.svg" alt="Adicionar colaborador" />
      </button>
    
    </div>


  );
};

export default AddColaborator;