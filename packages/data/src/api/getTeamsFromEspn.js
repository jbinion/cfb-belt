const getTeamsFromEspn = async () => {
  const data = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams?groups=50&limit=500'
  ).then((response) => response.json());
  console.log(data);
  console.log(data.sports[0].leagues);
  console.log(data.sports[0].leagues[0].teams[0]);
  console.log(data.sports[0].leagues[0].teams[0].team.logos[0]);
  return data.sports[0].leagues[0].teams.map((parent) => {
    const { nickname, displayName, color, alternateColor, logos } = parent.team;
    return {
      name: nickname,
      displayName,
      color,
      alternateColor,
      espnLogo: logos[0]?.href || '',
      logoFile: logos[0]?.href.split('/').pop() || '',
    };
  });
};
export default getTeamsFromEspn;
