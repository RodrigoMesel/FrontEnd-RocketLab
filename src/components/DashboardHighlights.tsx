import { HighlightsModalProvider } from "../context/HighlightsModalContext";
import { getMonthName } from "../utils/getMonthName";
import HighlightsList from "./HighlightsList";
import StatsTextBox from "./StatsTextBox";

const DashboardHighlights: React.FC = () => {
  return (
    <>
      <div className="rounded-lg border border-solid w-full h-full p-3 box-border max-h-[23rem] overflow-scroll">
        <div className="flex pb-5 content-start justify-between">
          <p className="align-middle text-[#312843] text-xl">
            Destaques do mês
          </p>
          <StatsTextBox txt={getMonthName(new Date().getMonth() - 1)} />
        </div>

        <div>
          <HighlightsModalProvider>
            <HighlightsList />
          </HighlightsModalProvider>
        </div>
      </div>
    </>
  );
};

export default DashboardHighlights;
