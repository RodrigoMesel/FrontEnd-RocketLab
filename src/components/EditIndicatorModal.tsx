import axios from "axios";
import React, { useState, useContext, ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IndicatorContext } from "../context/IndicatorContext";
import left from "../assets/left.svg";
import close from "../assets/close.svg";
import "react-toastify/dist/ReactToastify.css";

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

interface EditIndicatorModalProps {
  openPopUpEditIndicator: boolean;
  setOpenPopUpEditIndicator: (value: React.SetStateAction<boolean>) => void;
  editingIndicator: Indicator | null,
  setEditingIndicator: (value: React.SetStateAction<Indicator | null>) => void;
  UpdateData: boolean;
  setUpdateData: (value: React.SetStateAction<boolean>) => void;
}

const EditIndicatorModal: React.FC<EditIndicatorModalProps> = ({
  openPopUpEditIndicator,
  setOpenPopUpEditIndicator,
  editingIndicator,
  setEditingIndicator,
  UpdateData,
  setUpdateData
}: EditIndicatorModalProps) => {
  const { openPopUpIndicator, setOpenPopUpIndicator } =
    useContext(IndicatorContext);
  const { id } = useParams();
  const userId = parseInt(id!, 10);
  const [name, setName] = useState<string | null>(null);
  const [unity, setUnitySelection] = useState<string | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [goal, setGoal] = useState<number | null>(null);
  const [superGoal, setSuperGoal] = useState<number | null>(null);
  const [challenge, setChallenge] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
// const [name, setName] = useState<string | null>(editingIndicator?.name || null);

// const [weight, setWeight] = useState<number | null>(editingIndicator?.weight || null);
// const [goal, setGoal] = useState<number | null>(editingIndicator?.goal || null);
// const [superGoal, setSuperGoal] = useState<number | null>(editingIndicator?.superGoal || null);
// const [challenge, setChallenge] = useState<number | null>(editingIndicator?.challenge || null);
// const [result, setResult] = useState<number | null>(editingIndicator?.result || null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUnitySelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUnitySelection(e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseFloat(e.target.value));
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(parseFloat(e.target.value));
  };

  const handleSuperGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuperGoal(parseFloat(e.target.value));
  };

  const handleChallengeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChallenge(parseFloat(e.target.value));
  };

  const handleResultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResult(parseFloat(e.target.value));
  };

  const patchEditIndicator = async () => {
    try {
      const indicatorData = {
        id: editingIndicator?.indicatorId,
        name: name,
        unity: unity
      };
      console.log(indicatorData);
      const colaboratorIndicatorData = {
        id: editingIndicator?.id,
        colaboratorId: editingIndicator?.colaboratorId,
        indicatorId: editingIndicator?.indicatorId,
        result: result,
        creationMonth: editingIndicator?.creationMonth,
        weight: weight,
        goal: goal,
        superGoal: superGoal,
        challenge: challenge
      };

      const patchIndicatorResponse = await axios.patch(
        `http://localhost:3000/indicator/${indicatorData.id}`,
        indicatorData
      );

      const patchColaboratorIndicatorResponse = await axios.patch(
        `http://localhost:3000/colaborator-indicator/${colaboratorIndicatorData.id}`,
        colaboratorIndicatorData
      );

      setUpdateData(true);

    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };

  const notify = () =>
    {
    toast.error("Preencha todos os campos", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    
    });}

  const goBack = () => {
    // reset();
    setOpenPopUpIndicator(true);
    setOpenPopUpEditIndicator(false);
  };
  const reset = () => {
    setName(null)
    setWeight(null);
    setGoal(null);
    setSuperGoal(null);
    setChallenge(null);
    setResult(null);
    setUnitySelection(null)
  }

  useEffect(() => {
    const setData = async () => {
      try {
        if (editingIndicator?.name !== undefined) {setName(editingIndicator.name);}
        if (editingIndicator?.weight !== undefined) {setWeight(editingIndicator.weight);}
        if (editingIndicator?.goal !== undefined) {setGoal(editingIndicator.goal);}
        if (editingIndicator?.superGoal !== undefined) {setSuperGoal(editingIndicator.superGoal);}
        if (editingIndicator?.challenge !== undefined) {setChallenge(editingIndicator.challenge);}
        if (editingIndicator?.result !== undefined) {setResult(editingIndicator.result);}
        if (editingIndicator?.unity !== undefined) {setUnitySelection(editingIndicator.unity);}
      } catch (error) {
        console.error("Erro ao atribuir valores aos campos do indicador:", error);
      }
    };

    setData();
  }, [editingIndicator?.id]);

  if (openPopUpEditIndicator) {
    return (
      <>
        <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-50">
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 -z-10"
            onClick={() =>
              {
                // reset();
                setOpenPopUpEditIndicator(!openPopUpEditIndicator);}
            }
          ></div>

          <div className="flex flex-col items-center bg-white rounded-xl w-96 h-auto px-8 py-4">
            <div>
              <div className="flex flex-row mt-2">
                <div
                  className="flex w-full ml-7 cursor-pointer"
                  onClick={goBack}
                >
                  <img src={left} alt="" className="h-3 w-3" />
                </div>
                <div
                  className="flex w-full ml-64 cursor-pointer"
                  onClick={() =>
                    {
                        // reset();
                        setOpenPopUpEditIndicator(!openPopUpEditIndicator);
                    }
                  }
                >
                  <img src={close} alt="" className="h-3 w-3" />
                </div>
              </div>

              <div className="flex flex-col gap-2 my-1 mb-2 items-center w-96 px-10">
                <div className="font-bold text-l selft-center whitespace-nowrap">
                  Editar o indicador
                </div>

                <div className="flex flex-col gap-2">
                  <label>Nome do indicador</label>
                  <input
                    type="text"
                    onChange={handleNameChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                    defaultValue={editingIndicator?.name}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label>Peso</label>
                  <input
                    type="text"
                    onChange={handleWeightChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                    defaultValue={editingIndicator?.weight}
                  />
                </div>

               

                <div className="flex flex-col gap-1">
                  <label>Unidade de medida </label>
                  <select
                    
                    value={unity || ""}
                    onChange={handleUnitySelectionChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                    // defaultValue={editingIndicator?.unity}
                  >
                    <option value="" disabled hidden>
                      {editingIndicator?.unity}
                    </option>
                    <option value="Numero">Número</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Percentual">Percentual</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Meta</label>
                  <input
                    type="text"
                    onChange={handleGoalChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                    defaultValue={editingIndicator?.goal}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Supermeta</label>
                  <input
                    type="text"
                    onChange={handleSuperGoalChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                    defaultValue={editingIndicator?.superGoal}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Desafio</label>
                  <input
                    type="text"
                    onChange={handleChallengeChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                    defaultValue={editingIndicator?.challenge}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Resultado</label>
                  <input
                    type="text"
                    onChange={handleResultChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                    defaultValue={editingIndicator?.result}
                  />
                </div>

                <div className="mt-5">
                  <button
                    className="text-white bg-[#952323] w-72 py-3 rounded-xl"
                    onClick={() => {
                      if (
                        name !== "" &&
                        unity !== "" &&
                        weight !== null &&
                        goal !== null &&
                        superGoal !== null &&
                        challenge !== null &&
                        result !== null
                      ) {
                        patchEditIndicator();
                        // reset();
                        setOpenPopUpEditIndicator(!openPopUpEditIndicator);
                      } else {
                        notify();
                      }
                    }}
                  >
                    Concluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }
};

export default EditIndicatorModal;
