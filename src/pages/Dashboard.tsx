import SearchBar from "../components/SearchBar";
import DashboardHighlights from "../components/DashboardHighlights";
import DashboardChart from "../components/DashboardChart";
import DashboardColaboratorRanking from "../components/DashboardColaboratorRanking";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div className="mt-2">
        <Link to='/colaboradores'>
          <SearchBar />
        </Link>
      </div>

      <div className="flex flex-wrap items-start space-x-2 ml-5 mt-8 mr-4">
        <p className="font-bold text-3xl w-full"> Dashboard </p>
        <span className=" text-xl font-normal mt-4 mb-2">Resultados</span>
      </div>

      <div className="flex gap-6 space-x-2 ml-10 mr-10 justify-center">
        <div className="w-[50%]">
          <DashboardChart />
        </div>
        <div className="w-[25%]">
          <DashboardHighlights />
        </div>
      </div>

      <div className="space-x-2 ml-5 mr-4 mt-6">
        <DashboardColaboratorRanking />
      </div>
    </>
  );
}
