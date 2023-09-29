import { useContext, useEffect, useState } from 'react'
import AddColaborator from '../components/AddColaborator'
import ColaboratorCard from '../components/ColaboratorCard'
import Order from '../components/Order'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { SortedByContext } from '../context/SortedByContext'
import ChangeListOrderModal from '../components/ChangeListOrderModal'
import { FilterContext } from '../context/FilterContext'
import AddColaboratorModal from '../components/AddColaboratorModal'

type Colaborator = {
  id: number,
  name: string,
  grade: number,
  role: string
}

export default function Colaborators() {

  const {sortedByName} = useContext(SortedByContext)

  const [openCreatePopUp, setOpenCreatePopUp] = useState(false)

  const [openPopUp, setOpenPopUp] = useState(false)

  const [colaboratorList, setColaboratorList] = useState<Colaborator[]>([])

  const [filteredList, setFilteredList] = useState<Colaborator[]>([])

  const {filterText} = useContext(FilterContext)


  useEffect(() => {
    
    if(sortedByName){
      axios.get("http://localhost:3000/colaborator/sortedByName")
        .then(response => {
          setColaboratorList(response.data);
        })
        .catch(error => {
            console.error("Erro ao buscar os dados:", error);
        });

    } else{
      axios.get("http://localhost:3000/colaborator/sortedByGrade")
      .then(response => {
        setColaboratorList(response.data);
      })
      .catch(error => {
          console.error("Erro ao buscar os dados:", error);
      });
    }


  }, [sortedByName, openCreatePopUp])


  useEffect(() => {
    setFilteredList(colaboratorList.filter((item : Colaborator) => item.name.toLowerCase().includes(filterText.toLowerCase())))
  },[colaboratorList, filterText])


  return (
    <>
      <div className='mt-2'>
        <SearchBar/>
      </div>
      
      <div className='flex items-center space-x-2 ml-5 mt-8 mr-4'>
        <div className='font-bold text-3xl'> Colaboradores </div>
        <AddColaborator 
          openCreatePopUp={openCreatePopUp}
          setOpenCreatePopUp={setOpenCreatePopUp}
        />
        <div className= 'flex grow'></div>
        <Order 
         openPopUp = {openPopUp}
         setOpenPopUp={setOpenPopUp}/>
      </div>
        

        <div className='flex '>
          <div className = 'flex flex-row justify-items-start px-10 py-10' style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            
          {filteredList.map((item, index) =>(
                        <div key={index}>
                            <ColaboratorCard 
                                id={item.id}
                                name={item.name}
                                grade={item.grade}
                                role={item.role}
                            ></ColaboratorCard>
                        </div>
                    ))}

          </div>
          <div className="grow h-14 ..."></div>
        </div>

        <ChangeListOrderModal
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
        ></ChangeListOrderModal>

        <AddColaboratorModal
          openCreatePopUp={openCreatePopUp}
          setOpenCreatePopUp={setOpenCreatePopUp}
        ></AddColaboratorModal>
    </>
  )
}