import { getMonthData } from "../utils/getMonthData";
import MonthlyGradeGraph from "./MonthlyGradeGraph";

interface PastChartCardProps {
  id: number;
  month: number;
}

export const PastChartCard: React.FC<PastChartCardProps> = ({ month, id }) => {
  return (
    <>
      {" "}
      <div className="bg-gray-400 py-[2.125rem] px-[1.563rem] rounded-lg">
        <MonthlyGradeGraph
          chartData={getMonthData(
            `http://localhost:3000/colaborator-indicator/statistics/month/${month}/colaboratorId/${id}`
          )}
        />
      </div>
    </>
  );
};
