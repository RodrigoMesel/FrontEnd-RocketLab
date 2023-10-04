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
}

const IndicatorNotAchieve: React.FC<IndicatorNotAchieveProps> = ({nothingIndicators} : IndicatorNotAchieveProps) => {

  console.log(nothingIndicators)
  return (
    <div className='rounded-lg border border-solid py-8 px-3 flex flex-col max-w-xs h-[21.8rem] gap-8 overflow-scroll'>

      <span className='text-2xl'>Indicadores <span className='font-bold'>não alcançados</span> neste mês</span>

      {nothingIndicators!.map((indicator, index) => (
                    <div key={index} className='flex flex-row justify-between items-center px-3 gap-5'>
                        <div className='flex flex-row max-w-sm items-center gap-2'>
                          <span className='rounded-xl bg-[#F16062] w-6 h-3'></span>
                          <span>{indicator.name} ({indicator.goal}):</span>
                        </div>

                        <span className='font-bold'>{indicator.result}</span>
                    </div>
                  ))}

    </div>


  );
};

export default IndicatorNotAchieve;