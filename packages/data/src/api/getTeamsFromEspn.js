const getTeamsFromEspn = async () => {
  const data = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams?groups=50&limit=700'
  ).then((response) => response.json());

  return data.sports[0].leagues[0].teams.map((parent) => {
    const { nickname, displayName, color, alternateColor, logos } = parent.team;
    return {
      name: nickname,
      displayName,
      color,
      alternateColor,
      espnLogo: logos[0]?.href || '',
      logoFile: logos[0]?.href.split('/').pop().split('.')[0] || 'default',
    };
  });
};
export default getTeamsFromEspn;
