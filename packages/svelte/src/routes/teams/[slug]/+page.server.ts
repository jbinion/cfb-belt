import { db, teamTable, reignsTable, reignGamesTable, gamesTable } from '@cfb/db';
import { desc, eq, inArray } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import countTeamAppearances from '$lib/countTeamAppearances';
import type { PageServerLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const teams = await db.select({ slug: teamTable.slug }).from(teamTable);
	return teams.map((t) => ({ slug: decodeURIComponent(t.slug) }));
};

export const load: PageServerLoad = async ({ params }) => {
	try {
		const decodedSlug = encodeURIComponent(params.slug);

		const team = await db
			.select()
			.from(teamTable)
			.where(eq(teamTable.slug, decodedSlug))
			.then((r) => r[0] ?? null);

		if (!team) throw new Error('Team not found');

		const reigns = await db
			.select()
			.from(reignsTable)
			.where(eq(reignsTable.teamId, team.id))
			.orderBy(desc(reignsTable.startDate));

		if (!reigns.length) {
			return { team, reigns: [], teamsBeatenForBelt: [], teamsDefended: [], teamsLostTo: [] };
		}

		const reignIds = reigns.map((r) => r.id);

		const allReignGameLinks = await db
			.select()
			.from(reignGamesTable)
			.where(inArray(reignGamesTable.reignId, reignIds));

		const gameIds = [...new Set(allReignGameLinks.map((l) => l.gameId))];
		const beltLossGameIds = reigns.map((r) => r.beltLossGameId).filter(Boolean) as string[];
		const allGameIds = [...new Set([...gameIds, ...beltLossGameIds])];

		const homeTeamAlias = alias(teamTable, 'homeTeam');
		const awayTeamAlias = alias(teamTable, 'awayTeam');

		const games = await db
			.select({
				id: gamesTable.id,
				startDate: gamesTable.startDate,
				homePoints: gamesTable.homePoints,
				awayPoints: gamesTable.awayPoints,
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
			.from(gamesTable)
			.leftJoin(homeTeamAlias, eq(gamesTable.homeTeamId, homeTeamAlias.id))
			.leftJoin(awayTeamAlias, eq(gamesTable.awayTeamId, awayTeamAlias.id))
			.where(inArray(gamesTable.id, allGameIds));

		const gameMap = new Map(games.map((g) => [g.id, g]));

		type GameResult = (typeof games)[number];

		const reignsWithGames = reigns.map((r) => {
			const reignGameIds = allReignGameLinks.filter((l) => l.reignId === r.id).map((l) => l.gameId);

			const reignGames = reignGameIds
				.map((gId) => gameMap.get(gId))
				.filter((g): g is GameResult => g !== undefined)
				.sort((a, b) => a.startDate.localeCompare(b.startDate));

			const beltLossGame = r.beltLossGameId ? (gameMap.get(r.beltLossGameId) ?? null) : null;

			return {
				...r,
				games: reignGames,
				beltLossGame,
				defenseCount: Math.max(0, reignGames.length - 1),
			};
		});

		const teamsBeatenForBelt = reignsWithGames
			.map((reign) => {
				const firstGame = reign.games[0];
				if (!firstGame) return null;
				return firstGame.homeTeam?.id === team.id ? firstGame.awayTeam : firstGame.homeTeam;
			})
			.filter((t): t is NonNullable<typeof t> => t !== null);

		const teamsDefendedAgainst = reignsWithGames.flatMap((reign) => {
			if (reign.games.length <= 1) return [];
			return reign.games
				.slice(1)
				.map((game) => (game.awayTeam?.id === team.id ? game.homeTeam : game.awayTeam))
				.filter((t): t is NonNullable<typeof t> => t !== null && t !== undefined);
		});

		const teamsLostTo = reignsWithGames
			.map((reign) => {
				if (!reign.beltLossGame) return null;
				return reign.beltLossGame.awayTeam?.id === team.id
					? reign.beltLossGame.homeTeam
					: reign.beltLossGame.awayTeam;
			})
			.filter((t): t is NonNullable<typeof t> => t !== null && t !== undefined);

		return {
			team,
			reigns: reignsWithGames,
			teamsBeatenForBelt: countTeamAppearances(teamsBeatenForBelt),
			teamsDefended: countTeamAppearances(teamsDefendedAgainst),
			teamsLostTo: countTeamAppearances(teamsLostTo),
		};
	} catch (error) {
		console.error(`Error loading team from params ${JSON.stringify(params)}`, error);
		return { team: null, reigns: [], teamsBeatenForBelt: [], teamsDefended: [], teamsLostTo: [] };
	}
};
