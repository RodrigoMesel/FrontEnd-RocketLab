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
  centerText: boolean;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  chartData,
  centerText,
}) => {
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
    // console.log(center);
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
            var middleValue = parseFloat(
              ((valid * 100) / (valid + (isNumber(nothing) ? nothing : 0)))
                .toFixed(2)
                .replace(/[.,]00$/, "")
            );

            chartContext.changeGoalP(
              isNumber(goal)
                ? parseFloat(
                    ((goal * 100) / (valid + (isNumber(nothing) ? nothing : 0)))
                      .toFixed(2)
                      .replace(/[.,]00$/, "")
                  )
                : 0
            );
            chartContext.changeSuperGoalP(
              isNumber(superGoal)
                ? parseFloat(
                    (
                      (superGoal * 100) /
                      (valid + (isNumber(nothing) ? nothing : 0))
                    )
                      .toFixed(2)
                      .replace(/[.,]00$/, "")
                  )
                : 0
            );
            chartContext.changeChallengeP(
              isNumber(challenge)
                ? parseFloat(
                    (
                      (challenge * 100) /
                      (valid + (isNumber(nothing) ? nothing : 0))
                    )
                      .toFixed(2)
                      .replace(/[.,]00$/, "")
                  )
                : 0
            );
            chartContext.changeNothingP(
              isNumber(nothing)
                ? parseFloat(
                    (
                      (nothing * 100) /
                      (valid + (isNumber(nothing) ? nothing : 0))
                    )
                      .toFixed(2)
                      .replace(/[.,]00$/, "")
                  )
                : 0
            );
            chartContext.changeValidP(isNumber(middleValue) ? middleValue : 0);
            if (centerText) {
              var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;

              ctx.restore();
              var fontSize = (height / 100).toFixed(2);
              ctx.font = "bold " + fontSize + "em Poppins";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#312843";

              var text = `${middleValue || 0}%`,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
              // console.log(text);

              ctx.fillText(text, textX, textY);
            }
          },
        },
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
        cutout: "80%",
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
              ? centerText
                ? chartContext.changeImg(ref.current.toBase64Image())
                : chartContext.changePastChartImg(ref.current.toBase64Image())
              : "";
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
