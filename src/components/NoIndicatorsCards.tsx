import React,  {  useContext, useState  } from 'react';

import { IndicatorContext } from "../context/IndicatorContext";
import AddIndicator from './AddIndicator';

export const NoIndicatorsCard: React.FC = () => {
    const { openPopUpIndicator, setOpenPopUpIndicator } =
    useContext(IndicatorContext);
    const currentMonth = new Date().getMonth() + 1; // Mês atual
    const [month, setNumber] = useState(currentMonth);

  return (
    <>
    <div className='flex flex-col bg-[#F5F5F5] px-10  py-10 rounded-lg opacity-42 space-y-5'>
        <div className='text-[#312843] text-center mx-4'>Nenhum indicador foi atribuído a este colaborador.</div>
        <AddIndicator
                openPopUpIndicator={openPopUpIndicator}
                setOpenPopUpIndicator={setOpenPopUpIndicator}
                currentMonth={currentMonth}
                monthToAddIndicator={month}
              />
    </div>
    </>
  );
};

export default NoIndicatorsCard;
