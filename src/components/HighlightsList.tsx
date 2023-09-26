import axios from "axios";
import { useEffect, useState } from "react";

const HighlightsList: React.FC = () => {
  const [data, setData] = useState({
    goal: [{ grade: 0, id: 0, name: "", role: "" }],
    superGoal: [{ grade: 0, id: 0, name: "", role: "" }],
    challenge: [{ grade: 0, id: 0, name: "", role: "" }],
    nothing: [{ grade: 0, id: 0, name: "", role: "" }],
  });
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
          <a href="#" className="block h-full w-full no-underline">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
              >
                <circle cx="16.5" cy="16.1465" r="16" fill="#6186D3" />
              </svg>
              <p>
                <span className="font-bold">
                  {data.challenge.length} colaboradores{" "}
                </span>
                atingiram o Desafio de seu Indicador!
              </p>
            </div>
          </a>
        </li>
        <li className="py-3">
          <a href="#" className="block h-full w-full no-underline">
            <div className="flex items-center space-x-4">
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
                  {data.superGoal.length} colaboradores{" "}
                </span>
                atingiram a Supermeta de seu Indicador!
              </p>
            </div>
          </a>
        </li>
        <li className="py-3">
          <a href="#" className="block h-full w-full no-underline">
            <div className="flex items-center space-x-4">
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
                  {data.goal.length} colaboradores{" "}
                </span>
                atingiram a Meta de seu Indicador!
              </p>
            </div>
          </a>
        </li>
        <li className="pt-3">
          <a href="#" className="block h-full w-full no-underline">
            <div className="flex items-center space-x-4">
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
                  {data.nothing.length} colaboradores{" "}
                </span>
                não atingiram seu Indicador.
              </p>
            </div>
          </a>
        </li>
      </ul>
    </>
  );
};

export default HighlightsList;
