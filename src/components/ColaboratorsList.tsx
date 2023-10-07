import { useContext, useEffect, useState } from "react";
import { SortedByContext } from "../context/SortedByContext";
import { FilterContext } from "../context/FilterContext";
import axios from "axios";
import ColaboratorCard from "./ColaboratorCard";
import { CreateColaboratorListContext } from "../context/CreateColaboratorListContext";

interface Colaborator {
    id: number,
    name: string,
    grade: number,
    role: string
}
  
interface SeparetedByName {
    initial: string,
    colaborators: Colaborator[]
}

interface SeparetedByGrade {
    grade4_5: Colaborator[] ,
    grade3_4: Colaborator[] ,
    grade2_3: Colaborator[] ,
    grade1_2: Colaborator[] ,
    grade0_1: Colaborator[] ,
}

interface ColaboratorListProps {
    UpdateData: boolean;
    setUpdateData: (value: React.SetStateAction<boolean>) => void;
}


const ColaboratorList: React.FC<ColaboratorListProps> = ({UpdateData, setUpdateData}) => {

    const {openCreatePopUp} = useContext(CreateColaboratorListContext)
  
    const {sortedByName} = useContext(SortedByContext)
  
    const [colaboratorNameList, setColaboratorNameList] = useState<SeparetedByName[]>([])
  
    const [colaboratorGradeList, setColaboratorGradeList] = useState<SeparetedByGrade>()
  
    const [filteredNameList, setFilteredNameList] = useState<SeparetedByName[]>([])

    const [filteredGrade4_5List, setFilteredGrade4_5List] = useState<Colaborator[]>([])
    const [filteredGrade3_4List, setFilteredGrade3_4List] = useState<Colaborator[]>([])
    const [filteredGrade2_3List, setFilteredGrade2_3List] = useState<Colaborator[]>([])
    const [filteredGrade1_2List, setFilteredGrade1_2List] = useState<Colaborator[]>([])
    const [filteredGrade0_1List, setFilteredGrade0_1List] = useState<Colaborator[]>([])
  
    const {filterText} = useContext(FilterContext)


    useEffect(() => {
        const fetchData = async () => {
          try {
            if (sortedByName) {
              const response = await axios.get("http://localhost:3000/colaborator/separetedByName");
              setColaboratorNameList(response.data);
            } else {
              const response = await axios.get("http://localhost:3000/colaborator/separetedByGrade");
              setColaboratorGradeList(response.data);
              console.log(colaboratorGradeList)
            }
          } catch (error) {
            console.error("Erro ao buscar os dados:", error);
          }
        };
      
        if(UpdateData){
            fetchData();
            setUpdateData(false)
        }
      
      }, [sortedByName, UpdateData]);

      

    useEffect(() => {
        if(sortedByName){
            setFilteredNameList(
                colaboratorNameList
                    .map((item: SeparetedByName) => ({
                        ...item,
                        colaborators: item.colaborators.filter((colaborator: Colaborator) =>
                            colaborator.name.toLowerCase().includes(filterText.toLowerCase())
                        )
                    }))
                    .filter((item) => item.colaborators.length > 0)
            )
    }
        else{
            {colaboratorGradeList &&  setFilteredGrade4_5List(colaboratorGradeList.grade4_5.filter((item : Colaborator) => item.name.toLowerCase().includes(filterText.toLowerCase())))}
            {colaboratorGradeList &&  setFilteredGrade3_4List(colaboratorGradeList.grade3_4.filter((item : Colaborator) => item.name.toLowerCase().includes(filterText.toLowerCase())))}
            {colaboratorGradeList &&  setFilteredGrade2_3List(colaboratorGradeList.grade2_3.filter((item : Colaborator) => item.name.toLowerCase().includes(filterText.toLowerCase())))}
            {colaboratorGradeList &&  setFilteredGrade1_2List(colaboratorGradeList.grade1_2.filter((item : Colaborator) => item.name.toLowerCase().includes(filterText.toLowerCase())))}
            {colaboratorGradeList &&  setFilteredGrade0_1List(colaboratorGradeList.grade0_1.filter((item : Colaborator) => item.name.toLowerCase().includes(filterText.toLowerCase())))}
        }


    },[colaboratorNameList, filterText, colaboratorGradeList])

  return (
    <>

        {(sortedByName) ? 

                filteredNameList.map((item, index) => (
                <div key={index} className="flex w-full flex-col gap-8">
                        <div className='flex flex-row items-center gap-2'>
                            <span>{item.initial}</span>
                            <div className='border border-[#D9D9D9] w-full'></div>
                        </div>

                        <div className="flex flex-row gap-4 flex-wrap mb-3 ml-12">
                        {item.colaborators.map((element, index) => (
                            <div key={index}>
                            <ColaboratorCard 
                                id={element.id}
                                name={element.name}
                                grade={element.grade}
                                role={element.role}
                            ></ColaboratorCard>
                        </div>
                        
                         ))}
                        </div>

                </div>
            ))

            : 
                            
            <div className="flex flex-col gap-8 w-full">
                {(colaboratorGradeList && filteredGrade4_5List.length > 0) ? 
                <>
                    <div className="flex flex-row gap-2 items-center">
                        <img src="./src/assets/star.png" alt="" className="h-3 w-3" />
                        <img src="./src/assets/star.png" alt="" className="h-3 w-3" />
                        <img src="./src/assets/star.png" alt="" className="h-3 w-3" />
                        <img src="./src/assets/star.png" alt="" className="h-3 w-3" />
                        <img src="./src/assets/star.png" alt="" className="h-3 w-3" />

                        <div className='border border-[#D9D9D9] w-full'></div>
                    </div>

                    <div className="flex flex-row gap-4 flex-wrap mb-3  ml-12">
                        {filteredGrade4_5List.map((element, index) => (
                        <ColaboratorCard 
                            key={element.id} // Lembre-se de adicionar uma chave única
                            id={element.id}
                            name={element.name}
                            grade={element.grade}
                            role={element.role}
                        />
                        ))}
                    </div>
                </>
                : <></>}
                

                {(colaboratorGradeList && filteredGrade3_4List.length > 0) ? 
                <>
                <div className="flex flex-row gap-2 items-center w-full">
                    <img src="./src/assets/star.png" alt="" className="h-3 w-3" />
                    <img src="./src/assets/star.png" alt="" className="h-3 w-3" />
                    <img src="./src/assets/star.png" alt="" className="h-3 w-3" />
                    <img src="./src/assets/star.png" alt="" className="h-3 w-3" />

                    <div className='border border-[#D9D9D9] w-full'></div>
                </div>

                <div className="flex flex-row gap-4 flex-wrap mb-3  ml-12">
                    {filteredGrade3_4List.map((element, index) => (
                    <ColaboratorCard 
                        key={element.id} // Lembre-se de adicionar uma chave única
                        id={element.id}
                        name={element.name}
                        grade={element.grade}
                        role={element.role}
                    />
                    ))}
                </div>
                </> : <></>}


                {(colaboratorGradeList && filteredGrade2_3List.length > 0) ? 
                <>
                    <div className="flex flex-row gap-2 items-center">
                        <img src="./src/assets/star.png" alt="" className="h-3 w-3" />
                        <img src="./src/assets/star.png" alt="" className="h-3 w-3" />
                        <img src="./src/assets/star.png" alt="" className="h-3 w-3" />

                        <div className='border border-[#D9D9D9] w-full'></div>
                    </div>

                    <div className="flex flex-row gap-4 flex-wrap mb-3  ml-12">
                        {filteredGrade2_3List.map((element, index) => (
                        <ColaboratorCard 
                            key={element.id} // Lembre-se de adicionar uma chave única
                            id={element.id}
                            name={element.name}
                            grade={element.grade}
                            role={element.role}
                        />
                        ))}
                    </div>
                </> 
                    : <></>}
                

                {(colaboratorGradeList && filteredGrade1_2List.length > 0) ? 
                <>
                    <div className="flex flex-row gap-2 items-center">
                        <img src="./src/assets/star.png" alt="" className="h-3 w-3" />
                        <img src="./src/assets/star.png" alt="" className="h-3 w-3" />


                        <div className='border border-[#D9D9D9] w-full'></div>
                    </div>

                    <div className="flex flex-row gap-4 flex-wrap mb-3  ml-12">
                        {filteredGrade1_2List.map((element, index) => (
                        <ColaboratorCard 
                            key={element.id} // Lembre-se de adicionar uma chave única
                            id={element.id}
                            name={element.name}
                            grade={element.grade}
                            role={element.role}
                        />
                        ))}
                    </div>
                </> 
                : <></>}
                

                {(colaboratorGradeList && filteredGrade0_1List.length > 0) ? 
                <>
                <div className="flex flex-row gap-2 items-center">
                    <img src="./src/assets/star.png" alt="" className="h-3 w-3" />

                    <div className='border border-[#D9D9D9] w-full'></div>
                </div>

                <div className="flex flex-row gap-4 flex-wrap mb-3  ml-12">
                    {filteredGrade0_1List.map((element, index) => (
                    <ColaboratorCard 
                        key={element.id} // Lembre-se de adicionar uma chave única
                        id={element.id}
                        name={element.name}
                        grade={element.grade}
                        role={element.role}
                    />
                    ))}
                </div>

                </> :
                <></>}
                
                
            </div>
        }
     
    </>
  );
};
export default ColaboratorList;
