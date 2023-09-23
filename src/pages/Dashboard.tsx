import SearchBar from "../components/SearchBar";
import BarChart from "../components/BarChart";
import { getData } from "../utils/getData";

export default function Dashboard() {
  return (
    <>
      <div className="mt-2">
        <SearchBar />
      </div>
      <div className="items-center space-x-2 ml-5 mt-10 mr-4">
        <div className="font-bold text-3xl"> Dashboard </div>
      </div>

      <div className="rounded-xl border border-solid w-6/12 h-auto p-3">
        <div className=" text-4xs">Performance de Indicadores</div>
        <div className="">
          <BarChart
            chartData={getData(
              "http://localhost:3000/colaborator-indicator/statistics"
            )}
            yAxisLabel="Colaboradores"
          />
        </div>
      </div>
    </>
  );
}
