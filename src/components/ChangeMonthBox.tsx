
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
  return (
    <>
      <div className="flex flex-row rounded-xl border border-solid w-fit px-2.5 py-1 border-[#D9D9D9] space-x-1">
        <button onClick={decrementNumber}>
          <img src={left} alt="" className="h-3 w-3" />
        </button>

        <p className="font-medium text-base text-[#A3A3A3]">
          {getMonthName(monthNumber - 1)}
        </p>

        <button onClick={incrementNumber}>
          <img src={right} alt="" className="h-3 w-3" />
        </button>
      </div>
    </>
  );
};

export default ChangeMonthBox;
