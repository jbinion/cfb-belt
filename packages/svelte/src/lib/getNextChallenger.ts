import { db, nextGameTable, teamTable, reignsTable } from '@cfb/db';
import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';

const getNextChallenger = async () => {
	const homeTeamAlias = alias(teamTable, 'homeTeam');
	const awayTeamAlias = alias(teamTable, 'awayTeam');

	const nextGame = await db
		.select({
			id: nextGameTable.id,
			startDate: nextGameTable.startDate,
			homeTeamName: nextGameTable.homeTeamName,
			awayTeamName: nextGameTable.awayTeamName,
			homeTeam: {
				id: homeTeamAlias.id,
				name: homeTeamAlias.name,
				displayName: homeTeamAlias.displayName,
				color: homeTeamAlias.color,
				logoFile: homeTeamAlias.logoFile,
				altColor: homeTeamAlias.altColor,
				slug: homeTeamAlias.slug,
			},
			awayTeam: {
				id: awayTeamAlias.id,
				name: awayTeamAlias.name,
				displayName: awayTeamAlias.displayName,
				color: awayTeamAlias.color,
				logoFile: awayTeamAlias.logoFile,
				altColor: awayTeamAlias.altColor,
				slug: awayTeamAlias.slug,
			},
		})
		.from(nextGameTable)
		.leftJoin(homeTeamAlias, eq(nextGameTable.homeTeamId, homeTeamAlias.id))
		.leftJoin(awayTeamAlias, eq(nextGameTable.awayTeamId, awayTeamAlias.id))
		.then((r) => r[0] ?? null);

	if (!nextGame) return { nextChallenger: null, nextGame: null };

	if (new Date(nextGame.startDate) < new Date()) {
		return { nextChallenger: null, nextGame };
	}

	const currentReign = await db
		.select({ teamId: reignsTable.teamId })
		.from(reignsTable)
		.orderBy(desc(reignsTable.startDate))
		.limit(1)
		.then((r) => r[0] ?? null);

	const nextChallenger =
		nextGame.homeTeam?.id === currentReign?.teamId ? nextGame.awayTeam : nextGame.homeTeam;

	return { nextChallenger, nextGame };
};

export default getNextChallenger;
