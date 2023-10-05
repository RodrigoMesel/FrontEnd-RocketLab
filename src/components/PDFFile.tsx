import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  View,
  Svg,
  Font,
  Path,
  G,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import PoppinsBold from "../assets/PDFFonts/Poppins-Bold.ttf";
import PoppinsRegular from "../assets/PDFFonts/Poppins-Regular.ttf";
import { getMonthName } from "../utils/getMonthName";

export interface PDFProps {
  name: string;
  role: string;
  grade: number;
  id: number;
  doughnutChart: string;
  doughnutChartHollow: string;
  validP: number;
  goalP: number;
  superGoalP: number;
  challengeP: number;
  nothingP: number;
  monthNumber: number;
  monthGrade: number;
  monthIndicators?: Array<{
    id: number;
    name: string;
    weight: number;
    goal: number;
    superGoal: number;
    challenge: number;
    result: number;
  }>;
  nothingIndicators?: Array<{
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
  }>;
}
Font.register({
  family: "Poppins",
  fonts: [
    {
      src: PoppinsRegular,
      fontWeight: 400,
    },
    {
      src: PoppinsBold,
      fontWeight: 700,
    },
  ],
});

const tw = createTw({
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
    },
  },
});

const PDFFile: React.FC<PDFProps> = ({
  id,
  name,
  grade,
  role,
  doughnutChart,
  doughnutChartHollow,
  monthIndicators,
  nothingIndicators,
  monthNumber,
  validP,
  goalP,
  superGoalP,
  challengeP,
  nothingP,
  monthGrade,
}) => {
  return (
    <Document>
      <Page
        size={{ width: 1079.1, height: 998.9 }}
        style={tw(
          "font-poppins text-[#312843] pr-4 pl-4 pt-[3.75rem] pb-[4.375rem]"
        )}
        wrap={false}
      >
        <View style={tw("pr-[8.5rem] pl-[8.5rem] pt-[3.75rem] pb-[4.375rem]")}>
          <View style={tw("flex flex-row w-[64.875rem] items-center")}>
            <View style={tw("flex w-[30.438rem] flex-row gap-[1.125rem]")}>
              <Icon />

              <View style={tw("w-[18.625rem] flex flex-col")}>
                <Text style={tw("font-normal text-base text-[#A3A3A3]")}>
                  {role}
                </Text>
                <Text style={tw("font-bold text-3xl")}>{name}</Text>
              </View>

              <Grade grade={grade} />
            </View>

            <View
              style={tw(
                "ml-[24.125rem] rounded-xl border border-solid w-[9.75rem] h-[2.438rem] justify-center items-center px-2.5 py-1 border-[#D9D9D9]"
              )}
            >
              <Text style={tw("font-medium text-base text-[#A3A3A3]")}>
                {getMonthName(monthNumber - 1)}
              </Text>
            </View>
          </View>

          <View
            style={tw("w-[64rem] h-[44.625rem] mt-[2.625rem] mx-[0.813rem]")}
          >
            <Text style={tw("mb-[1rem] text-base")}>Indicadores</Text>
            <View style={tw("flex flex-row flex-wrap gap-[7px]")}>
              {monthIndicators && (
                <GradeChart
                  doughnutChart={doughnutChartHollow}
                  monthGrade={monthGrade}
                  monthIndicators={monthIndicators}
                />
              )}
              {monthIndicators &&
                monthIndicators.map((indicator) => (
                  <Indicator
                    key={indicator.id}
                    id={indicator.id}
                    name={indicator.name}
                    weight={indicator.weight}
                    goal={indicator.goal}
                    superGoal={indicator.superGoal}
                    challenge={indicator.challenge}
                    result={indicator.result}
                  />
                ))}
            </View>
          </View>
          <View style={tw("flex flex-row gap-[7px] mt-[3.5rem] mx-[0.813rem]")}>
            <IndicatorGraph
              doughnutChart={doughnutChart}
              validP={validP}
              goalP={goalP}
              challengeP={challengeP}
              superGoalP={superGoalP}
            />
            <IndicatorNotReached nothingIndicators={nothingIndicators} />
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PDFFile;

const Icon = () => (
  <View
    style={tw(
      "rounded-3xl bg-[#E5E5E5] h-[3rem] w-[3rem] flex items-center justify-center ml-1 mt-[0.563rem]"
    )}
  >
    <Svg width="18" height="17" viewBox="0 0 18 17">
      <Path
        d="M3.70312 11.6406C5.54688 10.8906 7.3125 10.5156 9 10.5156C10.6875 10.5156 12.4375 10.8906 14.25 11.6406C16.0938 12.3594 17.0156 13.3125 17.0156 14.5V16.5156H0.984375V14.5C0.984375 13.3125 1.89062 12.3594 3.70312 11.6406ZM11.8125 7.32812C11.0312 8.10938 10.0938 8.5 9 8.5C7.90625 8.5 6.96875 8.10938 6.1875 7.32812C5.40625 6.54688 5.01562 5.60938 5.01562 4.51562C5.01562 3.42188 5.40625 2.48438 6.1875 1.70312C6.96875 0.890625 7.90625 0.484375 9 0.484375C10.0938 0.484375 11.0312 0.890625 11.8125 1.70312C12.5938 2.48438 12.9844 3.42188 12.9844 4.51562C12.9844 5.60938 12.5938 6.54688 11.8125 7.32812Z"
        fill="#FBFBFB"
      ></Path>
    </Svg>
  </View>
);

const Grade = (props: { grade: number }) => {
  const color =
    props.grade <= 1
      ? "bg-[#F16062]"
      : props.grade <= 2
      ? "bg-[#AC72C1]"
      : props.grade < 4
      ? "bg-[#32B97C]"
      : "bg-[#6186D3]";

  return (
    <View
      style={tw(
        `flex flex-row items-center rounded-xl mt-[0.563rem] pr-1 pl-1 ${color} gap-1 h-[3rem] w-[6.313rem] justify-center text-center text-white font-bold`
      )}
    >
      <Svg width="21" height="19" viewBox="0 0 21 19">
        <Path
          d="M10.5 15.25L4.3125 19L5.95312 11.9688L0.515625 7.23438L7.6875 6.625L10.5 0.015625L13.3125 6.625L20.4844 7.23438L15.0469 11.9688L16.6875 19L10.5 15.25Z"
          fill="#FDFDFD"
        />
      </Svg>
      <View style={tw("flex flex-row items-center mt-1")}>
        <Text style={tw("text-2xl leading-6 font-bold")}>{props.grade}</Text>
      </View>
    </View>
  );
};

const IndicatorDone = (props: { color: string; num: number }) => (
  <View
    style={tw(
      `flex flex-row rounded-xl ${props.color} overflow-hidden justify-center w-[7.3rem] items-center text-center text-white font-bold mr-[4rem]`
    )}
  >
    <Svg width="26" height="26" viewBox="0 0 26 26">
      <G strokeWidth={0} />
      <G strokeLineCap="round" />
      <G>
        <Path
          d="M17 9L9.99998 16L6.99994 13"
          stroke="#ffffff"
          strokeWidth={1.5}
          strokeLineCap="round"
        />
      </G>
    </Svg>
    <View style={tw("flex flex-row items-center")}>
      <Text style={tw("text-2xl leading-6 font-bold")}>{props.num}</Text>
    </View>
  </View>
);

const GradeChart = (props: {
  doughnutChart: string;
  monthGrade: number;
  monthIndicators: Array<{
    id: number;
    name: string;
    weight: number;
    goal: number;
    superGoal: number;
    challenge: number;
    result: number;
  }>;
}) => {
  const borderColor = (
    result: number,
    goal: number,
    superGoal: number,
    challenge: number
  ) => {
    const color =
      result >= challenge
        ? "border-[#6186D3]"
        : result >= superGoal
        ? "border-[#32B97C]"
        : result >= goal
        ? "border-[#AC72C1]"
        : "border-[#F16062]";
    return color;
  };
  return (
    <>
      <View
        style={tw(
          "flex flex-row w-[31.625rem] h-[13.25rem] rounded-[20px] bg-[#F5F5F5] pl-[1.563rem] pr-[0.563rem] pb-[2.676rem] pt-[1.761rem] overflow-hidden"
        )}
      >
        <View style={tw("w-auto h-auto mt-[1rem] items-center")}>
          {props.doughnutChart != "" ? (
            <Image
              style={tw("w-auto h-auto")}
              src={props.doughnutChart}
            ></Image>
          ) : (
            <></>
          )}
        </View>

        <View style={tw("flex flex-col ml-[1rem] mt-[3rem]")}>
          <Text style={tw("text-base")}>Total do mês</Text>
          <View style={tw("flex flex-row items-center")}>
            <Svg
              style={tw("mb-[0.6rem] mr-[0.4rem]")}
              width="21"
              height="19"
              viewBox="0 0 21 19"
            >
              <Path
                d="M10.5 15.25L4.3125 19L5.95312 11.9688L0.515625 7.23438L7.6875 6.625L10.5 0.015625L13.3125 6.625L20.4844 7.23438L15.0469 11.9688L16.6875 19L10.5 15.25Z"
                fill="#312843"
              />
            </Svg>

            <Text style={tw("font-bold text-[26px]")}>
              {props.monthGrade.toFixed(2).replace(/[.,]00$/, "")}
            </Text>
          </View>
        </View>
        <View
          style={tw(
            "flex flex-row flex-wrap ml-[1.688rem] gap-[8px] w-[16rem]"
          )}
        >
          {props.monthIndicators.map((indicator) => (
            <View
              style={tw(
                `flex flex-col ${borderColor(
                  indicator.result,
                  indicator.goal,
                  indicator.superGoal,
                  indicator.challenge
                )} w-[6.45rem] border-l-2 pl-3 overflow-hidden`
              )}
            >
              <Text style={tw("text-sm font-normal")}>#{indicator.id}</Text>
              <Text style={tw("text-lg font-bold")}>{indicator.result}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

const Indicator = (props: {
  id: number;
  name: string;
  weight: number;
  goal: number;
  superGoal: number;
  challenge: number;
  result: number;
}) => {
  const color =
    props.result >= props.challenge
      ? "bg-[#6186D3]"
      : props.result >= props.superGoal
      ? "bg-[#32B97C]"
      : props.result >= props.goal
      ? "bg-[#AC72C1]"
      : "bg-[#F16062]";

  const type =
    props.result >= props.challenge
      ? "challenge"
      : props.result >= props.superGoal
      ? "superGoal"
      : props.result >= props.goal
      ? "goal"
      : "nothing";

  return (
    <View
      style={tw(
        "w-[31.625rem] h-[13.25rem] rounded-[20px] bg-[#F5F5F5] px-[1.563rem] pb-[2.676rem] pt-[1.761rem] overflow-hidden"
      )}
    >
      <View style={tw("flex flex-row justify-between w-[28.75rem] h-3")}>
        <View style={tw("w-[25.75rem] h-[2.875rem]")}>
          <Text style={tw("text-lg")}>
            #{props.id} {props.name}
          </Text>
          <Text style={tw("text-sm text-[#A3A3A3]")}>Peso: {props.weight}</Text>
        </View>
        <View
          style={tw(
            `${color} rounded-[20px] px-[0.792rem] max-w-[15rem] min-w-[3rem] h-[3rem] text-center items-center justify-center pt-2 overflow-hidden`
          )}
        >
          <Text style={tw(`text-xl text-white font-bold`)}>{props.result}</Text>
        </View>
      </View>

      <View style={tw("mt-[4rem] w-[31.438rem] h-[3.875rem] flex flex-row")}>
        {type === "goal" ? (
          <View
            style={tw(
              "border-l-3 border-[#AC72C1] w-[10.438rem] h-[3.875rem] pl-[0.688rem] pt-[0.27rem] overflow-hidden"
            )}
          >
            <Text style={tw("text-base")}>Meta</Text>
            <IndicatorDone color={color} num={props.goal} />
          </View>
        ) : (
          <View
            style={tw(
              "border-l-2 border-[#312843] w-[10.438rem] h-[3.875rem] pl-[0.688rem] pt-[0.27rem] overflow-hidden"
            )}
          >
            <Text style={tw("text-base")}>Meta</Text>
            <Text style={tw("text-2xl font-bold mt-[0.27rem]")}>
              {props.goal}
            </Text>
          </View>
        )}

        {type === "superGoal" ? (
          <View
            style={tw(
              "border-l-2 border-[#32B97C] w-[10.438rem] h-[3.875rem] pl-[0.688rem] pt-[0.27rem] overflow-hidden"
            )}
          >
            <Text style={tw("text-base")}>Supermeta</Text>
            <IndicatorDone color={color} num={props.superGoal} />
          </View>
        ) : (
          <View
            style={tw(
              "border-l-2 border-[#312843] w-[10.438rem] h-[3.875rem] pl-[0.688rem] pt-[0.27rem] overflow-hidden"
            )}
          >
            <Text style={tw("text-base")}>Supermeta</Text>
            <Text style={tw("text-2xl font-bold mt-[0.27rem]")}>
              {props.superGoal}
            </Text>
          </View>
        )}
        {type === "challenge" ? (
          <View
            style={tw(
              "border-l-2 border-[#6186D3] w-[10.438rem] h-[3.875rem] pl-[0.688rem] pt-[0.27rem] overflow-hidden"
            )}
          >
            <Text style={tw("text-base")}>Desafio</Text>
            <IndicatorDone color={color} num={props.challenge} />
          </View>
        ) : (
          <View
            style={tw(
              "border-l-2 border-[#312843] w-[10.438rem] h-[3.875rem] pl-[0.688rem] pt-[0.27rem] overflow-hidden"
            )}
          >
            <Text style={tw("text-base")}>Desafio</Text>
            <Text style={tw("text-2xl font-bold mt-[0.27rem]")}>
              {props.challenge}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
const IndicatorGraph = (props: {
  doughnutChart: string;
  validP: number;
  goalP: number;
  superGoalP: number;
  challengeP: number;
}) => {
  return (
    <View
      style={tw(
        "w-[31.625rem] h-[13.25rem] border rounded-[20px] border-[#D9D9D9] px-[2.5rem] py-[1.75rem] overflow-hidden"
      )}
    >
      <View style={tw("flex flex-row")}>
        <Text style={tw("font-bold text-base")}>{props.validP}% </Text>
        <Text style={tw("text-base")}>dos indicadores foram alcançados</Text>
      </View>

      <View style={tw("w-[19.75rem] h-[10rem] flex flex-row items-center ")}>
        <View style={tw("w-auto h-auto mt-[1rem] mr-[5rem] items-center")}>
          {props.doughnutChart != "" ? (
            <Image
              style={tw("w-auto h-auto")}
              src={props.doughnutChart}
            ></Image>
          ) : (
            <></>
          )}
        </View>
        <View style={tw("flex flex-row gap-[4rem]")}>
          <View style={tw("mt-[1rem] text-xs flex flex-col gap-[8px]")}>
            <View style={tw("flex flex-row items-center gap-[9px]")}>
              <View
                style={tw(
                  "bg-[#AC72C1] rounded-[21px] w-[12px] h-[0.25rem] mt-[0.338rem]"
                )}
              ></View>
              <Text>Meta</Text>
            </View>

            <View style={tw("flex flex-row items-center gap-[9px]")}>
              <View
                style={tw(
                  "bg-[#32B97C] rounded-[21px] w-[18px] h-[0.25rem] mt-[0.338rem]"
                )}
              ></View>
              <Text>Supermeta</Text>
            </View>

            <View style={tw("flex flex-row items-center gap-[9px]")}>
              <View
                style={tw(
                  "bg-[#6186D3] rounded-[21px] w-[12px] h-[0.25rem] mt-[0.338rem]"
                )}
              ></View>
              <Text>Desafio</Text>
            </View>
          </View>
          <View
            style={tw("mt-[1rem] text-xs font-bold flex flex-col gap-[8px]")}
          >
            <Text>{props.goalP || 0}%</Text>
            <Text>{props.superGoalP || 0}%</Text>
            <Text>{props.challengeP || 0}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const IndicatorNotReached = (props: {
  nothingIndicators?: Array<{
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
  }>;
}) => {
  return (
    <View
      style={tw(
        "w-[31.625rem] h-[13.25rem] border rounded-[20px] border-[#D9D9D9] px-[2.5rem] py-[1.75rem] overflow-hidden"
      )}
    >
      <Text style={tw("text-base")}>Indicadores não alcançados</Text>
      <View style={tw("flex flex-col flex-wrap mt-[1.25rem] overflow-hidden")}>
        {props.nothingIndicators &&
          props.nothingIndicators.map((indicator) => (
            <View
              key={indicator.id}
              style={tw("flex flex-row items-center gap-[9px]")}
            >
              <View
                style={tw(
                  "bg-[#F16062] rounded-[21px] w-[0.90rem] h-[0.25rem] mb-[1.2rem]"
                )}
              ></View>
              <View style={tw("w-[8.79rem] h-[2.25rem]")}>
                <Text style={tw("text-xs")}>
                  {indicator.name}({indicator.goal})
                </Text>
              </View>
              <View style={tw("w-[2.813rem] h-[2.25rem]")}>
                <Text style={tw("text-xs font-bold")}>{indicator.result}</Text>
              </View>
            </View>
          ))}
      </View>
    </View>
  );
};
