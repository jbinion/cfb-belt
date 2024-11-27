import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./out/old.beltTracker.json', 'utf8'));

const getTeams = async () => {
  const data = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?groups=50&limit=500'
  ).then((response) => response.json());

  return data.sports[0].leagues[0].teams.map((parent) => {
    const team = parent.team;
    const { nickname, displayName, color, alternateColor, logos } = team;
    return {
      name: nickname,
      displayName,
      color,
      alternateColor,
      logo: logos[0].href,
    };
  });
};

const main = async () => {
  const espnTeamData = await getTeams();
  const allAppearingTeams = data.reduce((acc, current) => {
    if (!acc.includes(current.home_team)) acc.push(current.home_team);
    if (!acc.includes(current.away_team)) acc.push(current.away_team);
    return acc;
  }, []);

  console.log(allAppearingTeams.length);
  console.log(espnTeamData.length);

  const merged = allAppearingTeams.map((team) => {
    const espnTeam = espnTeamData.find((espnTeam) => espnTeam.name === team);
    if (espnTeam) return { name: team, ...espnTeam };
    return { name: team };
  });
  console.log(merged);
  //   fs.writeFileSync('./out/teams.json', JSON.stringify(merged));
};

main();
