import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import left from '../assets/left.svg';
import close from '../assets/close.svg';
import { IndicatorContext } from '../context/IndicatorContext';

interface Indicator {
  id: number;
  name: string;
  unity: string;
}

interface IndicatorModalProps {
  openPopUpAssignIndicator: boolean;
  setOpenPopUpAssignIndicator: (value: React.SetStateAction<boolean>) => void;
}

const AssignIndicatorModal: React.FC<IndicatorModalProps> = ({
  openPopUpAssignIndicator,
  setOpenPopUpAssignIndicator,
}: IndicatorModalProps) => {
  const {openPopUpIndicator, setOpenPopUpIndicator} = useContext(IndicatorContext)
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
  const [filterText, setFilterText] = useState('');
  const [weight, setWeight] = useState<number | null>(null);
  const [goal, setGoal] = useState<number | null>(null);
  const [superGoal, setSuperGoal] = useState<number | null>(null);
  const [challenge, setChallenge] = useState<number | null>(null);

  const { id } = useParams();
  const userId = parseInt(id!, 10)
  
  useEffect(() => {
    // Fetch the indicators from the API when the component mounts
    axios.get('http://localhost:3000/indicator').then((response) => {
      setIndicators(response.data);
    });
  }, []);

  const handleIndicatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const selected = indicators.find((indicator) => indicator.id === selectedId);
    setSelectedIndicator(selected || null);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

 const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseFloat(e.target.value));
 };

 const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(parseInt(e.target.value));
 };

 const handleSuperGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuperGoal(parseInt(e.target.value));
 };

 const handleChallengeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChallenge(parseInt(e.target.value));
 };

  const filteredIndicators = indicators.filter((indicator) =>
    indicator.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const postColaboratorIndicator = async () => {
    if (!selectedIndicator) {
      return;
    }

    const data = {
        colaboratorId: userId,
        indicatorId: selectedIndicator.id,
        weight: weight,
        goal: goal,
        superGoal: superGoal,
        challenge: challenge
    };

    await axios.post('http://localhost:3000/colaborator-indicator', data).then((response) => {
      console.log(response.data);
    });
  };

  const notifyIndicator = () =>
    toast.error('Selecione um indicador', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

 const notify = () =>
    toast.error('Preencha os campos', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    const goBack = () => {
      setOpenPopUpIndicator(true);
      setOpenPopUpAssignIndicator(false);
    };
    const reset = () => {
      setSelectedIndicator(null); 
      setWeight(null);
      setGoal(null);
      setSuperGoal(null);
      setChallenge(null); 
    }

    if (openPopUpAssignIndicator && selectedIndicator===null){
  return (
    <>
        <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-50">
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 -z-10"
            onClick={() => setOpenPopUpAssignIndicator(!openPopUpAssignIndicator)}
          ></div>

          <div className="flex flex-col items-center bg-white rounded-xl w-96 h-auto px-8 py-4">
          <div className= "flex flex-row mt-2">      
                        <div className='flex w-full ml-7 cursor-pointer' onClick={() => {reset(); goBack();}}> 
                            <img src={left} alt="" className="h-3 w-3" />
                         </div> 
                        <div className='flex w-full ml-64 cursor-pointer' onClick={() => {setOpenPopUpAssignIndicator(!openPopUpAssignIndicator); reset();}}>
                            <img src={close} alt="" className="h-3 w-3" />
                        </div>
                    </div>

            <div className="flex flex-col gap-2 my-1 mb-2 items-center w-96 px-10">
              <div className="font-bold flex self-center text-lg">Atribuir indicador</div>

              <div className="flex flex-col gap-2">
                {/* <label>Selecione um indicador</label> */}
                <input type="text" onChange={handleFilterChange} value={filterText} className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg" placeholder="Filtrar indicadores" />
                <select onChange={handleIndicatorChange} className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg">
                  <option value="">Selecione um indicador</option>
                  {filteredIndicators.map((indicator) => (
                    <option key={indicator.id} value={indicator.id}>
                      {indicator.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <button
                  className="text-white bg-[#952323] w-72 py-3 rounded-xl"
                  onClick={() => {
                    notifyIndicator();
                  }}
                >
                  Concluir
                </button>
              </div>
            </div>
          </div>
        </div>
      <ToastContainer />
    </>
    )} else if (openPopUpAssignIndicator){
        return(
        <>
        <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-50">
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 -z-10"
            onClick={() => setOpenPopUpAssignIndicator(!openPopUpAssignIndicator)}
          ></div>

          <div className="flex flex-col items-center bg-white rounded-xl w-96 h-auto px-8 py-4">
          <div className= "flex flex-row mt-2">      
                        <div className='flex w-full ml-7 cursor-pointer' onClick={() => {reset(); goBack();}}> 
                            <img src={left} alt="" className="h-3 w-3" />
                         </div> 
                        <div className='flex w-full ml-64 cursor-pointer' onClick={() => {setOpenPopUpAssignIndicator(!openPopUpAssignIndicator); reset();}}>
                            <img src={close} alt="" className="h-3 w-3" />
                        </div>
                    </div>

            <div className="flex flex-col gap-2 my-1 mb-2 items-center w-96 px-10">
              <div className="font-bold flex self-center text-lg">Atribuir indicador</div>

              <div className="flex flex-col gap-2">
                {/* <label>Selecione um indicador</label> */}
                <input type="text" onChange={handleFilterChange} value={filterText} className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg" placeholder="Filtrar indicadores" />
                <select onChange={handleIndicatorChange} className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg">
                  <option value="">Selecione um indicador</option>
                  {filteredIndicators.map((indicator) => (
                    <option key={indicator.id} value={indicator.id}>
                      {indicator.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                                    <label>Peso</label>
                                    <input type="text" onChange={handleWeightChange}
                                         className='flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg' />
                                </div>
                                
                                <div className='flex flex-col gap-2'>
                                    <label>Meta</label>
                                    <input type="text" onChange={handleGoalChange}
                                         className='flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg' />
                                </div>
                                
                                <div className='flex flex-col gap-2'>
                                    <label>Supermeta</label>
                                    <input type="text" onChange={handleSuperGoalChange}
                                         className='flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg' />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label>Desafio</label>
                                    <input type="text" onChange={handleChallengeChange}
                                         className='flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg' />
                                </div>

              <div className="mt-5">
                <button
                  className="text-white bg-[#952323] w-72 py-3 rounded-xl"
                  onClick={() => {
                    if (weight === null || goal === null || superGoal === null || challenge === null){notify();
                    } else {
                        postColaboratorIndicator(); 
                        reset();
                        setOpenPopUpAssignIndicator(!openPopUpAssignIndicator)}
                  }}
                >
                  Concluir
                </button>
              </div>
            </div>
          </div>
        </div>
      <ToastContainer />
    </>
    )
    }
};

export default AssignIndicatorModal;
