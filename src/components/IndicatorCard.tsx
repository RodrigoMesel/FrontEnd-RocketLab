import React from 'react';
import retangulo from '../assets/retangulo.svg';
import edit from '../assets/edit.svg';

interface IndicatorCardProps {
    id: number;
    name: string;
    weight: number;
    goal:  number;
    supergoal: number;
    challenge: number;
    result: number;
}
  
export const IndicatorCard: React.FC<IndicatorCardProps> = ({id, name, weight, goal, supergoal, challenge, result}) => {
  
  return (
    <>
    <div className='bg-[#FBFBFB] p-5 rounded-lg  '>
        <div className='flex flex-row'> 
            <div>
            <div className="text-lg mt-3 ml-3 flex items-center">
                #{id} {name}
                <div className="ml-2 cursor-pointer">
                    <img src={edit} alt="" className="h-3 w-3" />
                </div>
            </div>
            <div className='text-xs ml-3'> Peso: {weight.toFixed(2)}</div>
            </div>

            <div className="grow w-8 ..."></div>

            <div className='rounded-3xl bg-[#6186D3] h-12 w-12 flex items-center justify-center ml-1'>
                <div className='text-white text-xs font-bold'> {result}</div>
            </div>

        </div>
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
