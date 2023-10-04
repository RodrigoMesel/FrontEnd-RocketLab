import React, { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { ChartContext } from "../context/ChartContext";
import Chart, { DoughnutController } from "chart.js/auto";
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

const MonthlyGradeGraph: React.FC<DoughnutChartProps> = ({ chartData }) => {
  const [userData, setUserData] = useState({
    labels: ["Meta", "Supermeta", "Desafio", "Não alcançado"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: [
          "#AC72C1",
          "#32B97C",
          "#6186D3",
          "rgba(255, 255, 255, 0)",
        ],
        hoverBackgroundColor: [
          "#AC72C1",
          "#32B97C",
          "#6186D3",
          "rgba(255, 255, 255, 0)",
        ],
        borderRadius: [1000, 1000, 1000, 1000],
        borderWidth: [0, 0, 0, 0],
        fill: ["origin", "origin", "origin", false],
        fillStyle: false,
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
          backgroundColor: [
            "#AC72C1",
            "#32B97C",
            "#6186D3",
            "rgba(255, 255, 255, 0.1)",
          ],
          hoverBackgroundColor: [
            "#AC72C1",
            "#32B97C",
            "#6186D3",
            "rgba(255, 255, 255, 0.1)",
          ],
          borderRadius: [1000, 1000, 1000, 1000],
          borderWidth: [0, 0, 0, 0],
          fill: ["origin", "origin", "origin", false],
          fillStyle: false,
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
          id: "bgCircle",
          beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx } = chart;
            ctx.save();
            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;

            const { innerRadius } = chart.getDatasetMeta(
              chart.data.datasets.length - 1
            ).controller as DoughnutController;
            const { outerRadius } = chart.getDatasetMeta(0)
              .controller as DoughnutController;
            const width = outerRadius - innerRadius;
            const angle = Math.PI / 180;
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.strokeStyle = "#D9D9D9";
            ctx.arc(
              xCoor,
              yCoor,
              outerRadius - width / 2,
              0,
              angle * 360,
              false
            );
            ctx.stroke();
          },
        },
      ]}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
          legend: {
            display: false,
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
              ? chartContext.changePastChartImg(ref.current.toBase64Image())
              : "";
          },
        },
      }}
    />
  );
};

export default MonthlyGradeGraph;
