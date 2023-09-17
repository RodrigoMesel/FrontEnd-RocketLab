import Styling from './styling/Background'
import { Navbar } from './components/NavBar'
function App() {

  return (
    <>
      <Styling>
        <div className='py-16 px-3'>
          <Navbar/>
        </div>
  
        {/* <Router>
          <Routes>
            <Route path="/colaborators" element={<Colaborators/>} />
          </Routes>
        </Router> */}
        </Styling>
    </>
  )
}

export default App
