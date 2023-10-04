import React from 'react';
import plus_sign from '../assets/plus_sign.svg';

interface AddIndicatorProps {
  openPopUpIndicator: boolean;
  setOpenPopUpIndicator: (value: React.SetStateAction<boolean>) => void;
  currentMonth: number; // Mês atual
  monthToAddIndicator: number; // Mês para "atribuir indicador"
}

const AddIndicator: React.FC<AddIndicatorProps> = ({
  openPopUpIndicator,
  setOpenPopUpIndicator,
  currentMonth,
  monthToAddIndicator,
}: AddIndicatorProps) => {

  const isButtonDisabled = currentMonth !== monthToAddIndicator;

  return (
    <div
      onClick={() => {
        if (!isButtonDisabled) {
          setOpenPopUpIndicator(!openPopUpIndicator);
        }
      }}
      className='flex items-center justify-center'
    >
      <button
        className={`bg-[#952323] h-6 w-40 flex items-center justify-center ml-1 space-x-1 rounded-md ${
          isButtonDisabled ? 'cursor-not-allowed bg-[#A3A3A3]' : ''
        }`}
        disabled={isButtonDisabled}
      >
        <img src={plus_sign} alt='' className='h-4 w-3' />
        <div className='text-white text-xs font-bold'>
          Atribuir indicador
        </div>
      </button>
    </div>
  );
};

export default AddIndicator;
