import axios from "axios";
import { useEffect, useState, useContext } from "react";
import HighlightsModal from "./HighlightsModal";
import { HighlightsModalContext } from "../context/HighlightsModalContext";

const HighlightsList: React.FC = () => {
  const highlightsContext = useContext(HighlightsModalContext);

  interface dataI {
    goal: [{ grade: number; id: number; name: string; role: string }];
    superGoal: [{ grade: number; id: number; name: string; role: string }];
    challenge: [{ grade: number; id: number; name: string; role: string }];
    nothing: [{ grade: number; id: number; name: string; role: string }];
  }

  const [data, setData] = useState<dataI>();
  useEffect(() => {
    axios
      .get("http://localhost:3000/colaborator-indicator/statistics")
      .then((res) => {
        const goal = res.data.lastMonthHighlights.goal;
        const superGoal = res.data.lastMonthHighlights.superGoal;
        const challenge = res.data.lastMonthHighlights.challenge;
        const nothing = res.data.lastMonthHighlights.nothing;

        setData({
          goal: goal,
          superGoal: superGoal,
          challenge: challenge,
          nothing: nothing,
        });
        console.log(res.data.lastMonthHighlights);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <ul className="max-w-md divide-y divide-gray-200">
        <li className="pb-3">
          <div
            className="flex items-center space-x-4 cursor-pointer h-20"
            onClick={() =>
              highlightsContext.handleOpen({ colaboratorList: data?.challenge })
            }
          >
            <div className="grid grid-flow-col w-12 h-8 justify-center mr-auto ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="49.5"
                height="33"
                viewBox="0 0 49.5 33"
                fill="none"
              >
                <circle
                  cx="33"
                  cy="16.1465"
                  r="16"
                  fill="#6186D3"
                  fill-opacity="0.5"
                />
                <path
                  d="M3.70312 11.6406C5.54688 10.8906 7.3125 10.5156 9 10.5156C10.6875 10.5156 12.4375 10.8906 14.25 11.6406C16.0938 12.3594 17.0156 13.3125 17.0156 14.5V16.5156H0.984375V14.5C0.984375 13.3125 1.89062 12.3594 3.70312 11.6406ZM11.8125 7.32812C11.0312 8.10938 10.0938 8.5 9 8.5C7.90625 8.5 6.96875 8.10938 6.1875 7.32812C5.40625 6.54688 5.01562 5.60938 5.01562 4.51562C5.01562 3.42188 5.40625 2.48438 6.1875 1.70312C6.96875 0.890625 7.90625 0.484375 9 0.484375C10.0938 0.484375 11.0312 0.890625 11.8125 1.70312C12.5938 2.48438 12.9844 3.42188 12.9844 4.51562C12.9844 5.60938 12.5938 6.54688 11.8125 7.32812Z"
                  fill="#FBFBFB"
                  transform="translate(24.75,8.25)"
                  fill-opacity="0.5"
                />
                <circle cx="16.5" cy="16.1465" r="16" fill="#6186D3" />
                <path
                  d="M3.70312 11.6406C5.54688 10.8906 7.3125 10.5156 9 10.5156C10.6875 10.5156 12.4375 10.8906 14.25 11.6406C16.0938 12.3594 17.0156 13.3125 17.0156 14.5V16.5156H0.984375V14.5C0.984375 13.3125 1.89062 12.3594 3.70312 11.6406ZM11.8125 7.32812C11.0312 8.10938 10.0938 8.5 9 8.5C7.90625 8.5 6.96875 8.10938 6.1875 7.32812C5.40625 6.54688 5.01562 5.60938 5.01562 4.51562C5.01562 3.42188 5.40625 2.48438 6.1875 1.70312C6.96875 0.890625 7.90625 0.484375 9 0.484375C10.0938 0.484375 11.0312 0.890625 11.8125 1.70312C12.5938 2.48438 12.9844 3.42188 12.9844 4.51562C12.9844 5.60938 12.5938 6.54688 11.8125 7.32812Z"
                  fill="#FBFBFB"
                  transform="translate(8.25, 8.25)"
                />
              </svg>
            </div>

            <p className="text-lg">
              <span className="font-bold">
                {data ? data.challenge.length : 0}
              </span>
              {data ? (
                data.goal.length != 1 ? (
                  <>
                    <span className="font-bold"> colaboradores</span>{" "}
                    <span> atingiram o Desafio de seu Indicador!</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold"> colaborador</span>{" "}
                    <span> atingiu o Desafio de seu Indicador!</span>
                  </>
                )
              ) : (
                <>
                  <span className="font-bold"> colaboradores</span>{" "}
                  <span> atingiram o Desafio de seu Indicador!</span>
                </>
              )}
            </p>
          </div>
        </li>
        <li className="py-3">
          <div
            className="flex items-center space-x-4 cursor-pointer h-20"
            onClick={() =>
              highlightsContext.handleOpen({ colaboratorList: data?.superGoal })
            }
          >
            <div className="grid grid-flow-col w-12 h-8 justify-center mr-auto ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="49.5"
                height="33"
                viewBox="0 0 49.5 33"
                fill="none"
              >
                <circle
                  cx="33"
                  cy="16.1465"
                  r="16"
                  fill="#32B97C"
                  fill-opacity="0.5"
                />
                <path
                  d="M3.70312 11.6406C5.54688 10.8906 7.3125 10.5156 9 10.5156C10.6875 10.5156 12.4375 10.8906 14.25 11.6406C16.0938 12.3594 17.0156 13.3125 17.0156 14.5V16.5156H0.984375V14.5C0.984375 13.3125 1.89062 12.3594 3.70312 11.6406ZM11.8125 7.32812C11.0312 8.10938 10.0938 8.5 9 8.5C7.90625 8.5 6.96875 8.10938 6.1875 7.32812C5.40625 6.54688 5.01562 5.60938 5.01562 4.51562C5.01562 3.42188 5.40625 2.48438 6.1875 1.70312C6.96875 0.890625 7.90625 0.484375 9 0.484375C10.0938 0.484375 11.0312 0.890625 11.8125 1.70312C12.5938 2.48438 12.9844 3.42188 12.9844 4.51562C12.9844 5.60938 12.5938 6.54688 11.8125 7.32812Z"
                  fill="#FBFBFB"
                  transform="translate(24.75,8.25)"
                  fill-opacity="0.5"
                />
                <circle cx="16.5" cy="16.1465" r="16" fill="#32B97C" />
                <path
                  d="M3.70312 11.6406C5.54688 10.8906 7.3125 10.5156 9 10.5156C10.6875 10.5156 12.4375 10.8906 14.25 11.6406C16.0938 12.3594 17.0156 13.3125 17.0156 14.5V16.5156H0.984375V14.5C0.984375 13.3125 1.89062 12.3594 3.70312 11.6406ZM11.8125 7.32812C11.0312 8.10938 10.0938 8.5 9 8.5C7.90625 8.5 6.96875 8.10938 6.1875 7.32812C5.40625 6.54688 5.01562 5.60938 5.01562 4.51562C5.01562 3.42188 5.40625 2.48438 6.1875 1.70312C6.96875 0.890625 7.90625 0.484375 9 0.484375C10.0938 0.484375 11.0312 0.890625 11.8125 1.70312C12.5938 2.48438 12.9844 3.42188 12.9844 4.51562C12.9844 5.60938 12.5938 6.54688 11.8125 7.32812Z"
                  fill="#FBFBFB"
                  transform="translate(8.25, 8.25)"
                />
              </svg>
            </div>

            <p className="text-lg">
              <span className="font-bold">
                {data ? data.superGoal.length : 0}
              </span>
              {data ? (
                data.goal.length != 1 ? (
                  <>
                    <span className="font-bold"> colaboradores</span>{" "}
                    <span> atingiram a Supermeta de seu Indicador!</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold"> colaborador</span>{" "}
                    <span> atingiu a Supermeta de seu Indicador!</span>
                  </>
                )
              ) : (
                <>
                  <span className="font-bold"> colaboradores</span>{" "}
                  <span> atingiram a Supermeta de seu Indicador!</span>
                </>
              )}
            </p>
          </div>
        </li>
        <li className="py-3">
          <div
            className="flex items-center space-x-4 cursor-pointer h-20"
            onClick={() =>
              highlightsContext.handleOpen({ colaboratorList: data?.goal })
            }
          >
            <div className="grid grid-flow-col w-12 h-8 justify-center mr-auto ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="49.5"
                height="33"
                viewBox="0 0 49.5 33"
                fill="none"
              >
                <circle
                  cx="33"
                  cy="16.1465"
                  r="16"
                  fill="#AC72C1"
                  fill-opacity="0.5"
                />
                <path
                  d="M3.70312 11.6406C5.54688 10.8906 7.3125 10.5156 9 10.5156C10.6875 10.5156 12.4375 10.8906 14.25 11.6406C16.0938 12.3594 17.0156 13.3125 17.0156 14.5V16.5156H0.984375V14.5C0.984375 13.3125 1.89062 12.3594 3.70312 11.6406ZM11.8125 7.32812C11.0312 8.10938 10.0938 8.5 9 8.5C7.90625 8.5 6.96875 8.10938 6.1875 7.32812C5.40625 6.54688 5.01562 5.60938 5.01562 4.51562C5.01562 3.42188 5.40625 2.48438 6.1875 1.70312C6.96875 0.890625 7.90625 0.484375 9 0.484375C10.0938 0.484375 11.0312 0.890625 11.8125 1.70312C12.5938 2.48438 12.9844 3.42188 12.9844 4.51562C12.9844 5.60938 12.5938 6.54688 11.8125 7.32812Z"
                  fill="#FBFBFB"
                  transform="translate(24.75,8.25)"
                  fill-opacity="0.5"
                />
                <circle cx="16.5" cy="16.1465" r="16" fill="#AC72C1" />
                <path
                  d="M3.70312 11.6406C5.54688 10.8906 7.3125 10.5156 9 10.5156C10.6875 10.5156 12.4375 10.8906 14.25 11.6406C16.0938 12.3594 17.0156 13.3125 17.0156 14.5V16.5156H0.984375V14.5C0.984375 13.3125 1.89062 12.3594 3.70312 11.6406ZM11.8125 7.32812C11.0312 8.10938 10.0938 8.5 9 8.5C7.90625 8.5 6.96875 8.10938 6.1875 7.32812C5.40625 6.54688 5.01562 5.60938 5.01562 4.51562C5.01562 3.42188 5.40625 2.48438 6.1875 1.70312C6.96875 0.890625 7.90625 0.484375 9 0.484375C10.0938 0.484375 11.0312 0.890625 11.8125 1.70312C12.5938 2.48438 12.9844 3.42188 12.9844 4.51562C12.9844 5.60938 12.5938 6.54688 11.8125 7.32812Z"
                  fill="#FBFBFB"
                  transform="translate(8.25, 8.25)"
                />
              </svg>
            </div>
            <p className="text-lg">
              <span className="font-bold">{data ? data.goal.length : 0}</span>
              {data ? (
                data.goal.length != 1 ? (
                  <>
                    <span className="font-bold"> colaboradores</span>{" "}
                    <span> atingiram a Meta de seu Indicador!</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold"> colaborador</span>{" "}
                    <span> atingiu a Meta de seu Indicador!</span>
                  </>
                )
              ) : (
                <>
                  <span className="font-bold"> colaboradores</span>{" "}
                  <span> atingiram a Meta de seu Indicador!</span>
                </>
              )}
            </p>
          </div>
        </li>
        <li className="pt-3">
          <div
            className="flex items-center space-x-4 cursor-pointer h-20"
            onClick={() =>
              highlightsContext.handleOpen({ colaboratorList: data?.nothing })
            }
          >
            <div className="grid grid-flow-col w-12 h-8 justify-center mr-auto ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="49.5"
                height="33"
                viewBox="0 0 49.5 33"
                fill="none"
              >
                <circle
                  cx="33"
                  cy="16.1465"
                  r="16"
                  fill="#F16062"
                  fill-opacity="0.5"
                />
                <path
                  d="M3.70312 11.6406C5.54688 10.8906 7.3125 10.5156 9 10.5156C10.6875 10.5156 12.4375 10.8906 14.25 11.6406C16.0938 12.3594 17.0156 13.3125 17.0156 14.5V16.5156H0.984375V14.5C0.984375 13.3125 1.89062 12.3594 3.70312 11.6406ZM11.8125 7.32812C11.0312 8.10938 10.0938 8.5 9 8.5C7.90625 8.5 6.96875 8.10938 6.1875 7.32812C5.40625 6.54688 5.01562 5.60938 5.01562 4.51562C5.01562 3.42188 5.40625 2.48438 6.1875 1.70312C6.96875 0.890625 7.90625 0.484375 9 0.484375C10.0938 0.484375 11.0312 0.890625 11.8125 1.70312C12.5938 2.48438 12.9844 3.42188 12.9844 4.51562C12.9844 5.60938 12.5938 6.54688 11.8125 7.32812Z"
                  fill="#FBFBFB"
                  transform="translate(24.75,8.25)"
                  fill-opacity="0.5"
                />
                <circle cx="16.5" cy="16.1465" r="16" fill="#F16062" />
                <path
                  d="M3.70312 11.6406C5.54688 10.8906 7.3125 10.5156 9 10.5156C10.6875 10.5156 12.4375 10.8906 14.25 11.6406C16.0938 12.3594 17.0156 13.3125 17.0156 14.5V16.5156H0.984375V14.5C0.984375 13.3125 1.89062 12.3594 3.70312 11.6406ZM11.8125 7.32812C11.0312 8.10938 10.0938 8.5 9 8.5C7.90625 8.5 6.96875 8.10938 6.1875 7.32812C5.40625 6.54688 5.01562 5.60938 5.01562 4.51562C5.01562 3.42188 5.40625 2.48438 6.1875 1.70312C6.96875 0.890625 7.90625 0.484375 9 0.484375C10.0938 0.484375 11.0312 0.890625 11.8125 1.70312C12.5938 2.48438 12.9844 3.42188 12.9844 4.51562C12.9844 5.60938 12.5938 6.54688 11.8125 7.32812Z"
                  fill="#FBFBFB"
                  transform="translate(8.25, 8.25)"
                />
              </svg>
            </div>
            <p className="text-lg">
              <span className="font-bold">
                {data ? data.nothing.length : 0}
              </span>
              {data ? (
                data.nothing.length != 1 ? (
                  <>
                    <span className="font-bold"> colaboradores</span>{" "}
                    <span> não atingiram seu Indicador.</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold"> colaborador</span>{" "}
                    <span> não atingiu seu Indicador.</span>
                  </>
                )
              ) : (
                <>
                  <span className="font-bold"> colaboradores</span>{" "}
                  <span> não atingiram seu Indicador.</span>
                </>
              )}
            </p>
          </div>
        </li>
      </ul>
      <HighlightsModal />
    </>
  );
};

export default HighlightsList;
