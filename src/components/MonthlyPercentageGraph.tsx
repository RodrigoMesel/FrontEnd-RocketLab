import React, { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { ChartContext } from "../context/ChartContext";
import Chart from "chart.js/auto";
interface Indicator {
  id: number;
  colaboratorId: number;
  indicatorId: number;
  result: number;
  creationMonth: number;
  weight: number;
  unity: string;
  goal: number;
  superGoal: number;
  challenge: number;
}

interface DoughnutChartProps {
  chartData: {
    goal: number;
    superGoal: number;
    challenge: number;
    nothing: number;
    monthGrade: number;
    nothingIndicators: Indicator[];
    monthIndicators: Indicator[];
  };
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ chartData }) => {
  const [userData, setUserData] = useState({
    labels: ["Meta", "Supermeta", "Desafio", "Não alcançado"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#AC72C1", "#32B97C", "#6186D3", "#F16062"],
        hoverBackgroundColor: ["#AC72C1", "#32B97C", "#6186D3", "#F16062"],
        borderRadius: [1000, 1000, 1000, 1000],
        borderWidth: [0, 0, 0, 0],
      },
    ],
  });
  const chartContext = useContext(ChartContext);

  const ref = React.useRef<Chart<"doughnut", number[]>>(null);
  useEffect(() => {
    setUserData({
      labels: ["Meta", "Supermeta", "Desafio", "Não alcançado"],
      datasets: [
        {
          data: [
            chartData.goal,
            chartData.superGoal,
            chartData.challenge,
            chartData.nothing,
          ],
          backgroundColor: ["#AC72C1", "#32B97C", "#6186D3", "#F16062"],
          hoverBackgroundColor: ["#AC72C1", "#32B97C", "#6186D3", "#F16062"],
          borderRadius: [1000, 1000, 1000, 1000],
          borderWidth: [0, 0, 0, 0],
        },
      ],
    });
  }, [chartData]);

  return (
    <Doughnut
      ref={ref}
      data={userData}
      plugins={[
        {
          id: "text",
          beforeDraw: function (chart) {
            var width = chart.width,
              height = chart.height,
              ctx = chart.ctx;

            ctx.restore();
            var fontSize = (height / 70).toFixed(2);
            ctx.font = "bold " + fontSize + "em Poppins";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#312843";

            var text = `75%`,
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2.3;

            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ]}
      options={{
        cutout: "80%",
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

        animation: {
          duration: 0,
          onComplete: function () {
            ref.current
              ? chartContext.changeImg(ref.current.toBase64Image())
              : "";
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
