import React from 'react';


interface IndicatorNotAchieveProps{
    nothingIndicators: {
        id: number;
        colaboratorId: number;
        indicatorId: number;
        result: number;
        creationMonth: number;
        weight: number;
        unity: string;
        goal: number;
        superGoal: number;
        challenge: number;
        name: string;
      }[];
      month: number,
      actualMonth: number
}

const IndicatorNotAchieve: React.FC<IndicatorNotAchieveProps> = ({nothingIndicators, month, actualMonth} : IndicatorNotAchieveProps) => {
  console.log(nothingIndicators)
  return (
    <div className='rounded-lg border border-solid py-8 px-3 flex flex-col max-w-xs gap-8 overflow-scroll'>

      <span className='text-lg'>Indicadores 
        <span className='font-bold'> não alcançados</span> 
        {month != actualMonth ? (
            <span> neste mês</span>
              ) : (
            <span> no mês anterior</span>
              )}
      </span>

      {nothingIndicators.length > 0 && nothingIndicators!.map((indicator, index) => (
                    <div key={index} className='flex flex-row justify-between items-center px-3 gap-5'>
                        <div className='flex flex-row max-w-sm items-center gap-2'>
                          <span className='rounded-xl bg-[#F16062] w-6 h-3'></span>
                          <span>{indicator.name} ({indicator.goal}{indicator.unity === "Percentual" &&"%"}):</span>
                        </div>

                        <span className='font-bold'>{indicator.result}{indicator.unity === "Percentual" &&"%"}</span>
                    </div>
                  ))}

      {nothingIndicators.length == 0 && 
            <span className='text-[#A3A3A3] text-lg text-center mt-5 flex'>Todos os indicadores foram alcançados!</span>
      }

    </div>


  );
};

export default IndicatorNotAchieve;