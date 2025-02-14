import getTeamsFromEspn from './api/getTeamsFromEspn.js';
import normalizeTeamNames from './utils/normalizeTeamNames.js';

const populateTeamData = async (teamArray) => {
  const normalizedTeamNames = teamArray.map((x) => normalizeTeamNames(x));

  const espnTeamData = await getTeamsFromEspn();

  const noData = [];

  const teamData = normalizedTeamNames.map((team) => {
    const espnTeam = espnTeamData.find(
      (espnTeam) => espnTeam.name === normalizeTeamNames(team)
    );
    if (espnTeam) return { ...espnTeam, name: team };
    noData.push(team);
    return { name: team };
  });

  return { teamData, noData };
};
export default populateTeamData;
