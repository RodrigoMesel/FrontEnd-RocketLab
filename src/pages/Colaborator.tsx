import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar'
import { getUserData } from '../utils/getUserData'
import ColaboratorImage from '../components/ColaboratorImage';
import BarChart from '../components/SemestralBarChart';
import DoughnutChart from '../components/MonthlyPercentageGraph';
import { getData } from "../utils/getData";
import { getMonthData } from "../utils/getMonthData";

type UserData = {
    id: number;
    name: string;
    grade: number;
    role: string;
  };

export default function Colaborator() {
  const [userData, setUserData] = useState<UserData>({ id: 0, name: "", grade: 0, role: "" });

  // No momento, estamos passando um id fixo! Precisa alterar isso depois
  const data = getUserData(63);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  return (
    <>
      <div className='mt-2'>
        <SearchBar />
      </div>
      <div className='flex flex-col  flex-column space-x-2 ml-5 mt-8 mr-4'>
        {/* {userData.id !== 0 ? (
          <> */}
          <ColaboratorImage/>
          <div className='flex flex-row  flex-column space-x-2 ml-5 mt-8 mr-4'>
            <div className='font-bold text-3xl'>{userData.name}</div>
            <div>{userData.role}</div>


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

      <div className="rounded-lg border border-solid p-3">
        <div className="">
          <div className="w-full h-80">
            <DoughnutChart
              chartData={getMonthData(
                "http://localhost:3000/colaborator-indicator/statistics/month/7/colaboratorId/64"
              )}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-solid p-3">
        <div className="">
          <div className="w-full">
            <BarChart
              chartData={getData(
                "http://localhost:3000/colaborator-indicator/statistics/colaboratorId/61"
              )}
              yAxisLabel="Colaboradores"
            />
          </div>
        </div>
      </div>
      
      
      
    </>
  )
}
