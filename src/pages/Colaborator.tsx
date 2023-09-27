import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar'
import { getUserData } from '../utils/getUserData'
import ColaboratorImage from '../components/ColaboratorImage';

type UserData = {
    id: number;
    name: string;
    grade: number;
    role: string;
  };

export default function Colaborator() {
  const [userData, setUserData] = useState<UserData>({ id: 0, name: "", grade: 0, role: "" });

  // No momento, estamos passando um id fixo! Precisa alterar isso depois
  const data = getUserData(2);

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
        
      <div className='flex'>
        <div className='flex flex-row justify-items-start px-10 py-10' style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        </div>
        <div className="grow h-14 ..."></div>
      </div>
    </>
  )
}
