import axios from "axios";
import { useState, useEffect } from "react";

interface ChartData {
  goal: number;
  superGoal: number;
  challenge: number;
  nothing: number;
  monthGrade: number;
  nothingIndicators: any[]; // Você pode ajustar o tipo conforme necessário
  monthIndicators: any[]; // Você pode ajustar o tipo conforme necessário
}

export function getMonthData(url: string) {
  const [data, setData] = useState<ChartData>({
    goal: 0,
    superGoal: 0,
    challenge: 0,
    nothing: 0,
    monthGrade: 0,
    nothingIndicators: [],
    monthIndicators: [],
  });

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const newData: ChartData = {
          goal: res.data.goal,
          superGoal: res.data.superGoal,
          challenge: res.data.challenge,
          nothing: res.data.nothing,
          monthGrade: res.data.monthGrade,
          nothingIndicators: res.data.nothingIndicators,
          monthIndicators: res.data.monthIndicators,
        };

        setData(newData);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);
  // console.log(data);
  return data;
}
