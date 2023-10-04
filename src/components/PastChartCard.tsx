import { getMonthData } from "../utils/getMonthData";
import star from "../assets/star_blue.svg";
import DoughnutChart from "./MonthlyPercentageGraph";

interface PastChartCardProps {
  id: number;
  month: number;
  monthGrade: number;
}

export const PastChartCard: React.FC<PastChartCardProps> = ({
  month,
  id,
  monthGrade,
}) => {
  return (
    <>
      <div className=" py-[2.125rem] px-[1.563rem] rounded-lg flex items-center gap-4">
        <div className="w-[30%] h-auto">
          <DoughnutChart
            chartData={getMonthData(
              `http://localhost:3000/colaborator-indicator/statistics/month/${month}/colaboratorId/${id}`
            )}
            centerText={false}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-base">Total do mês</p>
          <div className="flex">
            <object
              data={star}
              type="image/svg+xml"
              className="fill-black"
            ></object>
            <p className="font-bold text-[32px]">
              {monthGrade.toFixed(2).replace(/[.,]00$/, "")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
