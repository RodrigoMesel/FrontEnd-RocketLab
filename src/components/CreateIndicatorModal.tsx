import axios from "axios";
import React, { useState, useContext, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IndicatorContext } from "../context/IndicatorContext";
import left from "../assets/left.svg";
import close from "../assets/left.svg";
import "react-toastify/dist/ReactToastify.css";

interface IndicatorModalProps {
  openPopUpCreateIndicator: boolean;
  setOpenPopUpCreateIndicator: (value: React.SetStateAction<boolean>) => void;
  indicadorCriado: boolean;
  setindicadorCriado: (value: React.SetStateAction<boolean>) => void;

}

const CreateIndicatorModal: React.FC<IndicatorModalProps> = ({
  openPopUpCreateIndicator,
  setOpenPopUpCreateIndicator,
  indicadorCriado,
  setindicadorCriado
}: IndicatorModalProps) => {
  const { openPopUpIndicator, setOpenPopUpIndicator } =
    useContext(IndicatorContext);
  const { id } = useParams();
  const userId = parseInt(id!, 10);
  const [name, setName] = useState("");
  const [unity, setUnitySelection] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [superGoal, setSuperGoal] = useState("");
  const [challenge, setChallenge] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUnitySelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUnitySelection(e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  };

  const handleSuperGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuperGoal(e.target.value);
  };

  const handleChallengeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChallenge(e.target.value);
  };

  const postCreateIndicator = async () => {
    try {
      const indicator = {
        unity: unity,
        name: name,
      };
      const postIndicatorResponse = await axios.post(
        "http://localhost:3000/indicator",
        indicator
      );

      const indicatorId = postIndicatorResponse.data.id;
      const colaboratorIndicator = {
        colaboratorId: userId,
        indicatorId: indicatorId,
        weight: parseFloat(weight),
        goal: parseFloat(goal),
        superGoal: parseFloat(superGoal),
        challenge: parseFloat(challenge),
      };

      await axios.post(
        "http://localhost:3000/colaborator-indicator",
        colaboratorIndicator
      ).then(() => setindicadorCriado(true))
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };

  const notify = () =>
    toast.error("Preencha todos os campos", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const goBack = () => {
    setOpenPopUpIndicator(true);
    setOpenPopUpCreateIndicator(false);
  };

  if (openPopUpCreateIndicator) {
    return (
      <>
        <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-50">
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 -z-10"
            onClick={() =>
              setOpenPopUpCreateIndicator(!openPopUpCreateIndicator)
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
                    setOpenPopUpCreateIndicator(!openPopUpCreateIndicator)
                  }
                >
                  <img src={close} alt="" className="h-3 w-3" />
                </div>
              </div>

              <div className="flex flex-col gap-2 my-1 mb-2 items-center w-96 px-10">
                <div className="font-bold text-l selft-center whitespace-nowrap">
                  Criar novo indicador
                </div>

                <div className="flex flex-col gap-2">
                  <label>Nome do indicador</label>
                  <input
                    type="text"
                    onChange={handleNameChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label>Peso</label>
                  <input
                    type="text"
                    onChange={handleWeightChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Unidade de medida</label>
                  <select
                    value={unity}
                    onChange={handleUnitySelectionChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                  >
                    <option value="" disabled hidden>
                      Selecione uma opção
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
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Supermeta</label>
                  <input
                    type="text"
                    onChange={handleSuperGoalChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Desafio</label>
                  <input
                    type="text"
                    onChange={handleChallengeChange}
                    className="flex w-72 px-2 py-1 border-2 border-solid border-zinc-500 rounded-lg"
                  />
                </div>

                <div className="mt-5">
                  <button
                    className="text-white bg-[#952323] w-72 py-3 rounded-xl"
                    onClick={() => {
                      if (
                        name !== "" &&
                        unity !== "" &&
                        weight !== "" &&
                        goal !== "" &&
                        superGoal !== "" &&
                        challenge !== ""
                      ) {
                        postCreateIndicator();
                        setOpenPopUpCreateIndicator(!openPopUpCreateIndicator);
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

export default CreateIndicatorModal;
