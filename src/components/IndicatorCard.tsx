import React from 'react';
import retangulo from '../assets/retangulo.svg';
import retanguloRoxo from '../assets/retanguloRoxo.svg';
import retanguloVerde from '../assets/retanguloVerde.svg';
import retanguloAzul from '../assets/retanguloAzul.svg';
import check from '../assets/check.svg';
import edit from '../assets/edit.svg';

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
    month: number;
    currentMonth: number;
}
  
export const IndicatorCard: React.FC<IndicatorCardProps> = ({id, colaboratorId, indicatorId, result, weight, goal, supergoal, challenge,unity,creationMonth, name, openPopUpEditIndicator, setOpenPopUpEditIndicator, editingIndicator, setEditingIndicator, month, currentMonth}) => {
    const showResult = (month !== currentMonth || result !== 0);
    const goalAchieved = result >= goal && result < supergoal 
    const superGoalAchieved = result >= supergoal && result < challenge 
    const challengeAchieved = result >= challenge

    const colorResult = goalAchieved
    ? 'bg-[#AC72C1]'
    : superGoalAchieved
    ? 'bg-[#32B97C]'
    : challengeAchieved
    ? 'bg-[#6186D3]'
    : 'bg-[#F16062]';

    const sizeResultComponent = result.toString().length > 3 ? 'w-16' : 'w-12';
    return (
        <>
        {showResult ? (
            // Card dos meses anteriores
            <div className='bg-[#FBFBFB] p-6 rounded-xl  '>
            <div className='flex flex-row'> 
                <div>
                <div className="text-lg mt-3 ml-6 flex items-center">
                    #{indicatorId} {name} 
                    {month === currentMonth ? (
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
                    ) : (
                        ""
                    )}
                    
                </div>
                <div className='text-xs ml-6'> Peso: {weight.toFixed(2)}</div>
                </div>
    
                <div className="grow w-8 ..."></div>
    
                <div className={`rounded-3xl h-12 flex items-center justify-center ml-1 ${colorResult} ${sizeResultComponent}`}>
                    <div className='text-white text-base font-bold'> {result}</div>
                </div>
    
            </div>
            <div className='flex flex-row space-x-4 mt-3 ml-3'>
                {goalAchieved ? (
                    <div className='flex flex-row'>
                        <img src={retanguloRoxo} alt="" className="h-12 w-8" />
                        <div className='flex flex-col'>
                            <div >Meta</div>
                            <div className="bg-[#AC72C1] flex flex-row px-2 h-7 text-lg font-bold items-center text-white rounded-md">
                                <img src={check} alt="" className="h-4 w-4 mr-2" />
                                {goal}
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className='flex flex-row'>
                            <img src={retangulo} alt="" className="h-12 w-8" />
                            <div className='flex flex-col'>
                                <div >Meta</div>
                                <div className="font-bold text-lg"> {goal}</div>
                            </div>
                        </div>
                    )}
                {superGoalAchieved ? (
                    <div className='flex flex-row'>
                        <img src={retanguloVerde} alt="" className="h-12 w-8" />
                        <div className='flex flex-col'>
                            <div>Supermeta</div>
                            <div className="bg-[#32B97C] flex flex-row px-2 h-7 text-lg font-bold items-center text-white rounded-md">
                                <img src={check} alt="" className="h-4 w-4 mr-2" />
                                {supergoal}
                            </div>
                        </div>
                    </div>
                
                    ) : (
                        <div className='flex flex-row'>
                            <img src={retangulo} alt="" className="h-12 w-8" />
                            <div className='flex flex-col'>
                                <div>Supermeta</div>
                                <div className="font-bold text-lg"> {supergoal}</div>
                            </div>
                        </div>
                    )}
                {challengeAchieved ? (
                    <div className='flex flex-row'>
                        <img src={retanguloAzul} alt="" className="h-12 w-8" />
                        <div className='flex flex-col'>
                            <div>Desafio</div>
                            <div className="bg-[#6186D3] flex flex-row px-2 h-7 text-lg font-bold items-center text-white rounded-md">
                                <img src={check} alt="" className="h-4 w-4 mr-2" />
                                {challenge}
                            </div>
                        </div>
                    </div>
                    
                    ) : (
                    <div className='flex flex-row'>
                        <img src={retangulo} alt="" className="h-12 w-8" />
                    <div className='flex flex-col'>
                        <div> Desafio </div>
                        <div className='font-bold text-lg'> {challenge}</div>
                    </div>
                    </div>
                    )}
            </div>
        </div>
            ) : (
                // Card do mês atual
                <div className='bg-[#FBFBFB] p-6 rounded-xl  '>
                <div className='flex flex-row'> 
                    <div>
                    <div className="text-lg mt-3 ml-6 flex items-center">
                        {name} 
                        {month === currentMonth ? (
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
                        ) : (
                            ""
                        )}
                        
                    </div>
                    <div className='text-xs ml-6'> Peso: {weight.toFixed(2)}</div>
                    </div>
        
                    <div className="grow w-8 ..."></div>
        
                    <div className='rounded-3xl bg-[#D9D9D9] h-12 w-12 flex items-center justify-center ml-1'>
                        <div className='text-black text-xs font-bold'> - </div>
                    </div>
        
                </div>
                <div className='flex flex-row space-x-4 mt-3 ml-3'>
        
                    <div className='flex flex-row'>
                        <img src={retangulo} alt="" className="h-12 w-8" />
                        <div className='flex flex-col'>
                        <div >Meta</div>
                        <div className="font-bold text-l"> {goal}</div>
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
        )}

        </>
    );
};

export default IndicatorCard;
