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
            className="flex items-center space-x-4 cursor-pointer"
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
                <circle cx="16.5" cy="16.1465" r="16" fill="#6186D3" />

                <circle
                  cx="33"
                  cy="16.1465"
                  r="16"
                  fill="#6186D3"
                  fill-opacity="0.5"
                />
              </svg>
            </div>

            <p>
              <span className="font-bold">
                {data ? data.challenge.length : 0} colaboradores{" "}
              </span>
              atingiram o Desafio de seu Indicador!
            </p>
          </div>
        </li>
        <li className="py-3">
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() =>
              highlightsContext.handleOpen({ colaboratorList: data?.superGoal })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
            >
              <circle cx="16.5" cy="16.293" r="16" fill="#32B97C" />
            </svg>
            <p>
              <span className="font-bold">
                {data ? data.superGoal.length : 0} colaboradores{" "}
              </span>
              atingiram a Supermeta de seu Indicador!
            </p>
          </div>
        </li>
        <li className="py-3">
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() =>
              highlightsContext.handleOpen({ colaboratorList: data?.goal })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="28"
              viewBox="0 0 33 28"
              fill="none"
            >
              <circle cx="16.5" cy="16.4395" r="16" fill="#AC72C1" />
            </svg>
            <p>
              <span className="font-bold">
                {data ? data.goal.length : 0} colaboradores{" "}
              </span>
              atingiram a Meta de seu Indicador!
            </p>
          </div>
        </li>
        <li className="pt-3">
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() =>
              highlightsContext.handleOpen({ colaboratorList: data?.nothing })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="28"
              viewBox="0 0 33 28"
              fill="none"
            >
              <circle cx="16.5" cy="16.4395" r="16" fill="#F16062" />
            </svg>
            <p>
              <span className="font-bold">
                {data ? data.nothing.length : 0} colaboradores{" "}
              </span>
              não atingiram seu Indicador.
            </p>
          </div>
        </li>
      </ul>
      <HighlightsModal />
    </>
  );
};

export default HighlightsList;
