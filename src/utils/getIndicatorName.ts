import { useEffect, useState } from 'react';
import axios from "axios";

type Indicator = {
  id: number, 
  name: string
};

export function getIndicatorName(indicatorId: number): string | null {
  const [indicatorName, setIndicatorName] = useState<string | null>(null);

  useEffect(() => {
    const fetchIndicatorName = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/indicator/${indicatorId}`);
        const data: Indicator = response.data;
        const name = data.name;

        setIndicatorName(name);
      } catch (error) {
        console.error("Erro ao buscar nome do indicador:", error);
        setIndicatorName(null);
      }
    };

    fetchIndicatorName();
  }, [indicatorId]);

  return indicatorName;
}
