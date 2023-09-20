import AddColaborator from '../components/AddColaborator'
import Order from '../components/Order'
import SearchBar from '../components/SearchBar'

export default function Colaborators() {
  return (
    <>
      <div className='mt-2'>
        <SearchBar/>
      </div>
      
      <div className='flex items-center space-x-2 ml-5 mt-8 mr-4'>
        <div className='font-bold text-3xl'> Colaboradores </div>
        <AddColaborator/>
        <div className= 'flex grow'></div>
        <Order/>
      </div>
        

        <div className='flex '>
          <div className = 'flex flex-row justify-items-start px-10 py-10' style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          </div>
          <div className="grow h-14 ..."></div>
        </div>
    </>
  )
}