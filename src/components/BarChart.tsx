import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BarChart: React.FC = () => {
  const [userData] = useState({
    labels: Data.map((data) => getMonthName(data.month).toUpperCase()),
    datasets: [
      {
        label: "Meta",
        data: Data.map((data) => data.goal),
        backgroundColor: "#AC72C1",
        borderRadius: 22,
        borderSkipped: false,
        barPercentage: 0.4,
        categoryPercentage: 0.5,
      },
      {
        label: "Supermeta",
        data: Data.map((data) => data.superGoal),
        backgroundColor: "#32B97C",
        borderRadius: 22,
        borderSkipped: false,
        barPercentage: 0.4,
        categoryPercentage: 0.5,
      },
      {
        label: "Desafio",
        data: Data.map((data) => data.challenge),
        backgroundColor: "#6186D3",
        borderRadius: 22,
        borderSkipped: false,
        barPercentage: 0.4,
        categoryPercentage: 0.5,
      },
      {
        label: "Não alcançado",
        data: Data.map((data) => data.nothing),
        backgroundColor: "#F16062",
        borderRadius: 22,
        borderSkipped: false,
        barPercentage: 0.4,
        categoryPercentage: 0.5,
      },
    ],
  });

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
              title: { text: "Indicadores", display: true },
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

function getMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("pt-BR", { month: "long" }).substring(0, 3);
}

const Data = [
  {
    month: 8,
    goal: 6,
    superGoal: 4,
    challenge: 2,
    nothing: 1,
  },
  {
    month: 7,
    goal: 5,
    superGoal: 7,
    challenge: 4,
    nothing: 2,
  },
  {
    month: 6,
    goal: 4,
    superGoal: 1,
    challenge: 1,
    nothing: 6,
  },
  {
    month: 5,
    goal: 9,
    superGoal: 6,
    challenge: 0,
    nothing: 0,
  },
  {
    month: 4,
    goal: 3,
    superGoal: 0,
    challenge: 2,
    nothing: 5,
  },
];
