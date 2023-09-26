import SearchBar from '../components/SearchBar'

export default function Colaborator() {
  return (
    <>
      <div className='mt-2'>
        <SearchBar/>
      </div>
      
        <div className='flex '>
          <div className = 'flex flex-row justify-items-start px-10 py-10' style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          </div>
          <div className="grow h-14 ..."></div>
        </div>
    </>
  )
}