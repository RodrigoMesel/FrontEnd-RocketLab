import { useEffect, useState } from 'react';
import axios from "axios";

type MonthStatistics = {
  goal: number;
  superGoal: number;
  challenge: number;
  nothing: number;
  monthGrade: number;
  monthIndicators: Array<{
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
  nothingIndicators: Array<{
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
};

export function getMonthStatistics(month: number, colaboratorId: number): [MonthStatistics | null, boolean] {
  const [monthStats, setMonthStats] = useState<MonthStatistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMonthStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/colaborator-indicator/statistics/month/${month}/colaboratorId/${colaboratorId}`);
        const data: MonthStatistics = response.data;

        setMonthStats(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        setMonthStats(null);
        setLoading(false);
      }
    };

    fetchMonthStatistics();
  }, [month, colaboratorId]);

  return [monthStats, loading];
}
