import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { getMonthName } from "../utils/getMonthName";

interface BarChartProps {
  chartData: {
    month: number;
    goal: number;
    superGoal: number;
    challenge: number;
    nothing: number;
  }[];
  yAxisLabel: string;
}

const BarChart: React.FC<BarChartProps> = ({ chartData, yAxisLabel }) => {
  const [userData, setUserData] = useState({
    labels: [""],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: "",
        borderRadius: 0,
        borderSkipped: true,
        barPercentage: 0,
        categoryPercentage: 0,
      },
    ],
  });
  useEffect(() => {
    setUserData({
      labels: chartData.map((data) => getMonthName(data.month).toUpperCase()),
      datasets: [
        {
          label: "Meta",
          data: chartData.map((data) => data.goal),
          backgroundColor: "#AC72C1",
          borderRadius: 22,
          borderSkipped: false,
          barPercentage: 0.4,
          categoryPercentage: 0.5,
        },
        {
          label: "Supermeta",
          data: chartData.map((data) => data.superGoal),
          backgroundColor: "#32B97C",
          borderRadius: 22,
          borderSkipped: false,
          barPercentage: 0.4,
          categoryPercentage: 0.5,
        },
        {
          label: "Desafio",
          data: chartData.map((data) => data.challenge),
          backgroundColor: "#6186D3",
          borderRadius: 22,
          borderSkipped: false,
          barPercentage: 0.4,
          categoryPercentage: 0.5,
        },
        {
          label: "Não alcançado",
          data: chartData.map((data) => data.nothing),
          backgroundColor: "#F16062",
          borderRadius: 22,
          borderSkipped: false,
          barPercentage: 0.4,
          categoryPercentage: 0.5,
        },
      ],
    });
  }, [chartData]);

  return (
    <>
      <Bar
        data={userData}
        options={{
          scales: {
            x: {
              grid: { display: false },
            },
            y: {
              ticks: { count: 4 },
              title: { text: yAxisLabel, display: true },
            },
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 30,
                boxHeight: 7,
                borderRadius: 4,
                useBorderRadius: true,
              },
            },
          },
        }}
      />
    </>
  );
};
export default BarChart;
