import SearchBar from "../components/SearchBar";
import DashboardHighlights from "../components/DashboardHighlights";
import DashboardChart from "../components/DashboardChart";
import DashboardColaboratorRanking from "../components/DashboardColaboratorRanking";

export default function Dashboard() {
  return (
    <>
      <div className="px-16">
        <div className="mt-2">
          <SearchBar />
        </div>

        <div className="items-center space-x-2 ml-5 mt-10 mr-4">
          <p className="font-bold text-3xl"> Dashboard </p>
        </div>

        <div className="flex flex-wrap gap-6 ">
          <div className="flex gap-6">
            <div className="w-2/3">
              <DashboardChart />
            </div>
            <div className="w-1/3">
              <DashboardHighlights />
            </div>
          </div>
          <div>
            <DashboardColaboratorRanking />
          </div>
        </div>
      </div>
    </>
  );
}
