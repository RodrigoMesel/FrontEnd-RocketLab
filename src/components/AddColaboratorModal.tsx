import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface AddColaboratorModalProps{
    openCreatePopUp: boolean,
    setOpenCreatePopUp: (value: React.SetStateAction<boolean>) => void
    UpdateData: boolean;
    setUpdateData: (value: React.SetStateAction<boolean>) => void;
}

const AddColaboratorModal:  React.FC<AddColaboratorModalProps> = ({openCreatePopUp, setOpenCreatePopUp, setUpdateData, UpdateData}: AddColaboratorModalProps) => {

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
            .then(() => setUpdateData(true));
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



    if(openCreatePopUp){
        return (
            <>
                <div className="flex items-center justify-center 
                                fixed top-0 left-0 w-screen h-screen z-50">

                    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 -z-10"
                        onClick={() => setOpenCreatePopUp(!openCreatePopUp)}>
                    </div>

                    <div className="flex flex-col items-center bg-white rounded-xl w-96 h-auto px-8 py-4">
                        
                       
                        <span className='flex justify-end w-full cursor-pointer' onClick={() => setOpenCreatePopUp(!openCreatePopUp)}>X</span>

                        <div className='flex flex-col gap-7 my-4 mb-10 items-start w-96 px-10'>
                                <span className='font-bold flex self-center'>Adicionar colaborador</span>

                                <div className='flex flex-col gap-2'>
                                    <label>Nome do colaborador:</label>
                                    <input type="text" onChange={handleNameChange}
                                        className='flex w-72 px-2 py-3 border-2 border-solid border-zinc-500 rounded-lg'/>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label>Área:</label>
                                    <input type="text" onChange={handleRoleChange}
                                         className='flex w-72 px-2 py-3 border-2 border-solid border-zinc-500 rounded-lg' />
                                </div>

                        </div>

                        <button className='text-white bg-[#952323] w-80 py-3 rounded-xl'
                            onClick={() =>  {
                                        if(name !== '' && role !== '') {
                                            postColaborator(); 
                                            setOpenCreatePopUp(!openCreatePopUp);
                                        } else{
                                            notify()
                                        }

                                        }}>
                                Concluir
                        </button>

                    </div>

                        

                </div>
                <ToastContainer />

            </>
        );
    }
};

export default AddColaboratorModal;