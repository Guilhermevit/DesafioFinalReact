import { AjusteNomes, AjusteImagens } from "../helpers/helpers";

import { httpServiceGet } from "../services/httpService";

const CACHE = [];

function getStatistics(data) {
  const {
    total_derrotas,
    total_empates,
    total_vitorias,
    total_pontos,
    total_gols_marcados,
    total_gols_sofridos,
  } = data;

  const balanceGoals = total_gols_marcados - total_gols_sofridos;

  return {
    points: total_pontos,
    victories: total_vitorias,
    draws: total_empates,
    defeats: total_derrotas,
    goalsScored: total_gols_marcados,
    goalsTaken: total_gols_sofridos,
    balanceGoals,
  };
}

function getRankingFrom(rawData) {
  const ranking = rawData[rawData.length - 1].partidas
    .map(
      ({
        mandante,
        visitante,
        pontuacao_geral_mandante,
        pontuacao_geral_visitante,
      }) => {
        const hostData = getStatistics(pontuacao_geral_mandante);
        const visitorData = getStatistics(pontuacao_geral_visitante);

        return [
          {
            teamName: AjusteNomes(mandante),
            imageUrl: AjusteImagens(mandante),
            data: hostData,
          },
          {
            teamName: AjusteNomes(visitante),
            imageUrl: AjusteImagens(visitante),
            data: visitorData,
          },
        ];
      }
    )
    .flat()
    .sort((a, b) => b.data.points - a.data.points);

  return ranking;
}

export async function apiGetChampionshipDataFrom(year) {
  if (CACHE[year]) {
    console.log(`Obtendo dados de ${year} através do cache.`);
    return CACHE[year];
  }

  const data = await httpServiceGet(`http://localhost:3003/${year}`);
  const ranking = getRankingFrom(data);

  CACHE[year] = ranking;
  return ranking;
}
