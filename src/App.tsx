import Styling from './styling/Background'
import { Navbar } from './components/NavBar'
import GeneralWindow from './components/GeneralWindow'

function App() {

  return (
    <>
      <Styling>
        
        <div className="grid grid-cols-[1fr,7fr]  h-screen gap-4">

          <div className='mt-16 mb-16 ml-4 mr-2 h-1/2'>
            <Navbar/>
          </div>

          <div className=' mt-16 mb-16 mr-12'>
            <GeneralWindow>
              Conteúdo da página aqui
              {/* <Router>
              <Routes>
                <Route path="/colaborators" element={<Colaborators/>} />
              </Routes>
              </Router> */}
            </GeneralWindow>
          </div> 
        </div> 
      </Styling>
    </>
  )
}

export default App
