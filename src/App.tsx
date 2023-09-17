import Styling from './styling/Background'
import GeneralWindow from './components/GeneralWindow'

function App() {

  return (
    <>
      <Styling>
        <div className="grid grid-cols-[1fr,7fr] gap-4">
          <div className='mt-16'>
            NavBar aqui
          </div>
          <div className='min-h-screen mt-16 mb-16 mr-12'>
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
