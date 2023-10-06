import React,  {  useContext, useState  } from 'react';

import { IndicatorContext } from "../context/IndicatorContext";
import AddIndicator from './AddIndicator';

interface NoIndicatorCardProps {
  month: number;
  currentMonth: number;
  activeUser: boolean
}

export const NoIndicatorsCard: React.FC<NoIndicatorCardProps> = ({month, currentMonth, activeUser}) => {
    const { openPopUpIndicator, setOpenPopUpIndicator } =
    useContext(IndicatorContext);

  return (
    <>
    <div className='flex flex-col bg-[#F5F5F5] px-10  py-10 rounded-lg opacity-42 space-y-5'>
      {activeUser ? (<div className='text-[#312843] text-center mx-4'>Nenhum indicador foi atribuído a este colaborador neste mês.</div>) 
      : (<div className='text-[#312843] text-center mx-4'>Nenhum indicador foi atribuído a este colaborador.</div>)}
        
        {currentMonth === month ? (<AddIndicator
                openPopUpIndicator={openPopUpIndicator}
                setOpenPopUpIndicator={setOpenPopUpIndicator}
                currentMonth={currentMonth}
                monthToAddIndicator={month}
              />) : (null)}
        
    </div>
    </>
  );
};

export default NoIndicatorsCard;
