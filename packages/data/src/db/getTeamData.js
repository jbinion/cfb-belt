import getTeamsFromEspn from '../api/getTeamsFromEspn.js';
import normalizeTeamNames from '../images/normalizeTeamNames.js';

const getTeamData = async (teamArray) => {
  const espnTeamData = await getTeamsFromEspn();
  const teamsWithEspnData = teamArray.map((team) => {
    const espnTeam = espnTeamData.find(
      (espnTeam) => espnTeam.name === normalizeTeamNames(team)
    );
    if (espnTeam) return { ...espnTeam, name: team };
    return { name: team };
  });

  return teamsWithEspnData;
};
export default getTeamData;
