import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Styling from "./styling/Background";
import { NavBar } from "./components/NavBar";
import GeneralWindow from "./components/GeneralWindow";
import Colaborators from "./pages/Colaborators";
import Colaborator from "./pages/Colaborator";
import "./font.css";
import Dashboard from "./pages/Dashboard";
import { ChartProvider } from "./context/ChartContext";

function App() {
  return (
    <>
      <Styling>
        <Router>
          <div className="grid grid-cols-[1fr,7fr] min-h-screen h-full gap-4">
            <div className="mt-16 mb-16 ml-4 mr-2 h-1/2">
              <NavBar />
            </div>
            <div className=" mt-16 mb-16 mr-12">
              <GeneralWindow>
                <ChartProvider>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/colaboradores" element={<Colaborators />} />
                    <Route path="/colaborador/:id" element={<Colaborator />} />
                  </Routes>
                </ChartProvider>
              </GeneralWindow>
            </div>
          </div>
        </Router>
      </Styling>
    </>
  );
}

export default App;
