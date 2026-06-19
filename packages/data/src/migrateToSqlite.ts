import './dotenv';
import mongoose from './mongoose';
import { Team, Game, Reign, NextGame } from 'models';
import { db, teamTable, gamesTable, reignsTable, reignGamesTable, nextGameTable } from '@cfb/db';

const migrate = async () => {
	console.log('connecting to MongoDB...');
	await mongoose();
	console.log('connected\n');

	// 1. Teams
	console.log('migrating teams...');
	const teams = await Team.find({}).lean();
	const teamIdMap = new Map<string, number>(); // Mongo ObjectId → SQLite id
console.log(teams)

const checkNames = teams.map(t => t.displayName)
console.log(checkNames)
	for (const team of teams) {
		const [row] = await db
			.insert(teamTable)
			.values({
				name: team.name,
				displayName: team.displayName,
				color: team.color ?? null,
				logoFile: team.logoFile ?? 'default',
				altColor: team.altColor ?? null,
				slug: team.slug,
			})
			.onConflictDoUpdate({
				target: teamTable.name,
				set: {
					displayName: team.displayName,
					color: team.color ?? null,
					logoFile: team.logoFile ?? 'default',
					altColor: team.altColor ?? null,
					slug: team.slug,
				},
			})
			.returning({ id: teamTable.id });

		teamIdMap.set(team._id.toString(), row.id);
	}
	console.log(`✓ ${teams.length} teams\n`);

	// 2. Games — build Mongo ObjectId → ESPN id map for use in reign migration
	console.log('migrating games...');
	const games = await Game.find({}).lean();
	const gameIdMap = new Map<string, string>(); // Mongo ObjectId → ESPN game id string

	for (const game of games) {
		const espnId = String(game.id);
		gameIdMap.set(game._id.toString(), espnId);

		const homeTeamId = game.home_team ? (teamIdMap.get(game.home_team.toString()) ?? null) : null;
		const awayTeamId = game.away_team ? (teamIdMap.get(game.away_team.toString()) ?? null) : null;
		const startDate =
			game.start_date instanceof Date ? game.start_date.toISOString() : String(game.start_date);

		await db
			.insert(gamesTable)
			.values({
				id: espnId,
				startDate,
				homeTeamId,
				homeTeamName: game.home_team_name ?? null,
				awayTeamId,
				awayTeamName: game.away_team_name ?? null,
				homePoints: game.home_points,
				awayPoints: game.away_points,
			})
			.onConflictDoNothing();
	}
	console.log(`✓ ${games.length} games\n`);

	// 3. Reigns + junction records
	console.log('migrating reigns...');
	const reigns = await Reign.find({}).sort({ startDate: 1 }).lean();

	for (const reign of reigns) {
		const teamId = teamIdMap.get(reign.team.toString());
		if (!teamId) {
			console.warn(`  skipping reign ${reign._id}: team not found in map`);
			continue;
		}

		const beltLossGameId = reign.beltLossGame
			? (gameIdMap.get(reign.beltLossGame.toString()) ?? null)
			: null;

		const startDate =
			reign.startDate instanceof Date ? reign.startDate.toISOString() : String(reign.startDate);

		const [row] = await db
			.insert(reignsTable)
			.values({ teamId, startDate, beltLossGameId })
			.onConflictDoUpdate({
				target: [reignsTable.teamId, reignsTable.startDate],
				set: { beltLossGameId },
			})
			.returning({ id: reignsTable.id });

		const gameIds = (reign.games as any[])
			.map((gId: any) => gameIdMap.get(gId.toString()))
			.filter((id): id is string => id !== undefined);

		if (gameIds.length) {
			await db
				.insert(reignGamesTable)
				.values(gameIds.map((gameId) => ({ reignId: row.id, gameId })))
				.onConflictDoNothing();
		}
	}
	console.log(`✓ ${reigns.length} reigns\n`);

	// 4. Next game (may not exist)
	console.log('migrating next game...');
	const nextGame = await NextGame.findOne({}).lean();
	if (nextGame) {
		const homeTeamId = nextGame.home_team
			? (teamIdMap.get(nextGame.home_team.toString()) ?? null)
			: null;
		const awayTeamId = nextGame.away_team
			? (teamIdMap.get(nextGame.away_team.toString()) ?? null)
			: null;
		const startDate =
			nextGame.start_date instanceof Date
				? nextGame.start_date.toISOString()
				: String(nextGame.start_date);

		await db.delete(nextGameTable);
		await db.insert(nextGameTable).values({
			id: String(nextGame.id),
			startDate,
			homeTeamId,
			homeTeamName: nextGame.home_team_name ?? null,
			awayTeamId,
			awayTeamName: nextGame.away_team_name ?? null,
		});
		console.log('✓ next game\n');
	} else {
		console.log('  no next game in MongoDB, skipping\n');
	}

	console.log('migration complete');
	process.exit(0);
};

migrate().catch((e) => {
	console.error(e);
	process.exit(1);
});
