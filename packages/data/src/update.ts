import './dotenv';
import { db, teamTable, reignsTable, reignGamesTable, gamesTable } from '@cfb/db';
import { desc, eq } from 'drizzle-orm';
import getGameById from './api/getGameById';
import getWeeks from './api/getWeeks';
import crawler from './crawler';
import saveReign from './sqlite/saveReign';

const main = async () => {
	const currentReign = await db
		.select({ id: reignsTable.id, startDate: reignsTable.startDate, teamName: teamTable.name })
		.from(reignsTable)
		.innerJoin(teamTable, eq(reignsTable.teamId, teamTable.id))
		.orderBy(desc(reignsTable.startDate))
		.limit(1)
		.then((r) => r[0] ?? null);

	if (!currentReign) throw new Error('No current reign found');

	const lastGame = await db
		.select({ espnId: gamesTable.id, startDate: gamesTable.startDate })
		.from(reignGamesTable)
		.innerJoin(gamesTable, eq(reignGamesTable.gameId, gamesTable.id))
		.where(eq(reignGamesTable.reignId, currentReign.id))
		.orderBy(desc(gamesTable.startDate))
		.limit(1)
		.then((r) => r[0] ?? null);

	if (!lastGame) throw new Error('Current reign has no games');

	const { season, week, seasonType } = await getGameById(lastGame.espnId);
	const weeks = await getWeeks(season);
	const currentGameIndex = weeks.findIndex(
		(x: { week: string; type: string }) => x.week === week && x.type === seasonType
	);

	console.log('startTeam:', currentReign.teamName);
	console.log('startYear:', season);
	console.log('startWeekIndex:', currentGameIndex + 1);
	console.log('start reign id:', currentReign.id);

	const { reigns } = await crawler({
		team: currentReign.teamName,
		startYear: season,
		maxYear: 2026,
		startWeekIndex: currentGameIndex + 1,
		startReignId: currentReign.id,
	});

	console.log('resulting reign(s)');
	console.log(JSON.stringify(reigns, null, 2));

	for (const reign of reigns) {
		await saveReign({ reign, id: reign._id ?? null });
	}

	console.log('done');
};

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
