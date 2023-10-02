import React, { useState, useEffect } from 'react';
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
import DownloadPdfButton from '../components/DownloadPdfButton';

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

export default function Colaborator() {

    const { id } = useParams();
    const userId = parseInt(id!, 10)

    const [userData, setUserData] = useState<UserData>({ id: 0, name: "", grade: 0, role: "" });
    
    // UserID está sendo passado, o mês está fixo (em todas as requisições aqui)
    const [monthStats, loading] = getMonthStatistics(2, userId); 

    const data = getUserData(userId);

    useEffect(() => {
        setUserData(data);
    }, [data]);

  return (
    <>
      <div className='mt-2'>
        <SearchBar />
      </div>
      
      <div className='flex flex-row space-x-5 ml-5 mt-8 mr-4'>
        {/* {userData.id !== 0 ? (
          <> */}

        <ColaboratorImage/>
        <div className='flex flex-col'>
            <div>{userData.role}</div>
            <div className='font-bold text-3xl'>{userData.name}</div>
        </div>


        <div>
            <div className='flex items-center space-x-1 rounded-xl bg-[#6186D3] h-8 w-16 text-center text-white font-bold'>
                <img src="./src/assets/grade.svg" className='ml-4'/>
                <div className='mr-4'>{userData.grade}</div>
            </div>
        </div>

   
          {/* </>
        ) : (
          <div>Carregando...</div>
        )} */}
        </div>

        <div className='flex flex-col space-y-2'>
                {monthStats && monthStats.monthIndicators.map((indicator) => (
          <IndicatorCard
              key={indicator.id}
              name={indicator.name}
              weight={indicator.weight}
              goal={indicator.goal}
              supergoal={indicator.superGoal}
              challenge={indicator.challenge}
          />
        ))}

        </div>  

        <DownloadPdfButton
          onClick={() => console.log("funcionou")} // Botar a função que tu quiser Gabriel
        ></DownloadPdfButton>

        <div className="rounded-lg border border-solid p-3">
        <div className="">
          <div className="w-full h-80">
            <DoughnutChart
                chartData={getMonthData(`http://localhost:3000/colaborator-indicator/statistics/month/7/colaboratorId/${userId}`)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-solid p-3">
        <div className="">
          <div className="w-full">
            <BarChart
              chartData={getData(
                `http://localhost:3000/colaborator-indicator/statistics/colaboratorId/${userId}`
              )}
              yAxisLabel="Colaboradores"
            />
          </div>
        </div>
      </div>
    </>
  )
}
