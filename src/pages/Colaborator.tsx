import React, { useState, useContext, useEffect } from 'react';
import SearchBar from '../components/SearchBar'
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import { getUserData } from '../utils/getUserData'
import ColaboratorImage from '../components/ColaboratorImage';
import BarChart from '../components/SemestralBarChart';
import DoughnutChart from '../components/MonthlyPercentageGraph';
import { getData } from "../utils/getData";
import { getMonthData } from "../utils/getMonthData";
import IndicatorCard from '../components/IndicatorCard';
import { getMonthStatistics } from '../utils/getMonthStatistics'; 
import ColaboratorGrade from '../components/ColaboratorGrade';
import grade from '../assets/grade.svg';
import AddIndicator from '../components/AddIndicator';
import { CreateColaboratorListContext } from '../context/CreateColaboratorListContext'
import StatsTextBox from "../components/StatsTextBox";
import ChangeMonthBox from "../components/ChangeMonthBox";
// import DownloadPdfButton from '../components/DownloadPdfButton';
import IndicatorModal from '../components/IndicatorModal'
import AddIndicatorTest from '../components/AddIndicatorTeste';
import { CreateIndicatorContext  } from '../context/CreateIndicatorContext'
import CreateIndicatorModal from '../components/CreateIndicatorModal';
import { IndicatorContext } from '../context/IndicatorContext';

type UserData = {
    id: number;
    name: string;
    grade: number;
    role: string;
  };
  
type MonthStatistics = {
    goal: number;
    superGoal: number;
    challenge: number;
    monthIndicators: Array<{
      id: number;
      name: string;
      weight: number;
      goal: number;
      superGoal: number;
      challenge: number;
  
    }>;
};

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
}

interface DoughnutChartProps {
  chartData: {
    goal: number;
    superGoal: number;
    challenge: number;
    nothing: number;
    monthGrade: number;
    nothingIndicators: Indicator[];
    monthIndicators: Indicator[];
  };
}

export default function Colaborator() {

    const { id } = useParams();
    const userId = parseInt(id!, 10)

    const [userData, setUserData] = useState<UserData>({ id: 0, name: "", grade: 0, role: "" });
    // Contexts
    const {openPopUpIndicator, setOpenPopUpIndicator} = useContext(IndicatorContext)
    const {openPopUpCreateIndicator, setOpenPopUpCreateIndicator} = useContext(CreateIndicatorContext)

    const [number, setNumber] = useState(5);
    const [doughnutChartData, setDoughnutChartData] = useState<DoughnutChartProps['chartData']>({
      goal: 0,
      superGoal: 0,
      challenge: 0,
      nothing: 0,
      monthGrade: 0,
      nothingIndicators: [],
      monthIndicators: [],
    });
    

    const incrementNumber = () => {
      setNumber(number + 1);
    };

    const decrementNumber = () => {
      setNumber(number - 1);
    };

    const [monthStats, loading] = getMonthStatistics(number, userId);

    const data = getUserData(userId);


    useEffect(() => {
        setUserData(data);
    }, [data]);

  return (
    <>
      <div className='mt-2'>
        <SearchBar />
      </div>
      
      {/* Card do Colaborador com nome, imagem, role e nota */}
      <div className='flex flex-row space-x-5 ml-5 mt-8 mr-4'>
        {/* {userData.id !== 0 ? (
          <> */}
        <ColaboratorImage/ >
        <div className='flex flex-col'>
            <div>{userData.role}</div>
            <div className='font-bold text-3xl'>{userData.name}</div>
        </div>

        <div>
          {/* <ColaboratorGrade 
          grade={userData.grade}
          ></ColaboratorGrade> */}
            <div className='flex items-center space-x-1 rounded-xl bg-[#6186D3] h-8 w-20 text-center text-white font-bold'>
                <img src={grade} className='ml-4'/>
                <div className='mr-4'>{userData.grade}</div>
            </div>

        </div>
          {/* </>
        ) : (
          <div>Carregando...</div>
        )} */}
        </div>

        <div className='flex flex-row space-x-24'> 

          <div className='mt-2 ml-5'> Indicadores</div>
          
          <div>
          <AddIndicator
            openPopUpIndicator={openPopUpIndicator}
            setOpenPopUpIndicator={setOpenPopUpIndicator}
          />
          </div>

          <AddIndicatorTest
            openPopUpCreateIndicator={openPopUpCreateIndicator}
            setOpenPopUpCreateIndicator={setOpenPopUpCreateIndicator}
          
          /> 

          
          <div className="grow ..."></div>
          <div> 
            <div className='flex flex-row space-x-1 mr-5'>
            <button onClick={decrementNumber}>-</button>
            <ChangeMonthBox monthNumber = {number}></ChangeMonthBox>
            <button onClick={incrementNumber}>+</button>
            </div>
          </div>
        </div>

        {/* Flex box da primeira linha de componentes */}
        <div className='flex flex-row space-x-24'> 

          {/* Cards dos indicadores */}
          <div className='flex flex-col space-y-2 ml-5 mt-3 h-96 overflow-scroll'>
            
                  {monthStats && monthStats.monthIndicators.map((indicator) => (
            <IndicatorCard
                id={indicator.id}
                name={indicator.name}
                weight={indicator.weight}
                goal={indicator.goal}
                supergoal={indicator.superGoal}
                challenge={indicator.challenge}
                result = {indicator.result}
            />

          ))}
          </div>  

          <div className='flex flex-col'> 
          <div className="rounded-lg border border-solid p-3">
            <div className="">
              <div className="w-full h-80">
                <DoughnutChart
                    chartData={getMonthData(`http://localhost:3000/colaborator-indicator/statistics/month/${number}/colaboratorId/${userId}`)}
                />
              </div>
            </div>
          </div>
          <div className="grow h-14 ..."></div>
          </div>
      </div>

      <div className="rounded-lg border border-solid p-3 mt-3 ml-5">
        <div className="w-2/3">

        <div className="flex pb-5 content-start justify-between">
          <div className=" text-4xs p-2">Evolução de resultados</div>
          <StatsTextBox txt={"Últimos 6 meses"} />
        </div>
          <div className="">
            <BarChart
              chartData={getData(
                `http://localhost:3000/colaborator-indicator/statistics/colaboratorId/${userId}`
              )}
              yAxisLabel="Indicadores" 
            />
          </div>
        </div>
      </div>

      < IndicatorModal
            openPopUpIndicator={openPopUpIndicator}
            setOpenPopUpIndicator={setOpenPopUpIndicator}
        ></ IndicatorModal>
      < CreateIndicatorModal
          openPopUpCreateIndicator={openPopUpCreateIndicator}
          setOpenPopUpCreateIndicator={setOpenPopUpCreateIndicator}
        ></ CreateIndicatorModal>

      
    </>
  )
}
