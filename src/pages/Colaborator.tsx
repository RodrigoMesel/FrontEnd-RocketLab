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
import ColaboratorGrade from "../components/ColaboratorGrade";
import AddIndicator from "../components/AddIndicator";
import StatsTextBox from "../components/StatsTextBox";
import ChangeMonthBox from "../components/ChangeMonthBox";
import IndicatorModal from "../components/IndicatorModal";
import { CreateIndicatorContext } from "../context/CreateIndicatorContext";
import { AssignIndicatorContext } from "../context/AssignIndicatorContext";
import { EditIndicatorContext } from "../context/EditIndicatorContext";
import CreateIndicatorModal from "../components/CreateIndicatorModal";
import AssignIndicatorModal from "../components/AssignIndicatorModal";
import EditIndicatorModal from "../components/EditIndicatorModal";
import { IndicatorContext } from "../context/IndicatorContext";
import DownloadPdfButton from "../components/DownloadPdfButton";
import { ChartContext } from "../context/ChartContext";
import PDFDownloadButton from "../components/PDFDownloadButton";
import IndicatorNotAchieve from "../components/IndicatorNotAchieved";
import axios from "axios";
// import { PastChartCard } from "../components/PastChartCard";
import NoIndicatorsCard from "../components/NoIndicatorsCards";
import { GradeChartCard } from "../components/GradeChartCard";

type UserData = {
  id: number;
  name: string;
  grade: number;
  role: string;
};

interface MonthStatistics {
  goal: number;
  superGoal: number;
  challenge: number;
  nothing: number;
  monthGrade: number;

  monthIndicators: {
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
    name: string;
  }[];

  nothingIndicators: {
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
    name: string;
  }[];
}

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
  name: string;
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
  const { openPopUpEditIndicator, setOpenPopUpEditIndicator } =
    useContext(EditIndicatorContext);

  const currentMonth = new Date().getMonth() + 1; // Mês atual
  const [month, setNumber] = useState(currentMonth);
  const [hasIndicators, setHasIndicators] = useState<boolean | null>(null);
  const [editingIndicator, setEditingIndicator] = useState<Indicator | null>(
    null
  );

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
    setUpdateData(true);
  };

  const decrementNumber = () => {
    setNumber(month - 1);
    setUpdateData(true);
  };

  const [monthStats, setMonthStats] = useState<MonthStatistics>();
  const [UpdateData, setUpdateData] = useState(true);

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/colaborator-indicator/statistics/month/${month}/colaboratorId/${userId}`
        );
        setMonthStats(response.data);
        // Verifica se há indicadores associados
        setHasIndicators(response.data.monthIndicators.length > 0);
      } catch (error) {
        console.error("Erro ao buscar indicadores:", error);
      }
    };

    if (UpdateData) {
      fetchIndicators();
      setUpdateData(false);
    }
  }, [month, userId, UpdateData]);

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
      <div className="flex flex-row justify-between items-center space-x-5 ml-5 mt-10 mb-5 mr-10">
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

          {monthStats && (
            <PDFDownloadButton
              name={data.name}
              role={data.role}
              grade={data.grade}
              id={data.id}
              doughnutChart={chartContext.chartImg}
              doughnutChartHollow={chartContext.pastChartImg}
              monthIndicators={monthStats.monthIndicators.slice(0, 5)}
              nothingIndicators={monthStats.nothingIndicators}
              monthNumber={month}
              validP={chartContext.validP}
              goalP={chartContext.goalP}
              superGoalP={chartContext.superGoalP}
              challengeP={chartContext.challengeP}
              nothingP={chartContext.nothingP}
              monthGrade={monthStats.monthGrade}
            />
          )}
        </div>
      </div>

      {/* Flex box da primeira linha de componentes */}
      <div className="flex flex-row gap-6 justify-center pl-8">
        <div className="flex flex-col w-[45%]">
          <div className="flex flex-row space-x-24 justify-between pr-3">
            <div className="mt-2 ml-5"> Indicadores</div>

            {/* Botão de adicionar só aparece caso tenha indicadores */}
            {hasIndicators === null ? (
              <p>Carregando botão...</p>
            ) : hasIndicators ? (
              <div>
                <AddIndicator
                  openPopUpIndicator={openPopUpIndicator}
                  setOpenPopUpIndicator={setOpenPopUpIndicator}
                  currentMonth={currentMonth}
                  monthToAddIndicator={month}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col w-[100%]">
            {/* Cards dos indicadores */}
            <div className="flex flex-col space-y-2 ml-5 mt-3 h-[21rem] overflow-scroll">
              {monthStats && month != currentMonth ? (
                <GradeChartCard
                  id={data.id}
                  month={month}
                  monthGrade={monthStats.monthGrade}
                  monthIndicators={monthStats.monthIndicators.slice(0, 6)}
                />
              ) : (
                ""
              )}
              {hasIndicators === null ? (
                <p>Carregando indicadores...</p>
              ) : hasIndicators ? (
                // Renderiza a lista de indicadores

                monthStats?.monthIndicators.map((indicator, index) => (
                  <IndicatorCard
                    key={index}
                    id={indicator.id}
                    colaboratorId={indicator.colaboratorId}
                    indicatorId={indicator.indicatorId}
                    result={indicator.result}
                    weight={indicator.weight}
                    unity={indicator.unity}
                    goal={indicator.goal}
                    supergoal={indicator.superGoal}
                    challenge={indicator.challenge}
                    name={indicator.name}
                    creationMonth={indicator.creationMonth}
                    openPopUpEditIndicator={openPopUpEditIndicator}
                    setOpenPopUpEditIndicator={setOpenPopUpEditIndicator}
                    editingIndicator={editingIndicator}
                    setEditingIndicator={setEditingIndicator}
                    month={month}
                    currentMonth={currentMonth}
                  />
                ))
              ) : (
                // Mostra a mensagem quando não há indicadores
                <div>
                  <NoIndicatorsCard></NoIndicatorsCard>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*Grafico dos indicadores */}
        <div className="flex w-[50%] gap-3">
          <div className="rounded-lg border border-solid p-[1.313rem] w-[50%]">
            <p className="text-lg">
              <span className="font-bold">
                {chartContext.validP}
                {"% "}
              </span>

              {monthStats && month != currentMonth ? (
                <span>dos indicadores foram alcançados</span>
              ) : (
                <span>dos indicadores foram alcançados no mês anterior</span>
              )}
            </p>

            <div className="w-full max-w-none h-40 my-4">
              <DoughnutChart
                chartData={getMonthData(
                  `http://localhost:3000/colaborator-indicator/statistics/month/${month}/colaboratorId/${userId}`
                )}
                centerText={true}
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
                <p className="font-bold">{chartContext.goalP || 0}%</p>
                <p className="font-bold">{chartContext.superGoalP || 0}%</p>
                <p className="font-bold">{chartContext.challengeP || 0}%</p>
              </div>
            </div>
          </div>

          {monthStats && (
            <IndicatorNotAchieve
              nothingIndicators={monthStats.nothingIndicators}
              month={month}
              actualMonth={currentMonth}
            />
          )}
        </div>
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
        UpdateData={UpdateData}
        setUpdateData={setUpdateData}
      ></CreateIndicatorModal>
      <AssignIndicatorModal
        openPopUpAssignIndicator={openPopUpAssignIndicator}
        setOpenPopUpAssignIndicator={setOpenPopUpAssignIndicator}
        UpdateData={UpdateData}
        setUpdateData={setUpdateData}
      ></AssignIndicatorModal>
      <EditIndicatorModal
        openPopUpEditIndicator={openPopUpEditIndicator}
        setOpenPopUpEditIndicator={setOpenPopUpEditIndicator}
        editingIndicator={editingIndicator}
        setEditingIndicator={setEditingIndicator}
        UpdateData={UpdateData}
        setUpdateData={setUpdateData}
      ></EditIndicatorModal>
    </>
  );
}
