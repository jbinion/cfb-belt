import { connect } from '$lib/db/mongoose';
import { serialize } from '$lib/db/serialize';
import getHeroStats from '$lib/getHeroStats';
import getNextChallenger from '$lib/getNextChallenger';
import { getReigns } from '$lib/getReigns';
import { NextGame } from 'models';

export const prerender = true;

export async function load() {
	try {
		await connect();
		const reigns = await getReigns();
		const { totalReigns, teamCount, yearsTracked, totalGames } = await getHeroStats();

		const { nextChallenger, nextGame } = await getNextChallenger();
		//
		console.log(nextChallenger);
		return {
			reigns: reigns.map(serialize),
			totalReigns,
			teamCount: teamCount.length,
			yearsTracked,
			totalGames,
			nextGameStartDate: nextGame.start_date.toISOString(),
			nextChallenger: JSON.parse(JSON.stringify(nextChallenger)),
		};
	} catch (error) {
		console.error('Error loading reigns:', error);
		return {
			reigns: [],
		};
	}
}
