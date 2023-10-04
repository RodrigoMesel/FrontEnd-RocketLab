import 'react-toastify/dist/ReactToastify.css';
import React, { useContext } from 'react';
import { CreateIndicatorContext  } from '../context/CreateIndicatorContext';
import { AssignIndicatorContext  } from '../context/AssignIndicatorContext';
import close from '../assets/close.svg';

interface IndicatorModalProps{
    openPopUpIndicator: boolean,
    setOpenPopUpIndicator: (value: React.SetStateAction<boolean>) => void
}

const IndicatorModal:  React.FC<IndicatorModalProps> = ({openPopUpIndicator,setOpenPopUpIndicator}: IndicatorModalProps) => {


    const {openPopUpCreateIndicator, setOpenPopUpCreateIndicator} = useContext(CreateIndicatorContext )
    const {openPopUpAssignIndicator, setOpenPopUpAssignIndicator} = useContext(AssignIndicatorContext )

    // Abrir os outros modais
    const openSecondModal = () => {
        setOpenPopUpIndicator(false);
        setOpenPopUpCreateIndicator(true);
    };
    const openThirdModal = () => {
        setOpenPopUpIndicator(false);
        setOpenPopUpAssignIndicator(true);
    };

    if(openPopUpIndicator){
        return (
            <>
                <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-50">

                    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 -z-10"
                        onClick={() => setOpenPopUpIndicator(!openPopUpIndicator)}>
                    </div>

                    <div className="flex flex-col items-center bg-white rounded-xl w-96 h-auto px-8 py-4">

                    <div className= "flex flex-row mt-2">      
                        <div className='flex-grow'> 
                            
                         </div> 
                         <div className='flex w-full ml-64 cursor-pointer' onClick={() => setOpenPopUpIndicator(!openPopUpIndicator)}>
                            <img src={close} alt="" className="h-3 w-3" />
                        </div>
                    </div>
                        
                    

                        <div className='flex flex-col gap-5 my-4 mb-10 items-start w-96 px-10'>
                                <div className='font-bold flex self-center text-lg'>Atribuir indicador</div>
                                <button className='text-white bg-[#952323] w-80 py-3 rounded-xl' onClick={openSecondModal}>
                                    Criar novo indicador
                                </button>

                                <div className='flex self-center'>ou</div>

                                <button className='text-white bg-[#952323] w-80 py-3 rounded-xl' onClick={openThirdModal}>
                                    Atribuir novo indicador
                                </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default IndicatorModal;