import 'dotenv/config';
import { Reign, NextGame } from 'models';

import mongoose from './mongoose.js';
import config from './config.js';
import getWeeks from './api/getWeeks.js';
import populateTeamData from './populateTeamData.js';
import saveTeams from './db/saveTeams.js';
import saveNextGame from './db/saveNextGame.js';

const main = async () => {
  await mongoose();
  console.log('db connected');

  const currentReign = await Reign.findOne({})
    .sort({ startDate: -1 })
    .populate('team')
    .populate('games');
  console.log(currentReign);
  const lastGameId = currentReign.games.at(-1).id;
  console.log(lastGameId);

  const searchParams = new URLSearchParams({ id: lastGameId }).toString();
  const url = config.baseUrl + '/games?' + searchParams;

  console.log(url);
  const res = await fetch(url, config.reqOptions);
  const data = await res.json();
  const { season, week, seasonType } = data[0];
  console.log(data);
  console.log(season);
  console.log(week);
  console.log(seasonType);

  let nextGame = null;
  const teamName = currentReign.team.name; // Assuming team has a name property

  const weeks = await getWeeks(season);
  console.log(weeks);
  const currentGameIndex = weeks.findIndex(
    (x) => x.week === week && x.type === seasonType
  );
  console.log('Current game index:', currentGameIndex);

  if (currentGameIndex !== -1) {
    // Start looking from the next week
    for (let i = currentGameIndex + 1; i < weeks.length; i++) {
      const nextWeek = weeks[i];
      console.log(`Checking week ${nextWeek.week} (${nextWeek.type})`);

      // Fetch games for this week and team
      const gamesParams = new URLSearchParams({
        year: season,
        week: nextWeek.week,
        seasonType: nextWeek.type,
        team: teamName, // or however you identify the team in the API
      }).toString();

      const gamesUrl = config.baseUrl + '/games?' + gamesParams;
      console.log('Fetching:', gamesUrl);

      try {
        const gamesRes = await fetch(gamesUrl, config.reqOptions);
        const games = await gamesRes.json();

        if (games && games.length > 0) {
          // Found a game for this team in this week
          nextGame = games[0];
          console.log('Found next game:', nextGame);
          break;
        } else {
          console.log(
            `No game found for week ${nextWeek.week} (${nextWeek.type})`
          );
        }
      } catch (error) {
        console.error(`Error fetching games for week ${nextWeek.week}:`, error);
      }
    }

    if (!nextGame) {
      console.log('No more games found for this season');

      // Optionally check next season
      const nextSeason = parseInt(season) + 1;
      console.log(`Checking next season: ${nextSeason}`);

      try {
        const nextSeasonWeeks = await getWeeks(nextSeason);
        if (nextSeasonWeeks && nextSeasonWeeks.length > 0) {
          // Check first week of next season
          const firstWeek = nextSeasonWeeks[0];
          const nextSeasonParams = new URLSearchParams({
            year: nextSeason,
            week: firstWeek.week,
            seasonType: firstWeek.type,
            team: teamName,
          }).toString();

          const nextSeasonUrl = config.baseUrl + '/games?' + nextSeasonParams;
          const nextSeasonRes = await fetch(nextSeasonUrl, config.reqOptions);
          const nextSeasonGames = await nextSeasonRes.json();

          if (nextSeasonGames && nextSeasonGames.length > 0) {
            nextGame = nextSeasonGames[0];
            console.log('Found next game in next season:', nextGame);
          }
        }
      } catch (error) {
        console.error('Error checking next season:', error);
      }
    }
  } else {
    console.log('Current game week not found in weeks array');
  }

  if (nextGame) {
    console.log('Next game found:', {
      id: nextGame.id,
      week: nextGame.week,
      seasonType: nextGame.seasonType,
      homeTeam: nextGame.homeTeam,
      awayTeam: nextGame.awayTeam,
      startDate: nextGame.startDate,
    });

    await NextGame.deleteMany();
    const { teamData, noData } = await populateTeamData([
      nextGame.homeTeam,
      nextGame.awayTeam,
    ]);
    console.log(teamData);
    await saveTeams(teamData);

    await saveNextGame({
      home_team: nextGame.homeTeam,
      away_team: nextGame.awayTeam,
      start_date: nextGame.startDate,
      gameId: nextGame.id,
    });

    process.exit();
  } else {
    console.log('No next game found');
  }
};

main();
