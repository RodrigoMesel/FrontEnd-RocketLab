import React, { useContext, useState } from 'react';
import { SortedByContext } from '../context/SortedByContext';

interface ChangeListOrderModalProps{
    openPopUp: boolean,
    setOpenPopUp: (value: React.SetStateAction<boolean>) => void
}

const ChangeListOrderModal:  React.FC<ChangeListOrderModalProps> = ({openPopUp, setOpenPopUp}: ChangeListOrderModalProps) => {

    const {sortedByName, setSortedByName} = useContext(SortedByContext)

    const [partialValue, setPartialValue] = useState(sortedByName)


    if(openPopUp){
        return (
            <>
                <div className="flex items-center justify-center 
                                fixed top-0 left-0 w-screen h-screen z-50">

                    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 -z-10"
                        onClick={() => setOpenPopUp(!openPopUp)}>
                    </div>

                    <div className="flex flex-col items-center bg-white rounded-xl w-96 h-auto px-8 py-4">
                        
                        <span className='flex justify-end w-full cursor-pointer' onClick={() => setOpenPopUp(!openPopUp)}>X</span>

                        <div className='py-8 gap-16'>
                            <span className='font-bold flex justify-center'>Ordenar</span>

                            <div className='flex flex-col gap-7 my-10 justify-start w-96 px-10'>
                                <span className='font-bold'>Mostrar colaboradores por:</span>

                                <div className='flex gap-4 content-center'>
                                    <input type="checkbox" className='cursor-pointer' onClick={() => setPartialValue(false)} checked={!partialValue}/>
                                    <span>Ranking</span>
                                </div>

                                <div  className='flex gap-4 content-center'>
                                    <input type="checkbox" className='cursor-pointer' onClick={() => setPartialValue(true)} checked={partialValue}/>
                                    <span>Ordem alfabética</span>
                                </div>
                            </div>
                        </div>
                        
                        <button className='text-white bg-[#952323] w-80 py-3 rounded-xl'
                            onClick={() => Promise.all([setSortedByName(partialValue), setOpenPopUp(!openPopUp)])}>
                                Aplicar
                            </button>
                        

                    </div>



                </div>
            </>
        );
    }
};

export default ChangeListOrderModal;