import SearchBar from "../components/SearchBar";
import BarChart from "../components/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";

function getData() {
  const [data, setData] = useState([
    { month: 0, goal: 0, superGoal: 0, challenge: 0, nothing: 0 },
  ]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/colaborator-indicator/statistics")
      .then((res) => {
        const newData = () => {
          const newData = [];
          var month = new Date().getMonth();
          for (var i = 0; i < 6; i++) {
            newData.push({
              month: month,
              goal: res.data.goal[i],
              superGoal: res.data.superGoal[i],
              challenge: res.data.challenge[i],
              nothing: res.data.nothing[i],
            });
            month--;
          }
          return newData;
        };

        setData(newData);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(data);
  return data;
}

export default function Dashboard() {
  return (
    <>
      <div className="mt-2">
        <SearchBar />
      </div>
      <div className="items-center space-x-2 ml-5 mt-10 mr-4">
        <div className="font-bold text-3xl"> Dashboard </div>
      </div>

      <div className="rounded-xl border border-solid w-6/12 h-auto p-3">
        <div className=" text-4xs">Performance de Indicadores</div>
        <div className="">
          <BarChart chartData={getData()} yAxisLabel="Colaboradores" />
        </div>
      </div>
    </>
  );
}
