import axios from "axios";
import React from "react";

interface DeleteConfirmationProps{
    openPopUp: boolean,
    setOpenPopUp: (value: React.SetStateAction<boolean>) => void
    setUpdateData: (value: React.SetStateAction<boolean>) => void
    indicatorId: number
}


const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({openPopUp, setOpenPopUp, setUpdateData, indicatorId}) => {

    const deleteIndicator = async (id: number) => {
        await axios.delete(`http://localhost:3000/colaborator-indicator/${id}`)
        setUpdateData(true)
        setOpenPopUp(!openPopUp)
    }

    if(openPopUp){
        return (
            <>
                <div className="flex items-center justify-center 
                                fixed top-0 left-0 w-screen h-screen z-50">

                    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-40 -z-10"
                        onClick={() => setOpenPopUp(!openPopUp)}>
                    </div>

                    <div className="flex flex-col items-center bg-white rounded-xl w-96 h-auto px-8 py-4">
                        
                        <span className='flex justify-end w-full cursor-pointer' onClick={() => setOpenPopUp(!openPopUp)}>X</span> 

                        <span className="text-center font-bold text-xl mt-5">Você deseja deletar este indicador?</span>


                        <div className="flex flex-row justify-around w-[100%] mt-16 mb-5">
                            <button className="bg-[#D9D9D9] text-black rounded-xl px-4 py-3" onClick={() => setOpenPopUp(!openPopUp)}>Cancelar</button>

                            <button className="bg-[#952323] text-white rounded-xl px-4 py-3" onClick={() => deleteIndicator(indicatorId)}>Confirmar</button> 
                        </div>               

                    </div>
                </div>
            </>
        );
    }
};
export default DeleteConfirmation;
