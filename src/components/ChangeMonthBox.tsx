import { getMonthName } from '../utils/getMonthName';
import React from 'react';
import left from '../assets/left.svg';
import right from '../assets/right.svg';

interface ChangeMonthBoxProps {
  monthNumber: number;
  incrementNumber: () => void; 
  decrementNumber: () => void; 
}

const ChangeMonthBox: React.FC<ChangeMonthBoxProps> = ({
    monthNumber,
    incrementNumber,
    decrementNumber,
  }) => {
    const currentMonth = new Date().getMonth() + 1; // Mês atual

    const canDecrement = monthNumber > 1; 
    const canIncrement = monthNumber < currentMonth;

    const decrementButtonClass = canDecrement ? '' : 'opacity-40'; 
    const incrementButtonClass = canIncrement ? '' : 'opacity-40'; 

    return (
      <>
<div className="flex flex-row rounded-xl border border-solid w-36 px-2.5 py-1 border-[#D9D9D9]">
  <button
    onClick={canDecrement ? decrementNumber : undefined}
    disabled={!canDecrement}
    className={decrementButtonClass}
  >
    <img src={left} alt="" className="h-3 w-3" />
  </button>

  <p className="font-medium text-center px-2 text-[#A3A3A3] flex-1">
    {getMonthName(monthNumber - 1)}
  </p>

  <div className="ml-auto">
    <button
      onClick={canIncrement ? incrementNumber : undefined}
      disabled={!canIncrement}
      className={incrementButtonClass}
    >
      <img src={right} alt="" className="h-3 w-3" />
    </button>
  </div>
</div>

      </>
    );
};

export default ChangeMonthBox;