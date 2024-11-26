import fs from 'fs';
import path from 'path';

const writeData = (data) => {
  const __dirname = import.meta.dirname;
  const destDir = path.join(__dirname, '../../out');
  const gameDataFile = path.join(destDir, 'gameData.json');
  const lineageFile = path.join(destDir, 'lineage.json');

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.writeFileSync(gameDataFile, JSON.stringify(data));

  const lineage = data.reduce((acc, game) => {
    const tie = game.home_points === game.away_points;
    if (tie) return acc;
    const winner =
      game.home_points > game.away_points ? game.home_team : game.away_team;
    if (acc[acc.length - 1] !== winner) acc.push(winner);
    return acc;
  }, []);

  fs.writeFileSync(lineageFile, JSON.stringify(lineage));
};
export default writeData;
