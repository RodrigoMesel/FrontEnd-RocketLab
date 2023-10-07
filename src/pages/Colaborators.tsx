import { useContext, useEffect, useState } from 'react'
import AddColaborator from '../components/AddColaborator'
import ColaboratorCard from '../components/ColaboratorCard'
import Order from '../components/Order'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { SortedByContext } from '../context/SortedByContext'
import ChangeListOrderModal from '../components/ChangeListOrderModal'
import AddColaboratorModal from '../components/AddColaboratorModal'
import ColaboratorList from '../components/ColaboratorsList'
import { CreateColaboratorListContext } from '../context/CreateColaboratorListContext'



export default function Colaborators() {

  const {openCreatePopUp, setOpenCreatePopUp} = useContext(CreateColaboratorListContext)

  const [openPopUp, setOpenPopUp] = useState(false)

  const [UpdateData, setUpdateData] = useState(true);

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

          <ColaboratorList
            setUpdateData={setUpdateData}
            UpdateData={UpdateData}
          />
                      
          </div>
          <div className="grow h-14 ..."></div>
        </div>

        <ChangeListOrderModal
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          UpdateData={UpdateData}
          setUpdateData={setUpdateData}
        ></ChangeListOrderModal>

        <AddColaboratorModal
          openCreatePopUp={openCreatePopUp}
          setOpenCreatePopUp={setOpenCreatePopUp}
          setUpdateData={setUpdateData}
          UpdateData={UpdateData}
        ></AddColaboratorModal>
    </>
  )
}