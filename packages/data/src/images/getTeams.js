import fs from 'fs';
import normalizeTeamNames from './normalizeTeamNames.js';
const data = JSON.parse(fs.readFileSync('./out/old.beltTracker.json', 'utf8'));
const lineageData = JSON.parse(fs.readFileSync('./out/lineageWithGames.json'));

const downloadImage = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`
      );

    const buffer = await response.arrayBuffer();
    const filename = url.split('/').pop();
    const filepath = `./logos/${filename}`;

    // Ensure logos directory exists
    if (!fs.existsSync('./logos')) {
      fs.mkdirSync('./logos', { recursive: true });
    }

    fs.writeFileSync(filepath, Buffer.from(buffer));
    return filename;
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
    return null;
  }
};

const downloadAllImages = async (urls) => {
  return Promise.all(
    urls.map(async (url) => {
      const filename = await downloadImage(url);
      console.log(filename);
    })
  );
};

const getTeams = async () => {
  const data = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?groups=50&limit=500'
  ).then((response) => response.json());

  return data.sports[0].leagues[0].teams.map((parent) => {
    const { nickname, displayName, color, alternateColor, logos } = parent.team;
    return {
      name: nickname,
      displayName,
      color,
      alternateColor,
      espnLogo: logos[0].href,
      logoFile: logos[0].href.split('/').pop(),
    };
  });
};

const main = async () => {
  const espnTeamData = await getTeams();
  // fs.writeFileSync('./espndata.json', JSON.stringify(espnTeamData), 'utf-8');
  const allAppearingTeams = data.reduce((acc, current) => {
    if (!acc.includes(current.home_team)) acc.push(current.home_team);
    if (!acc.includes(current.away_team)) acc.push(current.away_team);
    return acc;
  }, []);

  const teamsWithEspnData = allAppearingTeams.map((team) => {
    const espnTeam = espnTeamData.find(
      (espnTeam) => espnTeam.name === normalizeTeamNames(team)
    );
    if (espnTeam) return { ...espnTeam, name: team };
    return { name: team };
  });
  console.log(teamsWithEspnData);

  const urls = teamsWithEspnData
    .filter((x) => x.hasOwnProperty('espnLogo'))
    .map((x) => x.espnLogo);

  const noImages = teamsWithEspnData.filter(
    (x) => !x.hasOwnProperty('espnLogo')
  );

  // await downloadAllImages(urls);

  const lineageWithTeamData = lineageData.map((d) => {
    const espnObj = teamsWithEspnData.find((x) => x.name === d.holder);
    delete espnObj.espnLogo;
    return { ...espnObj, ...d };
  });
  console.log(lineageWithTeamData);
  fs.writeFileSync('./out/final.json', JSON.stringify(lineageWithTeamData));
  // fs.writeFileSync('./out/noImages.json', JSON.stringify(noImages));
};

main();
