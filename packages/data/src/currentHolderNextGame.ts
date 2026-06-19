import './dotenv';
import { db, teamTable, reignsTable, reignGamesTable, gamesTable } from '@cfb/db';
import { desc, eq } from 'drizzle-orm';
import config from './config';
import getWeeks from './api/getWeeks';
import populateTeamData from './populateTeamData';
import saveTeams from './sqlite/saveTeams';
import saveNextGame from './sqlite/saveNextGame';

const main = async () => {
	const currentReign = await db
		.select({ id: reignsTable.id, teamName: teamTable.name })
		.from(reignsTable)
		.innerJoin(teamTable, eq(reignsTable.teamId, teamTable.id))
		.orderBy(desc(reignsTable.startDate))
		.limit(1)
		.then((r) => r[0] ?? null);

	if (!currentReign) throw new Error('No current reign found');

	const lastGame = await db
		.select({ espnId: gamesTable.id })
		.from(reignGamesTable)
		.innerJoin(gamesTable, eq(reignGamesTable.gameId, gamesTable.id))
		.where(eq(reignGamesTable.reignId, currentReign.id))
		.orderBy(desc(gamesTable.startDate))
		.limit(1)
		.then((r) => r[0] ?? null);

	if (!lastGame) throw new Error('Current reign has no games');

	console.log('last game ESPN id:', lastGame.espnId);

	const searchParams = new URLSearchParams({ id: lastGame.espnId }).toString();
	const res = await fetch(config.baseUrl + '/games?' + searchParams, config.reqOptions);
	const data = await res.json();
	const { season, week, seasonType } = data[0];

	const teamName = currentReign.teamName;
	const weeks = await getWeeks(season);
	const currentGameIndex = weeks.findIndex(
		(x: { week: string; type: string }) => x.week === week && x.type === seasonType
	);
	console.log('Current game index:', currentGameIndex);

	let nextGame = null;

	if (currentGameIndex !== -1) {
		for (let i = currentGameIndex + 1; i < weeks.length; i++) {
			const nextWeek = weeks[i];
			const gamesParams = new URLSearchParams({
				year: season,
				week: nextWeek.week,
				seasonType: nextWeek.type,
				team: teamName,
			}).toString();

			const gamesRes = await fetch(
				config.baseUrl + '/games?' + gamesParams,
				config.reqOptions
			);
			const games = await gamesRes.json();

			if (games?.length > 0) {
				nextGame = games[0];
				console.log('Found next game:', nextGame);
				break;
			}
		}

		if (!nextGame) {
			const nextSeason = parseInt(season) + 1;
			const nextSeasonWeeks = await getWeeks(nextSeason);
			if (nextSeasonWeeks?.length) {
				const firstWeek = nextSeasonWeeks[0];
				const params = new URLSearchParams({
					year: nextSeason,
					week: firstWeek.week,
					seasonType: firstWeek.type,
					team: teamName,
				}).toString();
				const nextSeasonRes = await fetch(
					config.baseUrl + '/games?' + params,
					config.reqOptions
				);
				const nextSeasonGames = await nextSeasonRes.json();
				if (nextSeasonGames?.length) nextGame = nextSeasonGames[0];
			}
		}
	}

	if (nextGame) {
		const { teamData, noData } = await populateTeamData([nextGame.homeTeam, nextGame.awayTeam]);
		if (noData.length) console.log('no data for:', noData);
		await saveTeams(teamData);
		await saveNextGame({
			home_team: nextGame.homeTeam,
			away_team: nextGame.awayTeam,
			start_date: nextGame.startDate,
			gameId: nextGame.id,
		});
		console.log('next game saved');
		process.exit(0);
	} else {
		console.log('No next game found');
	}
};

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
