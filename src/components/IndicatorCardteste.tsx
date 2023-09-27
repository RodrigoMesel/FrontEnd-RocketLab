import React, { useEffect, useState } from 'react';
import { getMonthStatistics } from '../utils/getMonthStatistics';
import { getIndicatorName } from '../utils/getIndicatorName';

type MonthStatistics = {
  goal: number;
  superGoal: number;
  challenge: number;
  monthIndicators: Array<{
    id: number;
    weight: number;
  }>;
};

const IndicatorCard: React.FC = () => {
  // Id e mês fixos, depois alterar
  const [monthStats, loading] = getMonthStatistics(2, 3);
  const [indicatorNames, setIndicatorNames] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (monthStats) {
      const indicatorIds = monthStats.monthIndicators.map((indicator) => indicator.id);

      Promise.all(
        indicatorIds.map(async (indicatorId) => {
          const name = await getIndicatorName(indicatorId);
          return { [indicatorId]: name };
        })
      ).then((names) => {
        const indicatorNameMap = Object.assign({}, ...names);
        setIndicatorNames(indicatorNameMap);
      });
    }
  }, [monthStats]);

  return (
    <>
      {loading ? (
        <div>Carregando estatísticas...</div>
      ) : monthStats ? (
        <div>
          <h2>Estatísticas do Mês</h2>
          <p>Goal: {monthStats.goal}</p>
          <p>SuperGoal: {monthStats.superGoal}</p>
          <p>Challenge: {monthStats.challenge}</p>

          <h3>Indicadores do Mês:</h3>
          <ul>
            {monthStats.monthIndicators.map((indicator) => (
              <li key={indicator.id}>
                ID: {indicator.id}, Peso: {indicator.weight}, Nome: {indicatorNames[indicator.id]}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Erro ao carregar estatísticas</div>
      )}
    </>
  );
};

export default IndicatorCard;
