import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Styling from './styling/Background'
import { NavBar } from './components/NavBar'
import GeneralWindow from './components/GeneralWindow'
import Colaborators from './pages/colaborators';

function App() {

  return (
    <>
      <Styling>
      <Router>
        <div className="grid grid-cols-[1fr,7fr]  h-screen gap-4">

          <div className='mt-16 mb-16 ml-4 mr-2 h-1/2'>
            <NavBar/>
          </div>
          <div className=' mt-16 mb-16 mr-12'>
            <GeneralWindow>
              <Routes>
                <Route path="/colaboradores" element={<Colaborators/>} />
              </Routes>
            </GeneralWindow>
          </div> 
        </div> 
        </Router>
      </Styling>
    </>
  )
}

export default App
