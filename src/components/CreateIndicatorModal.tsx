import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IndicatorModalProps{
    openPopUpCreateIndicator: boolean,
    setOpenPopUpCreateIndicator: (value: React.SetStateAction<boolean>) => void
}

const CreateIndicatorModal:  React.FC<IndicatorModalProps> = ({openPopUpCreateIndicator, setOpenPopUpCreateIndicator}: IndicatorModalProps) => {

    const [name, setName] = useState('')

    const [role, setRole] = useState('')


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value);
    };

    const postColaborator = async () => {

        const data = {
            name: name,
            role: role,
        }

        await axios.post('http://localhost:3000/colaborator', data)
            .then(response => console.log(response.data));
    }

    const notify = () => toast.error('Preencha todos os campos', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });;



    if(openPopUpCreateIndicator){
        return (
            <>
                <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-50">

                    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 -z-10"
                        onClick={() => setOpenPopUpCreateIndicator(!openPopUpCreateIndicator)}>
                    </div>

                    <div className="flex flex-col items-center bg-white rounded-xl w-96 h-auto px-8 py-4">
                        
                    {/* <span className='flex justify-left w-full cursor-pointer' onClick={() => setOpenPopUpCreateIndicator(!openPopUpCreateIndicator)}> Voltar </span>  */}
                       
                        <span className='flex justify-end w-full cursor-pointer' onClick={() => setOpenPopUpCreateIndicator(!openPopUpCreateIndicator)}>X</span>

                        <div className='flex flex-col gap-2 my-1 mb-2 items-center w-96 px-10'>
                                <div className='font-bold flex self-center text-lg'>Criar novo indicador</div>

                                <div className='flex flex-col gap-2'>
                                    <label>Nome do indicador</label>
                                    <input type="text" onChange={handleNameChange}
                                        className='flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg'/>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label>Peso</label>
                                    <input type="text" onChange={handleRoleChange}
                                         className='flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg' />
                                </div>
                                
                                <div className='flex flex-col gap-2'>
                                    <label>Unidade de medida</label>
                                    <input type="text" onChange={handleRoleChange}
                                         className='flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg' />
                                </div>
                                
                                <div className='flex flex-col gap-2'>
                                    <label>Meta</label>
                                    <input type="text" onChange={handleRoleChange}
                                         className='flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg' />
                                </div>
                                
                                <div className='flex flex-col gap-2'>
                                    <label>Supermeta</label>
                                    <input type="text" onChange={handleRoleChange}
                                         className='flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg' />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label>Desafio</label>
                                    <input type="text" onChange={handleRoleChange}
                                         className='flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg' />
                                </div>

                                <div className='mt-5'>

                                <button className='text-white bg-[#952323] w-72 py-3 rounded-xl'
                                onClick={() => setOpenPopUpCreateIndicator(!openPopUpCreateIndicator)}>
                                    Concluir
                                </button>

                                </div>



                        </div>



                    </div>

                        

                </div>
                <ToastContainer />

            </>
        );
    }
};

export default CreateIndicatorModal;