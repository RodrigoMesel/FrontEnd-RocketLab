import React from "react";
import { createContext, useState } from "react";

type ChartContext = {
  chartImg: string;
  changeImg: (str: string) => void;
};

export const ChartContext = createContext<ChartContext>({
  chartImg: "",
  changeImg: (_) => {},
});

export const ChartProvider = ({ children }: { children: React.ReactNode }) => {
  const [chartImg, changeImg] = useState("");

  return (
    <ChartContext.Provider value={{ chartImg, changeImg }}>
      {children}
    </ChartContext.Provider>
  );
};
