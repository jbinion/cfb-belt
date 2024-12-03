import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./out/old.beltTracker.json', 'utf8'));

const createLineage = (data) => {
  return data.reduce((acc, current) => {
    const { home_team, away_team, home_points, away_points } = current;
    let winner = '';
    if (home_points >= away_points) winner = home_team;
    else winner = away_team;
    if (acc.at(-1)?.holder !== winner) {
      // add final game to the last holder
      if (acc.length > 0) acc.at(-1).games.push(current);

      acc.push({ holder: winner, games: [current] });
    } else {
      acc.at(-1).games.push(current);
    }
    return acc;
  }, []);
};

const main = () => {
  console.log(data);
  const lineageWithGames = createLineage(data);

  const lineageWithDates = lineageWithGames.map((holder) => {
    const start = holder.games[0].start_date;
    const end = holder.games.at(-1).start_date;

    const duration = new Date(end) - new Date(start);
    const days = Math.round(duration / (1000 * 60 * 60 * 24));

    return { ...holder, days };
  });

  const teamTotals = lineageWithDates.reduce((acc, current) => {
    if (!acc[current.holder]) {
      acc[current.holder] = { count: 1, totalDuration: current.days };
      return acc;
    }
    const count = acc[current.holder].count;
    const totalDuration = acc[current.holder].totalDuration;
    acc[current.holder] = {
      count: count + 1,
      totalDuration: totalDuration + current.days,
    };
    return acc;
  }, {});

  fs.writeFileSync(
    './out/lineageWithGames.json',
    JSON.stringify(lineageWithDates)
  );
  fs.writeFileSync('./out/stats.json', JSON.stringify(teamTotals));
};
main();
