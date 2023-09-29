import React from 'react';
import retangulo from '../assets/retangulo.svg';

interface IndicatorCardProps {
    name: string;
    weight: number;
    goal:  number;
    supergoal: number;
    challenge: number;
}
  
export const IndicatorCard: React.FC<IndicatorCardProps> = ({name, weight, goal, supergoal, challenge}) => {
  
  return (
    <>
    <div className='bg-[#FBFBFB] w-80 rounded-lg '>
        <div className='text-lg mt-3 ml-3'> {name}</div>
        <div className='text-xs ml-3'> Peso: {weight.toFixed(2)}</div>

        <div className='flex flex-row space-x-4 mt-3 ml-3'>

            <div className='flex flex-row'>
                <img src={retangulo} alt="" className="h-12 w-8" />
                <div className='flex flex-col'>
                    <div> Meta </div>
                    <div className='font-bold text-lg'> {goal}</div>
                </div>
            </div>

            <div className='flex flex-row'>
                <img src={retangulo} alt="" className="h-12 w-8" />
                <div className='flex flex-col'>
                    <div> Supermeta </div>
                    <div className='font-bold text-lg'> {supergoal}</div>
                </div>
            </div>

            <div className='flex flex-row'>
                <img src={retangulo} alt="" className="h-12 w-8" />
                
            <div className='flex flex-col'>
                <div> Desafio </div>
                <div className='font-bold text-lg'> {challenge}</div>
            </div>
            </div>

        </div>

    </div>
    </>
  );
};

export default IndicatorCard;
