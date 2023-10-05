import axios from "axios";
import { useState, useEffect } from "react";

export function getData(url: string) {
  const [data, setData] = useState([
    { month: 0, goal: 0, superGoal: 0, challenge: 0, nothing: 0 },
  ]);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const newData = () => {
          const newData = [];
          var month = new Date();
          for (var i = 0; i < 6; i++) {
            month.setMonth(month.getMonth() - 1);
            newData.push({
              month: month.getMonth(),
              goal: res.data.goal[i],
              superGoal: res.data.superGoal[i],
              challenge: res.data.challenge[i],
              nothing: res.data.nothing[i],
            });
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
  // console.log(data);
  return data;
}
