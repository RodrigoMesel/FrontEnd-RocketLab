import React, {useContext} from 'react';
import retangulo from '../assets/retangulo.svg';
import edit from '../assets/edit.svg';
import EditIndicatorModal from "../components/EditIndicatorModal";
import { EditIndicatorContext  } from '../context/EditIndicatorContext';

// interface AddIndicatorProps {
//     openPopUpIndicator: boolean;
//     setOpenPopUpIndicator: (value: React.SetStateAction<boolean>) => void;
//     currentMonth: number; // Mês atual
//     monthToAddIndicator: number; // Mês para "atribuir indicador"
//   }
  
//   const AddIndicator: React.FC<AddIndicatorProps> = ({
//     openPopUpIndicator,
//     setOpenPopUpIndicator,
//     currentMonth,
//     monthToAddIndicator,
//   }: AddIndicatorProps) => 

interface Indicator {
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
  }

interface IndicatorCardProps {
    id: number;
    colaboratorId: number;
    indicatorId: number;
    result: number;
    weight: number;
    unity: string;
    goal: number;
    supergoal: number;
    challenge: number;
    creationMonth: number;
    name: string;
    openPopUpEditIndicator: boolean,
    setOpenPopUpEditIndicator: (value: React.SetStateAction<boolean>) => void,
    editingIndicator: Indicator | null,
    setEditingIndicator: (value: React.SetStateAction<Indicator | null>) => void,
}
  
export const IndicatorCard: React.FC<IndicatorCardProps> = ({id, colaboratorId, indicatorId, result, weight, goal, supergoal, challenge,unity,creationMonth, name, openPopUpEditIndicator, setOpenPopUpEditIndicator, editingIndicator, setEditingIndicator}) => {
    // const { openPopUpEditIndicator, setOpenPopUpEditIndicator } = useContext(
    //     EditIndicatorContext
    //   );
    const goalAchieved = result >= goal && result < supergoal ? 'bg-[#32B97C] text-white' : '';
    const superGoalAchieved = result >= supergoal && result < challenge ? ' bg-[#32B97C] p-1 font-bold text-white rounded-md' : '';
  return (
    <>
    <div className='bg-[#FBFBFB] p-6 rounded-xl  '>
        <div className='flex flex-row'> 
            <div>
            <div className="text-lg mt-3 ml-3 flex items-center">
                #{indicatorId} {name}
                <div className="ml-2 cursor-pointer " onClick={() => {{
                    setEditingIndicator({
                        id: id,
                        colaboratorId: colaboratorId, 
                        indicatorId: indicatorId,
                        result: result,
                        weight: weight,
                        unity: unity,
                        goal: goal,
                        superGoal: supergoal,
                        challenge: challenge,
                        creationMonth: creationMonth,
                        name: name,
                      })
                    setOpenPopUpEditIndicator(!openPopUpEditIndicator)
                }}}>
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
                <div >Meta</div>
                <div className={`font-bold text-lg ${superGoalAchieved}`}> {goal}</div>
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
