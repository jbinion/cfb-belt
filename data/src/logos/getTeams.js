import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./out/old.beltTracker.json', 'utf8'));
const lineageData = JSON.parse(fs.readFileSync('./out/lineageWithGames.json'));

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
  fs.writeFileSync('./espndata.json', JSON.stringify(espnTeamData), 'utf-8');
  const allAppearingTeams = data.reduce((acc, current) => {
    if (!acc.includes(current.home_team)) acc.push(current.home_team);
    if (!acc.includes(current.away_team)) acc.push(current.away_team);
    return acc;
  }, []);

  console.log(allAppearingTeams.length);
  console.log(espnTeamData.length);

  const merged = allAppearingTeams.map((team) => {
    const espnTeam = espnTeamData.find(
      (espnTeam) => espnTeam.name === normalizeTeamNames(team)
    );
    if (espnTeam) return { ...espnTeam, name: team };
    return { name: team };
  });
  console.log(merged);

  const noImages = merged.filter((x) => !x.hasOwnProperty('logo'));

  const lineageWithLogos = lineageData.map((d) => {
    const espnObj = merged.find((x) => x.name === d.holder);
    return { ...espnObj, ...d };
  });
  console.log(lineageWithLogos);
  fs.writeFileSync('./out/final.json', JSON.stringify(lineageWithLogos));
  fs.writeFileSync('./out/noImages.json', JSON.stringify(noImages));
};

main();

function normalizeTeamNames(teamName) {
  if (
    teamName === 'Kent State' ||
    teamName === 'Utah State' ||
    teamName === 'Ohio State' ||
    teamName === 'NC State' ||
    teamName === 'Iowa State' ||
    teamName === 'Penn State'
  )
    return teamName;
  if (teamName === 'Florida Atlantic') return 'FAU';
  if (teamName === 'Florida International') return 'FIU';
  if (teamName === 'Western Kentucky') return 'Western KY';
  if (teamName === 'Western Carolina') return 'W Carolina';
  if (teamName === 'South Dakota State') return 'S Dakota St';
  if (teamName === 'Pennsylvania') return 'Penn';
  if (teamName === 'Southeast Missouri State') return 'SE Missouri';
  if (teamName === 'Georgia Southern') return 'GA Southern';
  if (teamName === 'Stephen F. Austin') return 'SF Austin';
  if (teamName === 'Charleston Southern') return 'Charleston So';
  if (teamName === 'North Dakota State') return 'N Dakota St';
  if (teamName === 'Pittsburgh') return 'Pitt';
  if (teamName === 'George Washington') return 'G Washington';
  if (teamName === 'Massachusetts') return 'UMass';
  let espnName = teamName.replace('State', 'St');

  return espnName;
}
