import { getMonthData } from "../utils/getMonthData";
import star from "../assets/star_blue.svg";
import DoughnutChart from "./MonthlyPercentageGraph";

interface PastChartCardProps {
  id: number;
  month: number;
  monthGrade: number;
  monthIndicators?: Array<{
    id: number;
    name: string;
    weight: number;
    goal: number;
    superGoal: number;
    challenge: number;
    result: number;
  }>;
}

export const GradeChartCard: React.FC<PastChartCardProps> = ({
  month,
  id,
  monthGrade,
  monthIndicators,
}) => {
  return (
    <>
      <div className=" py-[2.125rem] px-[1.563rem] rounded-lg flex items-center bg-slate-100 gap-4">
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
        {/* indicadores */}
        <div className="flex flex-wrap gap-2">
          {monthIndicators &&
            monthIndicators.map((indicator, index) => (
              <div
                key={index}
                className={`flex flex-col ${borderColor(
                  indicator.result,
                  indicator.goal,
                  indicator.superGoal,
                  indicator.challenge
                )} basis-[20%] border-l-[3px] pl-3`}
              >
                <p className="text-base font-normal">#{indicator.id} </p>
                <p className="text-2xl font-bold">{indicator.result}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

const borderColor = (
  result: number,
  goal: number,
  superGoal: number,
  challenge: number
) => {
  const color =
    result >= challenge
      ? "border-[#6186D3]"
      : result >= superGoal
      ? "border-[#32B97C]"
      : result >= goal
      ? "border-[#AC72C1]"
      : "border-[#F16062]";
  return color;
};
