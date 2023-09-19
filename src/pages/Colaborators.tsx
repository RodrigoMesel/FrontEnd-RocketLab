import SearchBar from '../components/searchbar'

export default function Colaborators() {
  return (
    <>
    <SearchBar/>
      
      <div className='px-28 pt-3'>
          <button className = " w-20 p-4 bg-[#A4D0A4] hover:bg-[#F7E1AE]  rounded-lg">
            <img className= '' src="src\assets\Home.png"  alt="icon" />
          </button>
      </div>
      
      <div className='flex '>
        <div className = 'flex flex-row justify-items-start px-10 py-10' style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        </div>
        <div className="grow h-14 ..."></div>
      </div>
    </>
  )
}