import React, { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { ChartContext } from "../context/ChartContext";
import Chart from "chart.js/auto";
import { isNumber } from "chart.js/helpers";
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

  const [center, setCenter] = useState("");

  const ref = React.useRef<Chart<"doughnut", number[]>>(null);
  useEffect(() => {
    setUserData({
      labels: [
        `Meta ${format(chartData.goal)}%`,
        `Supermeta ${format(chartData.superGoal)}%`,
        `Desafio ${format(chartData.challenge)}%`,
        `Não alcançado ${format(chartData.nothing)}%`,
      ],
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
    setCenter(
      format(chartData.goal + chartData.superGoal + chartData.challenge)
    );
    console.log(center);
  }, [chartData]);

  const format = (value: number) => {
    var sum =
      chartData.goal +
      chartData.superGoal +
      chartData.challenge +
      chartData.nothing;

    return ((value * 100) / sum).toFixed(2);
  };

  return (
    <Doughnut
      ref={ref}
      data={userData}
      plugins={[
        {
          id: "text",
          beforeDatasetsDraw: function (chart) {
            var goal = chart.data.datasets[0].data[0];
            var superGoal = chart.data.datasets[0].data[1];
            var challenge = chart.data.datasets[0].data[2];
            var nothing = chart.data.datasets[0].data[3];
            var valid =
              (isNumber(goal) ? goal : 0) +
              (isNumber(superGoal) ? superGoal : 0) +
              (isNumber(challenge) ? challenge : 0);
            var middleValue =
              (valid * 100) / (valid + (isNumber(nothing) ? nothing : 0));

            chartContext.changeGoalP(isNumber(goal) ? goal : 0);
            chartContext.changeSuperGoalP(isNumber(superGoal) ? superGoal : 0);
            chartContext.changeChallengeP(isNumber(challenge) ? challenge : 0);
            chartContext.changeNothingP(isNumber(nothing) ? nothing : 0);
            chartContext.changeValidP(isNumber(middleValue) ? middleValue : 0);

            var width = chart.width,
              height = chart.height,
              ctx = chart.ctx;

            ctx.restore();
            var fontSize = (height / 80).toFixed(2);
            ctx.font = "bold " + fontSize + "em Poppins";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#312843";

            var text = `${middleValue || 0}%`,
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2.45;
            console.log(text);

            ctx.fillText(text, textX, textY);
          },
        },
      ]}
      options={{
        cutout: "80%",
        plugins: {
          legend: {
            align: "start",
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
