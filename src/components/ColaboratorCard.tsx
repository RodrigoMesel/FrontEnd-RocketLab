import React from 'react';
import ColaboratorImage from './ColaboratorImage';
import { Link } from 'react-router-dom';

interface ColaboratorParams {
    id: number,
    name: string,
    role: string,
    grade: number
  } 

const ColaboratorCard: React.FC<ColaboratorParams> = ({id, name, role, grade}: ColaboratorParams) => {

  const bgColor = (grade <= 1 && grade >= 0) ? 'bg-[#952323]' : (grade <= 2.5 && grade > 1) ? 'bg-[#AC72C1]' : 
                    ((grade < 4 && grade > 2.5) ) ? 'bg-[#32B97C]' : 'bg-[#6186D3]'
  
  return (
    <>
      <Link to={`/colaborador/${id}`}>

          <div className='flex flex-col rounded-2xl bg-[#FBFBFB] h-44 w-40 text-center items-center text-[#312843]'>
              <div className='flex items-center mt-5'>
                  <ColaboratorImage/>
              </div>
                  <div className='font-bold mt-1'>{name}</div>
                  <div className=''>{role}</div>


              <div className={`flex items-center justify-center space-x-1 rounded-xl ${bgColor} h-8 w-16 text-center text-white font-bold`}>
                  <img src="./src/assets/grade.svg"/>
                  <div className='mr-4'>{grade}</div>
              </div>
          </div>
        </Link>
    </>

  );
};

export default ColaboratorCard;