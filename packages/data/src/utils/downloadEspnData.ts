import fs from 'fs';
import getTeamsFromEspn from '../api/getTeamsFromEspn.js';

const downloadEspnData = async () => {
	const teamDatas = await getTeamsFromEspn();
	fs.writeFileSync('./espnTeamData.json', JSON.stringify(teamDatas));
};
downloadEspnData();
