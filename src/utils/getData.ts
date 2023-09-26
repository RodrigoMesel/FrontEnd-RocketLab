import axios from "axios";
import { useState, useEffect } from "react";

export function getData() {
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
