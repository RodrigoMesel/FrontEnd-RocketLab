import axios from "axios";
import ColaboratorCard from "./ColaboratorCard";
import { useEffect, useState } from "react";

interface RankingDataI {
  colaboratorList: [
    {
      id: number;
      name: string;
      grade: number;
      role: string;
    }
  ];
}

const DashboardColaboratorRanking: React.FC = () => {
  const [colaboratorData, setColaboratorData] = useState<RankingDataI>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/colaborator/sortedByGrade")
      .then((res) => {
        setColaboratorData({ colaboratorList: res.data.slice(0, 6) });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="rounded-lg p-3 w-full flex gap-3 flex-col">
        <span className="text-xl">
          Ranking de colaboradores  
        </span>
        <div className="flex flex-wrap gap-3 justify-evenly">
          {colaboratorData?.colaboratorList.map((item) => (
            <ColaboratorCard
              name={item.name}
              grade={item.grade}
              role={item.role}
              id={item.id}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default DashboardColaboratorRanking;
