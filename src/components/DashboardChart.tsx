import { getData } from "../utils/getData";
import BarChart from "./BarChart";
import StatsTextBox from "./StatsTextBox";

const DashboardChart: React.FC = () => {
  return (
    <>
      <div className="rounded-lg border border-solid p-3">
        <div className="">
          <div className="flex pb-5 content-start justify-between">
            <div className=" text-xl">Performance de Indicadores</div>
            <StatsTextBox txt={"Últimos 6 meses"} />
          </div>

          <div className="h-72 flex justify-center ">
            <BarChart
              chartData={getData(
                "http://localhost:3000/colaborator-indicator/statistics"
              )}
              yAxisLabel="Colaboradores"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardChart;
