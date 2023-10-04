import React from "react";
import { createContext, useState } from "react";

type ChartContext = {
  chartImg: string;
  pastChartImg: string;
  validP: number;
  goalP: number;
  superGoalP: number;
  challengeP: number;
  nothingP: number;
  changeImg: (str: string) => void;
  changePastChartImg: (str: string) => void;
  changeValidP: (val: number) => void;
  changeGoalP: (val: number) => void;
  changeSuperGoalP: (val: number) => void;
  changeChallengeP: (val: number) => void;
  changeNothingP: (val: number) => void;
};

export const ChartContext = createContext<ChartContext>({
  chartImg: "",
  pastChartImg: "",
  changePastChartImg: (_) => {},
  changeImg: (_) => {},
  validP: 0,
  goalP: 0,
  superGoalP: 0,
  challengeP: 0,
  nothingP: 0,
  changeValidP: (_) => {},
  changeGoalP: (_) => {},
  changeSuperGoalP: (_) => {},
  changeChallengeP: (_) => {},
  changeNothingP: (_) => {},
});

export const ChartProvider = ({ children }: { children: React.ReactNode }) => {
  const [chartImg, changeImg] = useState("");
  const [pastChartImg, changePastChartImg] = useState("");
  const [validP, changeValidP] = useState(0);
  const [goalP, changeGoalP] = useState(0);
  const [superGoalP, changeSuperGoalP] = useState(0);
  const [challengeP, changeChallengeP] = useState(0);
  const [nothingP, changeNothingP] = useState(0);

  return (
    <ChartContext.Provider
      value={{
        chartImg,
        changeImg,
        pastChartImg,
        changePastChartImg,
        goalP,
        changeGoalP,
        superGoalP,
        changeSuperGoalP,
        challengeP,
        changeChallengeP,
        nothingP,
        changeNothingP,
        validP,
        changeValidP,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
