import React, { useState, useContext, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import {
  BrowserRouter as Router,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import { getUserData } from "../utils/getUserData";
import ColaboratorImage from "../components/ColaboratorImage";
import BarChart from "../components/SemestralBarChart";
import DoughnutChart from "../components/MonthlyPercentageGraph";
import { getData } from "../utils/getData";
import { getMonthData } from "../utils/getMonthData";
import IndicatorCard from "../components/IndicatorCard";
import { getMonthStatistics } from "../utils/getMonthStatistics";
import ColaboratorGrade from "../components/ColaboratorGrade";
import AddIndicator from "../components/AddIndicator";
import StatsTextBox from "../components/StatsTextBox";
import ChangeMonthBox from "../components/ChangeMonthBox";
import IndicatorModal from "../components/IndicatorModal";
import { CreateIndicatorContext } from "../context/CreateIndicatorContext";
import { AssignIndicatorContext } from "../context/AssignIndicatorContext";
import CreateIndicatorModal from "../components/CreateIndicatorModal";
import AssignIndicatorModal from "../components/AssignIndicatorModal";
import { IndicatorContext } from "../context/IndicatorContext";
import DownloadPdfButton from "../components/DownloadPdfButton";
import { ChartContext } from "../context/ChartContext";
import PDFDownloadButton from "../components/PDFDownloadButton";
import IndicatorNotAchieve from "../components/IndicatorNotAchieved";

type UserData = {
  id: number;
  name: string;
  grade: number;
  role: string;
};

type MonthStatistics = {
  goal: number;
  superGoal: number;
  challenge: number;
  monthIndicators: Array<{
    id: number;
    name: string;
    weight: number;
    goal: number;
    superGoal: number;
    challenge: number;
  }>;
};

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

export default function Colaborator() {
  const { id } = useParams();
  const userId = parseInt(id!, 10);

  const [userData, setUserData] = useState<UserData>({
    id: 0,
    name: "",
    grade: 0,
    role: "",
  });

  // Contexts
  const { openPopUpIndicator, setOpenPopUpIndicator } =
    useContext(IndicatorContext);
  const { openPopUpCreateIndicator, setOpenPopUpCreateIndicator } = useContext(
    CreateIndicatorContext
  );
  const { openPopUpAssignIndicator, setOpenPopUpAssignIndicator } = useContext(
    AssignIndicatorContext
  );

  const currentMonth = new Date().getMonth() + 1; // Mês atual
  const [month, setNumber] = useState(currentMonth);

  const [doughnutChartData, setDoughnutChartData] = useState<
    DoughnutChartProps["chartData"]
  >({
    goal: 0,
    superGoal: 0,
    challenge: 0,
    nothing: 0,
    monthGrade: 0,
    nothingIndicators: [],
    monthIndicators: [],
  });

  const incrementNumber = () => {
    setNumber(month + 1);
  };

  const decrementNumber = () => {
    setNumber(month - 1);
  };

  const [monthStats, loading] = getMonthStatistics(month, userId);

  const data = getUserData(userId);

  useEffect(() => {
    setUserData(data);
  }, [data]);
  const chartContext = useContext(ChartContext);
  return (
    <>
      <div className="mt-2">
        <Link to="/colaboradores">
          <SearchBar />
        </Link>
      </div>

      {/* Card do Colaborador com nome, imagem, role e nota */}
      <div className="flex flex-row justify-between space-x-5 ml-5 my-8 mr-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between">
            <div className="flex gap-3 mr-40">
              <ColaboratorImage />
              <div className="flex flex-col">
                <div className="text-[#A3A3A3]">{userData.role}</div>
                <div className="font-bold text-3xl">{userData.name}</div>
              </div>
            </div>

            <div>
              <ColaboratorGrade grade={userData.grade}></ColaboratorGrade>
            </div>
          </div>

          <div className="flex flex-row space-x-24">
            <div className="mt-2 ml-5"> Indicadores</div>

            <div>
              <AddIndicator
                openPopUpIndicator={openPopUpIndicator}
                setOpenPopUpIndicator={setOpenPopUpIndicator}
                currentMonth={currentMonth}
                monthToAddIndicator={month}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center pb-5">
          <div className="grow ..."></div>
          <div>
            <div className="flex flex-row space-x-1 mr-5">
              <ChangeMonthBox
                monthNumber={month}
                incrementNumber={incrementNumber}
                decrementNumber={decrementNumber}
              ></ChangeMonthBox>
            </div>
          </div>

          <PDFDownloadButton
            name={data.name}
            role={data.role}
            grade={data.grade}
            id={data.id}
            doughnutChart={chartContext.chartImg}
            monthIndicators={monthStats?.monthIndicators.slice(0, 4)}
            nothingIndicators={monthStats?.nothingIndicators}
            monthNumber={month}
            validP={chartContext.validP}
            goalP={chartContext.goalP}
            superGoalP={chartContext.superGoalP}
            challengeP={chartContext.challengeP}
            nothingP={chartContext.nothingP}
          />
        </div>
      </div>

      {/* Flex box da primeira linha de componentes */}
      <div className="flex flex-row space-x-24">
        {/* Cards dos indicadores */}
        <div className="flex flex-col space-y-2 ml-5 mt-3 h-96 overflow-scroll">
          {monthStats &&
            monthStats.monthIndicators.map((indicator) => (
              <IndicatorCard
                id={indicator.id}
                name={indicator.name}
                weight={indicator.weight}
                goal={indicator.goal}
                supergoal={indicator.superGoal}
                challenge={indicator.challenge}
                result={indicator.result}
              />
            ))}
        </div>

        {/*Grafico dos indicadores */}
        <div className="rounded-lg border border-solid p-[1.313rem] w-[25%]">
          <p className="text-lg">
            <span className="font-bold">
              {chartContext.validP}
              {"% "}
            </span>
            dos indicadores foram alcançados
          </p>
          <div className="w-full h-40 my-4">
            <DoughnutChart
              chartData={getMonthData(
                `http://localhost:3000/colaborator-indicator/statistics/month/${month}/colaboratorId/${userId}`
              )}
            />
          </div>
          <div className="flex flex-row gap-6 justify-center items-center">
            <div className="flex flex-col text-xs">
              <div className="flex flex-row items-center">
                <div className="bg-[#AC72C1] rounded-[21px] w-[0.90rem] h-[0.25rem] mr-[0.338rem]"></div>
                <p>Meta</p>
              </div>
              <div className="flex flex-row items-center">
                <div className="bg-[#32B97C] rounded-[21px] w-[0.90rem] h-[0.25rem] mr-[0.338rem]"></div>
                <p>Supermeta</p>
              </div>
              <div className="flex flex-row items-center">
                <div className="bg-[#6186D3] rounded-[21px] w-[0.90rem] h-[0.25rem] mr-[0.338rem]"></div>
                <p>Desafio</p>
              </div>
            </div>
            <div className="flex flex-col text-xs">
              <p className="font-bold">{chartContext.goalP}%</p>
              <p className="font-bold">{chartContext.superGoalP}%</p>
              <p className="font-bold">{chartContext.challengeP}%</p>
            </div>
          </div>
        </div>

        {monthStats && 
          <IndicatorNotAchieve nothingIndicators={monthStats.nothingIndicators}/>
        }
      </div>

      <div className="flex justify-center items-center mb-5">
        <div className="rounded-lg border border-solid p-5 mt-3 w-[90%] ">
          <div className="flex pb-5 content-start justify-between">
            <div className="text-xl p-2">Evolução de resultados</div>
            <StatsTextBox txt={"Últimos 6 meses"} />
          </div>
          <div className="flex w-[100%] h-96">
            <BarChart
              chartData={getData(
                `http://localhost:3000/colaborator-indicator/statistics/colaboratorId/${userId}`
              )}
              yAxisLabel="Indicadores"
            />
          </div>
        </div>
      </div>

      <IndicatorModal
        openPopUpIndicator={openPopUpIndicator}
        setOpenPopUpIndicator={setOpenPopUpIndicator}
      ></IndicatorModal>

      <CreateIndicatorModal
        openPopUpCreateIndicator={openPopUpCreateIndicator}
        setOpenPopUpCreateIndicator={setOpenPopUpCreateIndicator}
      ></CreateIndicatorModal>
      <AssignIndicatorModal
        openPopUpAssignIndicator={openPopUpAssignIndicator}
        setOpenPopUpAssignIndicator={setOpenPopUpAssignIndicator}
      ></AssignIndicatorModal>
    </>
  );
}
